import {sender} from "anotherback/cli";

export default sender(
	(res, info, data) => (
		{
			code: 409,
			info: info,
			data: data
		}
	)
);
