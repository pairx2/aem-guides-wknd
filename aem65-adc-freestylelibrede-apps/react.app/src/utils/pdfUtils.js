export const downloadBase64 = (base64String, filename, downloadDocAsImg) => {
	let byte = base64ToArrayBuffer(base64String);
	let fileName = '';
	let file = '';
	if (downloadDocAsImg) {
		fileName = `${filename}.png`;
		file = new File([byte],fileName,{ type: "image/png" });
	} else {
		fileName = `${filename}.pdf`;
		file = new File([byte],fileName,{ type: "application/pdf" });	
	}
	let downloadWindow = window;
	downloadWindow.document.title = fileName;
	downloadWindow.open(URL.createObjectURL(file), "_blank");
};

function base64ToArrayBuffer(_base64Str) {
	let binaryString = window.atob(_base64Str);
	let binaryLen = binaryString.length;
	let bytes = new Uint8Array(binaryLen);
	for (let i = 0; i < binaryLen; i++) {
	  let ascii = binaryString.charCodeAt(i);
	  bytes[i] = ascii;
	}
	return bytes;
}