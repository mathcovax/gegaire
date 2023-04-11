import {checker} from "anotherback/cli";

export default checker(
	{
		query: req => ({search_name: req.query.searchName})
	},
	function({search_name}){
		if(typeof search_name !== "string") this.sender("bad_request", "user.searchName");

		this.pass("search_name", search_name);
	}
);
