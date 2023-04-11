import {checker} from "anotherback/cli";

export default checker(
	{
		pass: req => ({group_name: "pass"}),
	},
	async function({group_name}){
		"aob-pass:group_id";
		
		if(group_name === "pass")group_name = this.pass("group_name");
		
		let result = await this.method("group.existFromAnyValue", {name: group_name});

		if(result !== null && result.id !== this.pass("group_id")) this.sender("conflict", "group.nameAlreadyUse");
	}
		
);
