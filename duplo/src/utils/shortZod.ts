import {zod} from "@duplojs/duplojs";

export const stringBoolOrNull = zod
.union([
	zod.literal("true"), 
	zod.literal("false"),
	zod.literal("null"),
])
.transform((value) => 
	value === "true" ? 
		true : 
		value === "false" ? 
			false : 
			null
);
