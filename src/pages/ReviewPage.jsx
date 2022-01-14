import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {
	collection,
	where,
	orderBy,
	query,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import useAddAlbumToImg from "../hooks/useAddAlbumToImg";
import ImgGrid from "../components/ImgGrid";
import { useParams, useNavigate } from "react-router-dom";

const ReviewPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const albumId = params.id;
	const userId = params.user;

	//get images
	const imgRef = query(
		collection(db, "images"),
		where("album", "array-contains", albumId)
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

	const handdleSubmit = (e) => {
		e.preventDefault();
		navigate(`/review-done/${albumId}/${userId}`);
	};
	return (
		<>
			<h1>Review</h1>
			<Form onSubmit={handdleSubmit}>
				<ImgGrid review={true} query={imgQuery.data} />

				<Button type="submit" className="mt-3">
					Send review
				</Button>
			</Form>
		</>
	);
};

export default ReviewPage;
