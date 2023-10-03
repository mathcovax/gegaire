import Duplo from "@duplojs/duplojs";
import duploCookie from "@duplojs/cookie";
import dotenv from "dotenv";
import {resolve} from "path";
import {existsSync} from "fs";
import duploRoutesDirectory from "@duplojs/routes-directory";

if(existsSync(resolve(process.cwd(), ".env.local"))){
	dotenv.config({path: resolve(process.cwd(), ".env.local")});
}
dotenv.config();

export const duplo = Duplo({port: 80, host: "0.0.0.0"});

duplo.use(duploCookie);

duplo.use(
	duploRoutesDirectory, 
	{
		path: "src",
		matchs: [{pattern: /.ts$/, handler: (i, o, path) => import(path)}]
	}
).then(() => duplo.launch());



