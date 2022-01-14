import React from "react";
import Container from "react-bootstrap/Container";
import { useAuthContext } from "../contexts/AuthContext";

const HomePage = () => {
	return (
		<Container>
			<h1>HomePage</h1>
			<p className="h5">
				Upload images and send to people to review and creaate new
				albums{" "}
			</p>
		</Container>
	);
};

export default HomePage;
