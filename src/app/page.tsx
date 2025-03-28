"use client";

import { LocalStorageKey } from "@/lib/local-storage";
import { useEffect } from "react";



export default function Home() {
	
	useEffect(() => {
		// Check if the user is logged in by checking the token in localStorage
		const token = localStorage.getItem(LocalStorageKey.TOKEN);
		if (token) {
			// If the token exists, redirect to the dashboard
			window.location.href = "/chat";
		} else {
			// If the token does not exist, redirect to the login page
			window.location.href = "/login";
		}
	}, []);

	return (
		<></>
	);
}
