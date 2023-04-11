import {sender} from "anotherback/cli";

export default sender(
	(res, info, data) => (
		{
			code: 403,
			info: info,
			data: data
		}
	)
);
