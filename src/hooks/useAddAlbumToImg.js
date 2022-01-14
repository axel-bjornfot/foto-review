import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

const useAddAlbumToImg = (img) => {
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [isMutating, setIsMutating] = useState(false);

	//check if img is checked and if its going to new album
	const checked = async () => {
		setIsMutating(true);
		try {
			// get ref to image in db
			const dbRef = doc(db, "images", img._id);

			// updaate image album in db
			await updateDoc(dbRef, { add: true });
		} catch (e) {
			setIsError(true);
			setError(e);
			setIsMutating(false);
			console.log("error: ", e);
		}
	};

	const unChecked = async () => {
		setIsMutating(true);
		try {
			// get ref to image in db
			const dbRef = doc(db, "images", img._id);

			// updaate image album in db
			await updateDoc(dbRef, { add: false });
		} catch (e) {
			setIsError(true);
			setError(e);
			setIsMutating(false);
		}
	};

	const addAlbum = async (img, newAlbum) => {
		setIsMutating(true);
		console.log("invalidd? ", img, newAlbum);

		// get ref to image in db
		const dbRef = doc(db, "images", img._id);
		// updaate image album in db
		await updateDoc(dbRef, { album: arrayUnion(`${newAlbum}`) });
		await updateDoc(dbRef, { add: false });
	};

	return {
		error,
		isError,
		isMutating,
		addAlbum,
		checked,
		unChecked,
	};
};

export default useAddAlbumToImg;
