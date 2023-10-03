import {zod} from "@duplojs/duplojs";

//@ts-ignore
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
) as zod.ZodType<boolean | null>;

//@ts-ignore
export const stringBool = zod
.union([
	zod.literal("true"), 
	zod.literal("false"),
])
.transform(value => value === "true" ? true : false) as zod.ZodType<boolean>;

export const dateWithoutTime = zod
.coerce
.date()
.transform(
	arg => new Date(
		arg.getFullYear(), 
		arg.getMonth(), 
		arg.getDate()
	)
);
