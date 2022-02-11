import React, { useCallback, useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {
	collection,
	where,
	query,
	doc,
	updateDoc,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

import ImgGrid from "../components/ImgGrid";
import useUpload from "../hooks/useUpload";
import { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";

const AlbumPage = () => {
	const upload = useUpload();
	const [genLink, setGenLink] = useState("");
	const { currentUser } = useAuthContext();
	const { id } = useParams();
	const [data, setData] = useState();
	const albumNameRef = useRef();

	//get albums from db
	const albumRef = doc(db, "albums", id);

	useEffect(() => {
		const unsubscribe = onSnapshot(albumRef, (snapshot) => {
			if (!snapshot.exists()) {
				setData(false);
				return;
			}
			setData(snapshot.data());
		});
		return unsubscribe;
	}, []);

	const updateAlbumName = async (e) => {
		e.preventDefault();
		if (!albumNameRef.current.value.length) {
			return;
		}
		console.log(albumNameRef.current.value);
		await updateDoc(albumRef, {
			title: albumNameRef.current.value,
		});
	};

	console.log("albumref: ", albumRef);
	//get images in album from db
	const imgRef = query(
		collection(db, "images"),
		where("album", "array-contains", id)
	);
	const imgQuery = useFirestoreQueryData(
		["images"],
		imgRef,
		{
			idField: "_id",
			subscribe: true,
		},
		{
			refetchOnMount: "always",
		}
	);

	const onDrop = useCallback((acceptedFiles) => {
		if (!acceptedFiles.length) {
			return;
		}
		for (var i = 0; i < acceptedFiles.length; i++) {
			upload.mutate(acceptedFiles[i]);
		}
	}, []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: " image/jpeg, image/png, image/jpg",
		maxFiles: 20,
		onDrop,
	});

	//generate link for client
	const generateLink = () => {
		const nav = window.location.href + `/review/${currentUser.uid}`;
		setGenLink(nav);
	};

	return (
		<Container>
			<div>
				<h1>Upload one or multiple images </h1>

				<div
					{...getRootProps()}
					id="dropzone-wrapper"
					className={`${isDragAccept ? "drag-accept" : ""}${
						isDragReject ? "drag-reject" : ""
					}`}>
					<input {...getInputProps()} />

					<div className="indicator">
						{isDragActive ? (
							isDragAccept ? (
								<p>👍</p>
							) : (
								<p>🛑</p>
							)
						) : (
							<p>Drop images here</p>
						)}
					</div>

					{upload.progress !== null && (
						<ProgressBar
							variant="success"
							animated
							now={upload.progress}
						/>
					)}

					{upload.isError && (
						<Alert variant="warning">{upload.error}</Alert>
					)}
					{upload.isSuccess && (
						<Alert variant="success">
							Mmmm, that was a yummy file 🤩!
						</Alert>
					)}
				</div>
			</div>

			<h2>Create new album with checked images</h2>
			<Col>
				<Row xs={1} md={2} className="py-4">
					<div>
						<Link to="/create-album">
							<Button>Create Album with selected images</Button>
						</Link>
					</div>
					<div>
						<Button onClick={generateLink}>
							Generate link for client
						</Button>
						{genLink && (
							<Card className="link-div">
								<Card.Text>{genLink}</Card.Text>
							</Card>
						)}
					</div>
				</Row>
			</Col>
			{data && <h1>{data.title}</h1>}
			<Form onSubmit={updateAlbumName}>
				<Form.Group className="mb-3" controlId="formGroupAlbumName">
					<Form.Control
						type="text"
						ref={albumNameRef}
						placeholder="edit album name"
						required
					/>
				</Form.Group>
				<Button type="submit">Edit</Button>
			</Form>
			<ImgGrid query={imgQuery.data} />
		</Container>
	);
};

export default AlbumPage;
