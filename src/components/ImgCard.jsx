import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { SRLWrapper } from "simple-react-lightbox";
import useDeleteImg from "../hooks/useDeleteImg";
import useAddAlbumToImg from "../hooks/useAddAlbumToImg";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ImgCard = ({ img, review }) => {
	const deleteImageMutation = useDeleteImg(img);
	const addAlbumMutation = useAddAlbumToImg(img);
	const [isChecked, setIsChecked] = useState(false);

	//see if img is checked
	const handleOnChange = (img) => {
		setIsChecked(!isChecked);
		if (!isChecked) {
			addAlbumMutation.checked(img);
		} else {
			addAlbumMutation.unChecked(img);
		}
	};
	const handleThumpUp = async () => {
		try {
			// get ref to image in db
			const dbRef = doc(db, "images", img._id);

			// updaate image album in db
			await updateDoc(dbRef, { add: true });
		} catch (e) {
			console.log("error: ", e);
		}
	};

	const handleThumpDown = async () => {
		try {
			// get ref to image in db
			const dbRef = doc(db, "images", img._id);

			// updaate image album in db
			await updateDoc(dbRef, { add: false });
			console.log("succes: ");
		} catch (e) {
			console.log("error: ", e);
		}
	};

	return (
		<SRLWrapper>
			<Card text="light" bg="dark" className="mt-5">
				<a href={img.url}>
					<Card.Img variant="top" src={img.url} />
				</a>
				<Card.Body>
					<Card.Title>{img.name}</Card.Title>
					{!review && (
						<Row>
							<Col>
								<Button
									inline
									variant="danger"
									size="sm"
									disabled={deleteImageMutation.isMutating}
									onClick={deleteImageMutation.mutate}>
									DEL
								</Button>
							</Col>
							<Col>
								<Form.Check>
									<Form.Check.Input
										inline
										type="checkbox"
										isValid
										checked={img.add}
										onChange={handleOnChange}
										value={img._id}
									/>
									<Form.Check.Label>
										Select image
									</Form.Check.Label>
								</Form.Check>
							</Col>
						</Row>
					)}
					{review && (
						<div key={`inline-radio`} className="m-3">
							<Form.Check
								type="radio"
								inline
								label="👍"
								name={img._id}
								onChange={handleThumpUp}
								value={img._id}
								required
							/>
							<Form.Check
								type="radio"
								inline
								label="👎"
								name={img._id}
								onChange={handleThumpDown}
								value={img._id}
								required
							/>
						</div>
					)}
				</Card.Body>
			</Card>
		</SRLWrapper>
	);
};

export default ImgCard;
