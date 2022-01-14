import { useState } from "react";
import { useParams } from "react-router-dom";
import { doc, deleteDoc, arrayRemove, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

const useDeleteImg = (img) => {
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [isMutating, setIsMutating] = useState(false);
	const params = useParams();
	const albumId = params.id;

	const mutate = async () => {
		setIsMutating(true);
		try {
			const storageRef = ref(storage, img.path);

			// get ref to image in db
			const dbRef = doc(db, "images", img._id);

			//check if image have more then one album
			if (img.album.length > 1) {
				await updateDoc(dbRef, {
					album: arrayRemove(`${albumId}`),
				});
				return;
			}
			// delete image from storage
			await deleteObject(storageRef);

			// delete image from db
			await deleteDoc(dbRef);
		} catch (e) {
			setIsError(true);
			setError(e);
			setIsMutating(false);
		}
	};

	return {
		error,
		isError,
		isMutating,
		mutate,
	};
};

export default useDeleteImg;
