import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./assets/scss/App.scss";
import AuthContext from "./contexts/AuthContext";

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthContext>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthContext>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
