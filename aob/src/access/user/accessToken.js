import {access} from "anotherback/cli";

export default access(
	function(req){
		let accessTokenValue = this.token.verify("accessToken");

		if(!accessTokenValue){
			this.sender("forbidden", "errorAccessToken");
		}
        
		this.pass("accessTokenValue", accessTokenValue);
	}
);
