import {access} from "anotherback/cli";

export default access(
	async function(req){
		await this.otherAccess("user.accessToken", true);

		if(this.pass("accessTokenValue").isAdmin === false){
			this.sender("forbidden", "errorAccessTokenAdmin");
		}
	}
);
