import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";

const Navigation = () => {
	const { currentUser } = useAuthContext();

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand to="/">Foto Review</Navbar.Brand>
					<Nav className="me-auto">
						<NavLink to="/" className="nav-link">
							Home
						</NavLink>
						{currentUser ? (
							<>
								<NavLink to="/albums" className="nav-link">
									albums
								</NavLink>

								<NavLink to="/logout" className="nav-link">
									logout
								</NavLink>
							</>
						) : (
							<>
								<NavLink to="/login" className="nav-link">
									login
								</NavLink>
							</>
						)}
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
