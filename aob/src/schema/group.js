import {schema} from "anotherback/cli";
import {schema as s} from "anotherback";

// export default schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );

export const id = schema(
	s.number(),
	(sender) => sender("bad_request", "group.id")
);

export const name = schema(
	s.string().trim().min(4).max(20),
	(sender) => sender("bad_request", "group.name")
);

// export const other = schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );
