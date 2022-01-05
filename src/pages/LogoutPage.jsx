import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useAuthContext } from "../contexts/AuthContext";

const logoutPage = () => {
	const { logout } = useAuthContext();

	useEffect(async () => {
		await logout();
	}, []);

	return (
		<Container>
			<h3>Thank u come again 🦞</h3>
		</Container>
	);
};

export default logoutPage;
