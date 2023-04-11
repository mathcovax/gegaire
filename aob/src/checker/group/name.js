import {checker} from "anotherback/cli";

export default checker(
	{
		body: req => ({group_name: req.body?.group_name.trim() || ""})
	},
	function({group_name}){
		if(typeof group_name !== "string" || !group_name.length.btw(4, 20)){
			this.sender("bad_request", "group.name");
		}

		this.pass("group_name", group_name);
	}
);
