import React, { useState, useRef } from "react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {
	collection,
	where,
	query,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import useAddAlbumToImg from "../hooks/useAddAlbumToImg";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ReviewDonePage = () => {
	const addAlbumToImages = useAddAlbumToImg();
	const params = useParams();
	const albumId = params.id;
	const userId = params.user;
	const albumName = params.name;

	const imgToAddRef = query(
		collection(db, "images"),
		where("album", "array-contains", albumId),
		where("add", "==", true)
	);
	const imgQuery = useFirestoreQueryData(
		["images"],
		imgToAddRef,
		{
			idField: "_id",
			subscribe: true,
		},
		{
			refetchOnMount: "always",
		}
	);

	const images = imgQuery.data;
	const createAlbum = async () => {
		try {
			await addDoc(collection(db, "albums"), {
				title: `reviewed ${albumName}`,
				timestamp: serverTimestamp(),
				owner: userId,
			}).then(function (docRef) {
				const newAlbum = docRef.id;
				//add new album to images
				if (imgQuery) {
					for (var i = 0; i < images.length; i++) {
						addAlbumToImages.addAlbum(images[i], newAlbum);
					}
				}
			});
		} catch (e) {
			console.error("Error adding document: ", e);
			return;
		}
	};

	console.log("img q:", imgQuery.data);
	return (
		<>
			<Button onClick={createAlbum}>Send review</Button>
			<h1>Reviews done 🐱‍👤</h1>
		</>
	);
};

export default ReviewDonePage;
