import React from "react";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Container from "react-bootstrap/esm/Container";
import HomePage from "./pages/HomePage";
import Navigation from "./pages/partials/Navigation";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage";
import MyAlbumsPage from "./pages/MyAlbumsPage";
import RequireAuth from "./components/RequireAuth";
import AlbumPage from "./pages/AlbumPage";
import CreateAlbumPage from "./pages/CreateAlbumPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewDonePage from "./pages/ReviewDonePage";

function App() {
	return (
		<>
			<Navigation />
			<Container className="py-4 align-items-center">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/logout" element={<LogoutPage />} />
					<Route
						path="/album/:id/:name/review/:user"
						element={<ReviewPage />}
					/>
					<Route
						path="/review-done/:id/:user/:name"
						element={<ReviewDonePage />}
					/>
					<Route
						path="/albums"
						element={
							<RequireAuth>
								<MyAlbumsPage />
							</RequireAuth>
						}
					/>

					<Route
						path="/album/:id/"
						element={
							<RequireAuth redirectTo="/login">
								<AlbumPage />
							</RequireAuth>
						}
					/>
					<Route
						path="/create-album"
						element={
							<RequireAuth redirectTo="/login">
								<CreateAlbumPage />
							</RequireAuth>
						}
					/>
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
