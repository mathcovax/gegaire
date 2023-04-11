import {checker} from "anotherback/cli";

export default checker(
	{
		params: req => ({link_id: req.params.id}),
		body: req => ({link_id: req.body.link_id})
	},
	async function({link_id}){
		if(link_id === undefined) this.sender("bad_request", "link.undefined", "/");

		let result = await this.method(
			"link.getById",
			link_id
		);
		
		if(result === null) this.sender("not_found", "link.notExist", "/");

		this.pass("link_id", link_id);
	}
);
