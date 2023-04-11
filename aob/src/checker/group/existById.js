import {checker} from "anotherback/cli";
import j from "joi";

export default checker(
	{
		body: req => ({group_id: req.body.group_id}),
		params: req => ({group_id: parseInt(req.params.groupId)})
	},
	async function({group_id}){
		if(typeof group_id !== "number") this.sender("bad_request", "group.wrongId");

		if(!await this.method("group.existById", group_id)){
			this.sender("not_found", "group.notfound");
		}

		this.pass("group_id", group_id);
	}
);

export const multi =  checker(
	{
		body: req => ({groups_id: req.body.groups}),
	},
	async function({groups_id}){
		if(typeof groups_id !== "object" || !Array.isArray(groups_id) || groups_id.length < 1) this.sender("bad_request", "group.emptyArray");

		let result = joi_multiGroup.validate(groups_id);
		if(result.error !== undefined) this.sender("bad_request", "group.wrongArray");
		groups_id = result.value;

		for(const {id} of groups_id){
			if(!await this.method("group.existById", id)){
				this.sender("not_found", "group.notfound");
			}
		}

		this.pass("groups_id", groups_id);
	}
);

const joi_multiGroup = j.array().items(j.object({id: j.number()}).options({stripUnknown: true}));
