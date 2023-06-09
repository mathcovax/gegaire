#! /usr/bin/env node

import fs from "fs";
import { execSync, spawn } from "child_process";
const Watcher = (await import("/usr/local/lib/node_modules/watcher/dist/watcher.js")).default;

if(!fs.existsSync("/proxy/node_modules")){
	console.log("Install all package.");
	execSync("npm install", {cwd: "/proxy", stdio: "ignore"});
	execSync("chown -R node /proxy", {stdio: "ignore"});
}

class child{
	static process;
	static watcher1;
	static watcher2;

	static start(){
		this.process = spawn("node", ["main.js"], {stdio: "inherit", cwd: "/proxy", detached: true});
		this.watcher1 = new Watcher("/proxy/node_modules").on("unlinkDir", () => child.restart());
		this.watcher2 = new Watcher("/proxy/main.js").on("change", () => child.restart());
	}

	static stop(){
		this.watcher1.close();
		this.watcher2.close();
		try{
			process.kill(this.process.pid, "SIGINT");
		}catch{}
	}

	static restart(){
		this.stop();

		if(!fs.existsSync("/proxy/node_modules")){
			console.log("Starting reinstall all package");
			execSync("npm install", {stdio: "ignore", cwd: "/proxy"});
			execSync("chown -R node ./node_modules", {stdio: "ignore", cwd: "/proxy"});
		}

		this.start();
	}
}

child.start();