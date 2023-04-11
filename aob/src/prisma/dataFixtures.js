import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

const Prisma = new PrismaClient();

const Mathieu = await Prisma.user.create({
	data: {
		name: "mathieu",
		email: "campani.mathieu@gmail.com",
		tel: "0782715125",
		password: bcrypt.hashSync("mlkit123", bcrypt.genSaltSync(10)),
		isAdmin: true,
		isManager: true,
	},
	select: {
		id: true
	}
});

await Prisma.address.create({
	data: {
		userId: Mathieu.id,

		postcode: "77186",
		text: "12 Avenue Pierre Mendès France, 77186 Noisiel, France",
		city: "Noisiel",
		lat: 48.841381,
		lng: 2.61506
	}
});

let dateFrom = new Date();
let dateTo = new Date();
dateTo.setFullYear(dateTo.getFullYear() + 1);

await Prisma.pro_Card.create({
	data: {
		userId: Mathieu.id,
		
		from: dateFrom,
		to: dateTo
	}
});

const group = await Prisma.group.create({
	data: {
		name: "Paris"
	},
	select: {
		id: true
	}
});

await Prisma.user.update({
	where: {
		id: Mathieu.id
	},
	data: {
		groups: {
			connect: {
				id: group.id
			}
		}
	}

});


