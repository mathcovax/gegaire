import {checker} from "anotherback/cli";
import J from "joi";

export default checker(
	{
		body: req => ({proCard: req.body.pro_card})
	},
	function({proCard}){
		if(!proCard) return;
		
		let result = joi_proCard.validate(proCard);
		if(result.error !== undefined) this.sender("bad_request", "proCard.wrong");

		proCard = result.value;
		proCard.from = new Date(proCard.from);
		proCard.to = new Date(proCard.to);

		if(proCard.from == "Invalid Date" || proCard.to == "Invalid Date") this.sender("bad_request", "proCard.wrongFormat");

		if(proCard.from.getTime() >= proCard.to.getTime()) this.sender("bad_request", "proCard.badOrder");

		this.pass("proCard", proCard);
	}
);

const joi_proCard = J.object({
	from: J.string().required(),
	to: J.string().required(),
})
.options({stripUnknown: true});
