import React, { useRef, useState, useEffect } from "react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {
	collection,
	addDoc,
	serverTimestamp,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import CreateAlbum from "../components/CreateAlbum";
import { firebaseTimestampToString } from "../helper/time";

const AllAlbumsPage = () => {
	const navigate = useNavigate();
	const albumNameRef = useRef();
	const { currentUser } = useAuthContext();

	const handleClick = async (e) => {
		e.preventDefault();

		if (!albumNameRef.current.value.length) {
			return;
		}

		// Create album doc in firestore with refrence to user doc
		await addDoc(collection(db, "albums"), {
			title: albumNameRef.current.value,
			timestamp: serverTimestamp(),
			owner: currentUser.uid,
		})
			.then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				navigate(`/album/${docRef.id}`);
			})
			.catch(function (error) {
				console.error("Error adding document: ", error);
			});
	};

	//get albums from db
	const queryRef = query(
		collection(db, "albums"),
		where("owner", "==", `${currentUser.uid}`),
		orderBy("timestamp")
	);
	const { data, isLoading } = useFirestoreQueryData(
		["albums"],
		queryRef,
		{
			idField: "id",
			subscribe: true,
		},
		{
			refetchOnMount: "always",
		}
	);

	return (
		<Container>
			<h1 className="mt-3 mb-3">My Albums</h1>
			<Row xs={1} md={2} lg={4} xl={5}>
				{data && (
					<>
						{data.length ? (
							<>
								{data.map((album, index) => {
									const timestamp = firebaseTimestampToString(
										album.timestamp
									);

									return (
										<Col key={index}>
											<Card
												text="light"
												bg="dark"
												className="mb-2 text-center"
												as={Link}
												to={`/album/${album.id}`}>
												<Card.Body>
													<Card.Title>
														{album.title}
													</Card.Title>
													<Card.Text>
														{timestamp ?? "-"}
													</Card.Text>
												</Card.Body>
											</Card>
										</Col>
									);
								})}
							</>
						) : (
							<p>
								You don't have an album but you could create one
							</p>
						)}
					</>
				)}
			</Row>
			<CreateAlbum data={data} />
		</Container>
	);
};

export default AllAlbumsPage;
