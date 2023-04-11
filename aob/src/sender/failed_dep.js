import {sender} from "anotherback/cli";

export default sender(
	(res, info, data) => (
		{
			code: 424,
			info: info,
			data: data
		}
	)
);
