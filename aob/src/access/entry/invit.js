import {access} from "anotherback/cli";

export default access(
	function(req){
		if(!!this.token.verify("accessToken")) this.token.delete("accessToken");
	}
);
