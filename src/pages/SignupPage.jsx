import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
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
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<Container>
			<h1>SignupPage</h1>
			{error && <h4 variant="danger">{error}</h4>}
			<Form onSubmit={handleSignup}>
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
