import {access} from "anotherback/cli";

export default access(
	async function(req){
		if(await this.otherAccess("admin.accessToken") === true) return;

		await this.otherAccess("manager.accessToken", true);
	}
);
