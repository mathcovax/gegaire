import jwt, {JwtPayload, TokenExpiredError, VerifyErrors} from "jsonwebtoken";
import {duplo} from "../../main";

export interface ContentAccessToken{
	id: number;
	isManager: boolean;
	isAdmin: boolean;
}

export const accessToken = duplo.createChecker(
	"accessToken",
	{
		handler(value: string, output){
			try {
				return output(
					"validToken", 
					(jwt.verify(value, process.env.KEY_ACCESS_TOKEN as string) as JwtPayload).info as ContentAccessToken
				);
			}
			catch (error){
				if(error instanceof TokenExpiredError) return output("invalidToken", undefined);
				else return output("invalidToken", undefined);
				
			}
		},
		outputInfo: ["invalidToken", "expireAccessToken", "validToken"]
	}
);
