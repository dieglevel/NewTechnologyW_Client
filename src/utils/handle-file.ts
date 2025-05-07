export const downloadFile = (data: string, fileName: string, mime: string = "text/plain") => {
	const link = document.createElement("a");
	link.download = fileName;

	if (
		mime.startsWith("text/") ||
		["application/json", "application/javascript", "application/xml", "application/x-sh"].includes(mime)
	) {
		const blob = new Blob([data], { type: mime });
		link.href = URL.createObjectURL(blob);
	} else {
		link.href = data;
	}

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const previewFile = (url: string) => {
	if (!url) return;
	const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
	window.open(viewerUrl, "_blank", "noopener,noreferrer");
};
