import {access} from "anotherback/cli";

export default access(
	function(req){
		let accessTokenValue = this.token.verify("accessToken");

		if(!accessTokenValue){
			if(accessTokenValue === null) this.sender("forbidden", "noAccessToken");
			else if(accessTokenValue === false){
				this.token.delete("accessToken");
				this.token.delete("refresh_accessToken");
				this.sender("forbidden", "expireAccessToken");
			}
		}
        
		this.pass("accessTokenValue", accessTokenValue);
	}
);
