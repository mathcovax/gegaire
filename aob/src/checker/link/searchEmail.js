import {checker} from "anotherback/cli";

export default checker(
	{
		query: req => ({search_email: req.query.searchEmail})
	},
	function({search_email}){
		if(typeof search_email !== "string") this.sender("bad_request", "link.searchEmail");

		this.pass("search_email", search_email);
	}
);
