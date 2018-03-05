const defaultConfig = {
	"dynamoRegion": "eu-west-1",
	"dynamoEndpoint": "http://localhost:18000",
	"s3Region": "eu-west-1",
	"s3CdnBucket": "cdn",
	"s3CdnPath": "/uploads",
	"s3Endpoint": "http://localhost:14569",
	"apiHost": "http://localhost",
	"apiPortInternal": 3000,
	"apiPortExternal": 3000,
	"apiPath": "",
};

const config = {};

for (const key in defaultConfig) {
	const envKey = `PIHOLE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
	if (process.env[envKey] && process.env[envKey].length) {
		config[key] = process.env[envKey];
	} else {
		config[key] = defaultConfig[key];
	}
}

module.exports = config;
