import {schema} from "anotherback/cli";
import {schema as s} from "anotherback";

export default schema(
	s.object({
		text: 
			s.string()
			.max(255)
			.required(),
	
		city: 
			s.string()
			.max(50)
			.required(),
	
		postcode:
			s.string()
			.max(6)
			.required(),
	
		lng: 
			s.number()
			.required(),
	
		lat: 
			s.number()
			.required(),
	}),
	(sender) => sender("bad_request", "address.wrong")
);

// export const other = schema(
// 	s.string(),
// 	(sender) => sender("bad_request", "error", "invalid field")
// );
