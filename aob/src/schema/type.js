import {schema} from "anotherback/cli";
import {schema as s} from "anotherback";

// export default schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );

export const bool = schema(
	s.boolean(),
	(sender) => sender("bad_request", "not_bool")
);

export const number = schema(
	s.number(),
	(sender) => sender("bad_request", "not_number")
);

export const string = schema(
	s.string().min(0),
	(sender) => sender("bad_request", "not_string")
);


// export const other = schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );
