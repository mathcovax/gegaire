import {access} from "anotherback/cli";

export default access(
	function(req){
		let accessTokenValue = this.token.verify("accessToken");

		if(!accessTokenValue){
			this.sender("forbidden", "redirectTo", "/?callback=" + req.url.replace("/entry", ""));
		}

		if(accessTokenValue.isAdmin === false){
			this.sender("forbidden", "redirectTo", "/guide/availability");
		}
	}
);
