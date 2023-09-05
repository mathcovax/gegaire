import {zod} from "@duplojs/duplojs";
import {duplo} from "../../main";
import {ContentAccessToken, accessToken} from "../checkers/token";

export interface MustBeConnectedOptions{
	isManager?: boolean,
	isAdmin?: boolean
}

export const mustBeConnected = duplo.declareAbstractRoute("mustBeConnected")
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
		validate: (info) => info === "validToken",
		catch: (response, info) => response.code(403).info(info).send(),
		output: (drop, info, data) => drop("contentAccessToken", data),
	}
)
.cut((floor, response) => {
	const options = floor.pickup<MustBeConnectedOptions>("options");
	const contentAccessToken = floor.pickup<ContentAccessToken>("contentAccessToken");
	if(options.isAdmin && !contentAccessToken.isAdmin)response.code(403).info("errorAccessTokenAdmin").send();
	if(options.isManager && !contentAccessToken.isManager)response.code(403).info("errorAccessTokenManager").send();
})
.build({
	drop: ["contentAccessToken"],
	options: {
		isManager: false,
		isAdmin: false,
	} as MustBeConnectedOptions
});
