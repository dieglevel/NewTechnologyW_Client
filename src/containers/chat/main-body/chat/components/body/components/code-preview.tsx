// import CodeMirror from "@uiw/react-codemirror";
// import { useEffect, useState } from "react";

// interface CodePreviewProps {
// 	url: string;
// }

// export const CodePreview = ({ url }: CodePreviewProps) => {
// 	const [code, setCode] = useState("");

// 	useEffect(() => {
// 		const fetchCode = async () => {
// 			try {
// 				const res = await fetch(url);
// 				const text = await res.text();
// 				setCode(text);
// 			} catch (err) {
// 				console.error("Failed to fetch file content", err);
// 			}
// 		};
// 		fetchCode();
// 	}, [url]);

// 	if (!code) return null;

// 	return (
// 		<div style={{ width: 300, border: "1px solid #ccc", borderRadius: 8 }}>
// 			<CodeMirror
// 				value={"12312312312"}
// 				height="200px"
// 				theme="light"
// 				editable={false}
// 			/>
// 		</div>
// 	);
// };


// này chưa xài được - CORS