import {schema} from "anotherback/cli";
import {schema as s} from "anotherback";

// export default schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );

export const day = schema(
	s.number().min(1).max(31),
	(sender) => sender("bad_request", "availability.day")
);

export const month = schema(
	s.number().min(1).max(12),
	(sender) => sender("bad_request", "availability.month")
);

export const year = schema(
	s.number(),
	(sender) => sender("bad_request", "availability.year")
);

export const am = schema(
	s.custom(value => {
		if(value === true || value === "true") return true;
		else if(value === false || value === "false") return false;
		else if(value === null || value === "null") return null;
		else throw "nop";
	}),
	(sender) => sender("bad_request", "availability.am")
);

export const pm = schema(
	s.custom(value => {
		if(value === true || value === "true") return true;
		else if(value === false || value === "false") return false;
		else if(value === null || value === "null") return null;
		else throw "nop";
	}),
	(sender) => sender("bad_request", "availability.pm")
);

export const note = schema(
	s.string().min(0).max(1500).allow(null),
	(sender) => sender("bad_request", "availability.note")
);

// export const other = schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );
