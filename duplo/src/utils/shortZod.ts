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

export const stringBool = zod
.union([
	zod.literal("true"), 
	zod.literal("false"),
])
.transform((value) => value === "true" ? true : false);

export const dateWithoutTime = zod
.coerce
.date()
.transform(
	(arg) => new Date(
		arg.getFullYear(), 
		arg.getMonth(), 
		arg.getDate()
	)
);
