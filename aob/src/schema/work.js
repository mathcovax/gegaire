import {schema} from "anotherback/cli";
import {schema as s} from "anotherback";

// export default schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );

export const am = schema(
	s.boolean(),
	(sender) => sender("bad_request", "work.am")
);

export const pm = schema(
	s.boolean(),
	(sender) => sender("bad_request", "work.pm")
);

export const leader = schema(
	s.boolean(),
	(sender) => sender("bad_request", "work.leader")
);

export const date = schema(
	s.date(),
	(sender) => sender("bad_request", "work.date")
);

// export const other = schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );
