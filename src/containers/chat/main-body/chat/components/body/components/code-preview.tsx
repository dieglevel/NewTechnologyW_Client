import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { useEffect, useState } from "react";

interface CodePreviewProps {
	data: string;
}

export const CodePreview = ({ data }: CodePreviewProps) => {
	const MAX_CHARS = 500;
	const codePreview = data.slice(0, MAX_CHARS) + (data.length > MAX_CHARS ? "..." : "");

 

	if (!codePreview) return null;

	return (
		<div className="w-full max-w-sm overflow-hidden rounded-md border border-gray-300">
			<CodeMirror
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
