import React from "react";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Container from "react-bootstrap/esm/Container";
import HomePage from "./pages/HomePage";
import Navigation from "./pages/partials/Navigation";
import LoginPage from "./pages/LoginPage";

function App() {
	return (
		<>
			<Navigation />
			<Container className="py-4">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
				<ReactQueryDevtools
					initialIsOpen={false}
					position="bottom-right"
				/>
			</Container>
		</>
	);
}

export default App;
