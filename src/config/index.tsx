const env = process.env.NODE_ENV;

let config = null;

try {
	config = require(`./env/${env}`);
} catch (ex) {}

export default Object.assign(
	{},
	{
		GOOGLE_API_URL: process.env.REACT_APP_GOOGLE_API_URL,
		GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY
	},
	config || {}
);
