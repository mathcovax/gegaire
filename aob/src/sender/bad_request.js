import {sender} from "anotherback/cli";

export default sender(
	(res, info, data) => (
		{
			code: 400,
			info: info,
			data: data
		}
	)
);
