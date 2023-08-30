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

export const name = schema(
	s.string().trim().max(50).min(4),
	(sender) => sender("bad_request", "user.name")
);

export const email = schema(
	s.string().trim().email().min(10).max(255).lowercase(),
	(sender) => sender("bad_request", "user.email")
);

export const tel = schema(
	s.string().trim().min(10).max(12),
	(sender) => sender("bad_request", "user.tel")
);

// export const other = schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );
