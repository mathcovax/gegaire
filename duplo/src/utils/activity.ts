export function compareHour(hourStart?: string, hourEnd?: string){
	if(!hourStart && !hourEnd) return null;
	else if(
		!hourStart || 
		!hourEnd || 
		Number.isNaN(parseFloat(hourStart?.replace(":", "."))) ||
		Number.isNaN(parseFloat(hourEnd?.replace(":", "."))) ||
		parseFloat(hourStart?.replace(":", ".") || "2.00") > parseFloat(hourEnd?.replace(":", ".") || "1.00")
	) return false;
	else return true;
}
