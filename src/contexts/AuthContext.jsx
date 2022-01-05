import React, { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

const useAuthContext = () => {
	return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};
	const logout = () => {
		return signOut(auth);
	};

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
	}, []);
	const values = {
		currentUser,
		login,
		logout,
		signup,
	};
	return (
		<AuthContext.Provider value={values}>{children}</AuthContext.Provider>
	);
};

export { useAuthContext, AuthContextProvider as default };
