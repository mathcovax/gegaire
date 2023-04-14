import {schema} from "anotherback/cli";
import {schema as s} from "anotherback";

// export default schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );

export const id = schema(
	s.number(),
	(sender) => sender("bad_request", "user.id")
);

// export const other = schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );
