import SecureLS from "secure-ls";

const storage = new SecureLS({
	encodingType: "aes",
	isCompression: false,
});

export default storage;
