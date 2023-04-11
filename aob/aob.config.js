import {config, Directories, Models, Files} from "anotherback/cli";

export default config(
	{
		listenParams: {
			port: 80,
			host: "0.0.0.0"
		},
		registerParamsCookie: {

		},
		registerParamsCors: {

		},
		prefix: "",
		debug: true,
		plugins: [],
		fastifyRegister(fastReg){

		},
		listenCallback(err, address){
			if(err) throw err;
			console.log("Ready !");
		}
	}
);
