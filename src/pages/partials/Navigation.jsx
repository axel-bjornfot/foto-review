import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand to="/">Foto Review</Navbar.Brand>
					<Nav className="me-auto">
						<NavLink to="/" className="nav-link">
							Home
						</NavLink>
						<NavLink to="/login" className="nav-link">
							login
						</NavLink>
						<NavLink to="/blank" className="nav-link">
							blank
						</NavLink>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
