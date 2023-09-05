import {lstatSync, readdirSync} from "fs";
import {resolve} from "path";

export function importFolder(path: string, regExp: RegExp){
	const importFile: Promise<any>[] = [];
	for(let file of readdirSync(resolve(path))){
		file = resolve(path, file);
		if(lstatSync(file).isDirectory()) importFile.push(importFolder(path, regExp));
		else if(regExp.test(file)) importFile.push(import(file));
	}
	return Promise.all(importFile);
}
