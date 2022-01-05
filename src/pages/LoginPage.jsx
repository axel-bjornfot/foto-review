import React, { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuthContext();
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handlelLogin = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch (e) {
			setError(e.message);
		}
	};
	return (
		<Container>
			<h1>LoginPage</h1>
			{error && <h4 variant="danger">{error}</h4>}
			<Form onSubmit={handlelLogin}>
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
				<p>
					Don't have an account? creat one{" "}
					<Link to="/signup">here</Link>
				</p>
				<Button type="submit">Sign in</Button>
			</Form>
		</Container>
	);
};

export default LoginPage;
