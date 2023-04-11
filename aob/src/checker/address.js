import {checker} from "anotherback/cli";
import J from "joi";

export default checker(
	{
		body: req => ({address: req.body.address, must: false}),
		mustBody: req => ({address: req.body.address, must: true})
	},
	function({address, must}){
		if(!address && !must) return;

		let result = joi_address.validate(address);
		if(result.error !== undefined) this.sender("bad_request", "address.wrong");
		
		this.pass("address", result.value);
	}
);

const joi_address = J.object({
	text: 
		J.string()
		.max(255)
		.required(),

	city: 
		J.string()
		.max(50)
		.required(),

	postcode:
		J.string()
		.max(6)
		.required(),

	lng: 
		J.number()
		.required(),

	lat: 
		J.number()
		.required(),
})
.options({stripUnknown: true});
