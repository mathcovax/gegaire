import {access} from "anotherback/cli";

export default access(
	function(req){
		if(!this.token.verify("accessToken")){
			this.sender("forbidden", "redirectTo", "/?callback=" + req.url.replace("/entry", ""));
		}
	}
);
