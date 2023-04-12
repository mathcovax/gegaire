import {schema} from "anotherback/cli";
import {schema as s} from "anotherback";

// export default schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );

export const name = schema(
	s.string().min(4).max(30),
	(sender) => sender("bad_request", "activity.name")
);

export const number = schema(
	s.number(),
	(sender) => sender("bad_request", "activity.number")
);

export const note = schema(
	s.string().min(0).max(1500),
	(sender) => sender("bad_request", "activity.note")
);

export const id = schema(
	s.number(),
	(sender) => sender("bad_request", "activity.id")
);
