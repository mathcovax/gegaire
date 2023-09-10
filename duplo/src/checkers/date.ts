import {duplo} from "../../main";

export interface CompareDatesOptions{
	maxBetween?: number;
	minBetween?: number;
	unit?: "day" | "week" | "month" | "year";
}

const units = {
	day: 86400000,
	week: 86400000 * 7,
	month: 86400000 * 7 * 4,
	year: 86400000 * 7 * 4 * 12,
};

export const compareDates = duplo.createChecker(
	"compareDates",
	{
		handler({date1, date2}: {date1: Date, date2: Date}, output, options){
			const timeDate1 = date1.getTime();
			const timeDate2 = date2.getTime();
			
			if(timeDate1 > timeDate2) return output("data1MoreThanDate2", undefined);
			
			if(options.maxBetween && timeDate2 - timeDate1 > options.maxBetween * units[options.unit || "day"]) return output("toMuchBetween", undefined);
			if(options.minBetween && timeDate2 - timeDate1 < options.minBetween * units[options.unit || "day"]) return output("notEnoughBetween", undefined);
			
			return output("validCompare", undefined);
		},
		outputInfo: [
			"data1MoreThanDate2", "notEnoughBetween", "toMuchBetween", "validCompare"
		],
		options: {} as CompareDatesOptions
	}
);
