import React, { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
	const firstnameRef = useRef();
	const lastnameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const secPasswordRef = useRef();
	const { signup } = useAuthContext();
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();

		//check if user typed the correct password twice
		if (passwordRef.current.value !== secPasswordRef.current.value) {
			return setError("Bro!? your passwords dosen't match");
		}
		setError(null);

		try {
			const res = await signup(
				emailRef.current.value,
				passwordRef.current.value
			);
			const user = res.user;
			//create a user doc with the auth user
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				authProvider: "local",
				email: emailRef.current.value,
				firstname: firstnameRef.current.value,
				lastname: lastnameRef.current.value,
			});
			navigate("/");
		} catch (e) {
			setError(e.message);
		}
	};

	//

	return (
		<Container>
			<h1>SignupPage</h1>
			{error && <h4>{error}</h4>}

			<Form onSubmit={handleSignup}>
				<Form.Group className="mb-3">
					<Form.Label>Firstname</Form.Label>
					<Form.Control
						type="text"
						ref={firstnameRef}
						placeholder="Firstname"
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Lastname</Form.Label>
					<Form.Control
						type="text"
						ref={lastnameRef}
						placeholder="Lastname"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						ref={emailRef}
						placeholder="Enter email"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						ref={passwordRef}
						placeholder="Password"
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPasswordSec">
					<Form.Label>Password again</Form.Label>
					<Form.Control
						type="password"
						ref={secPasswordRef}
						placeholder="Password"
					/>
				</Form.Group>
				<Button type="submit">Sign up</Button>
			</Form>
		</Container>
	);
};

export default SignupPage;
