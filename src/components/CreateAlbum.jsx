import React, { useRef, useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import useAddAlbumToImg from "../hooks/useAddAlbumToImg";

const CreateAlbum = (data) => {
	const navigate = useNavigate();
	const addAlbumToImages = useAddAlbumToImg();
	const albumNameRef = useRef();
	const { currentUser } = useAuthContext();
	const images = data.images;
	const selectedImgAlbum = data.selectedImgAlbum;

	const handleClick = async (e) => {
		e.preventDefault();
		if (!albumNameRef.current.value.length) {
			return;
		}

		console.log("Document data: ", images);
		//create album in db
		try {
			await addDoc(collection(db, "albums"), {
				title: albumNameRef.current.value,
				timestamp: serverTimestamp(),
				owner: currentUser.uid,
			}).then(function (docRef) {
				const newAlbum = docRef.id;

				//add new album to images
				if (selectedImgAlbum) {
					for (var i = 0; i < images.length; i++) {
						addAlbumToImages.addAlbum(images[i], newAlbum);
					}
					navigate(`/album/${docRef.id}`);
				}
			});
		} catch (e) {
			console.error("Error adding document: ", e);
			return;
		}
	};

	return (
		<Container className="mt-5">
			<h3>Create a new album</h3>
			<Form onSubmit={handleClick}>
				<Form.Group className="mb-3" controlId="formGroupAlbumName">
					<Form.Label>Album name</Form.Label>
					<Form.Control
						type="text"
						ref={albumNameRef}
						placeholder="Enter name of new album"
						required
					/>
				</Form.Group>

				<Button type="submit">Create new album</Button>
			</Form>
		</Container>
	);
};

export default CreateAlbum;
