import {method} from "anotherback/cli";
import {Prisma} from "../../import/prisma.js";
import bcrypt from "bcrypt";

export default method(
	async function(email, name, tel, password, groups, address){
		password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		return await Prisma.user.create({
			data: {
				email,
				name,
				tel,
				password,
				groups: {
					connect: groups
				},
				...(address !== undefined ? {address: {create: address}} : {})
			}
		});
	}
);
