import React from "react";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
	return (
		<>
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</>
	);
}

export default App;
