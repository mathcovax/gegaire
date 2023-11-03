import {zod} from "@duplojs/duplojs";
import {duplo} from "../../main";
import {accessToken} from "../checkers/token";

export const mustBeConnected = duplo.declareAbstractRoute(
	"mustBeConnected", 
	{
		options: {
			isManager: false,
			isAdmin: false,
			isAdminOrManager: false,
		}
	}
)
.extract(
	{
		cookies: {
			accessToken: zod.string()
		}
	},
	(response) => response.code(403).info("noAccessToken").send()
)
.check(
	accessToken,
	{
		input: (pickup) => pickup("accessToken"),
		result: "validToken",
		catch: (response, info) => response.code(403).info(info).send(),
		indexing: "contentAccessToken",
	}
)
.cut((floor, response) => {
	const options = floor.pickup("options");
	const contentAccessToken = floor.pickup("contentAccessToken");
	if(options.isAdmin && !contentAccessToken?.isAdmin)response.code(403).info("errorAccessTokenAdmin").send();
	else if(options.isManager && !contentAccessToken?.isManager)response.code(403).info("errorAccessTokenManager").send();
	else if(
		options.isAdminOrManager && 
		!contentAccessToken?.isManager && 
		!contentAccessToken?.isAdmin
	)response.code(403).info("errorAccessToken").send();
})
.build(["contentAccessToken"]);
