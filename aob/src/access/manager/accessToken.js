import {access} from "anotherback/cli";

export default access(
	async function(req){
		await this.otherAccess("user.accessToken", true);

		if(this.pass("accessTokenValue").isManager === false){
			this.sender("forbidden", "errorAccessTokenManager");
		}
	}
);
