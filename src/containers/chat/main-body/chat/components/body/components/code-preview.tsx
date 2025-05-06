import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";

interface CodePreviewProps {
	url: string;
}

export const CodePreview = ({ url }: CodePreviewProps) => {
	const [codePreview, setCodePreview] = useState("");
	const MAX_CHARS = 500;

	useEffect(() => {
		const fetchCode = async () => {
			try {
				const res = await fetch(url);
				const text = await res.text();
				setCodePreview(text.slice(0, MAX_CHARS) + (text.length > MAX_CHARS ? "..." : ""));
			} catch (err) {
				console.error("Failed to fetch file content", err);
			}
		};
		fetchCode();
	}, [url]);

	if (!codePreview) return null;

	return (
		<div className="w-full max-w-sm overflow-hidden rounded-md border border-gray-300">
			<CodeMirror
				className="no-scrollbar"
				value={codePreview}
				height="200px"
				theme="light"
				editable={false}
				maxHeight="200px"
				basicSetup={{
					highlightActiveLine: true,
				}}
				extensions={[EditorView.lineWrapping]}
			/>
		</div>
	);
};
