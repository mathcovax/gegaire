import {sender} from "anotherback/cli";

export default sender(
	(res, info) => (
		{
			code: 204,
			info
		}
	)
);
