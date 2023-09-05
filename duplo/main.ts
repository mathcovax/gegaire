import Duplo from "@duplojs/duplojs";
import cookieDuplo from "@duplojs/cookie";
import {importFolder} from "./src/importFolder";
import dotenv from "dotenv";
import {resolve} from "path";
import {existsSync} from "fs";

if(existsSync(resolve(process.cwd(), ".env.local"))){
	dotenv.config({path: resolve(process.cwd(), ".env.local")});
}
dotenv.config();

export const duplo = Duplo({port: 80, host: "0.0.0.0"});

duplo.use(cookieDuplo);

Promise.all([
	importFolder("src/routes", /.ts$/), 
	importFolder("src/security", /.ts$/),
	importFolder("src/checkers", /.ts$/)
])
.then(() => duplo.launch());


