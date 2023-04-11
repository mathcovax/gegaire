import {token} from "anotherback/cli";
import {env} from "anotherback";

export default token(
	[
		{
			name: "accessToken",
			key: env.KEY_ACCESS_TOKEN,
			options: {
				generate: {
					expiresIn: "3h",
				},
				verify: {

				},
				cookie: {
					httpOnly: false,
					path: "/"
				},
			}
		},
		{
			name: "refresh_accessToken",
			key: env.KEY_REFRESH_ACCESS_TOKEN,
			options: {
				generate: {
					expiresIn: "8d",
				},
				verify: {

				},
				cookie: {
					httpOnly: false,
					path: "/"
				},
			}
		},
	]
);
