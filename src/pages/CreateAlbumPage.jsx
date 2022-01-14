import React, { useRef, useState, useEffect } from "react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { Container } from "react-bootstrap";
import ImgGrid from "../components/ImgGrid";
import CreateAlbum from "../components/CreateAlbum";

const CreateAlbumPage = () => {
	const { currentUser } = useAuthContext();

	//get images in album from db where add is selected
	const imgRef = query(
		collection(db, "images"),
		where("add", "==", true),
		where("owner", "==", currentUser.uid)
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

	return (
		<Container>
			<CreateAlbum
				selectedImgAlbum={true}
				images={imgQuery.data}></CreateAlbum>

			<ImgGrid query={imgQuery.data} />
		</Container>
	);
};

export default CreateAlbumPage;
