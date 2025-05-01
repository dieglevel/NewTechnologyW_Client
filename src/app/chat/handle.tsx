import { useSecondBar } from "@/hooks/second-bar";
import { useEffect } from "react";


// Điều khiển second bar
export const SecondBarManager = () => {
	const { autoControl } = useSecondBar();

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth < 640;
			autoControl(!isMobile);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [autoControl]);

	return null;
};
