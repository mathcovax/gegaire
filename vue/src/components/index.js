import ico from "./Ico.vue";
import textInput from "./TextInput.vue";
import btn from "./Btn.vue";
import loader from "./Loader.vue";
import dateInput from "./DateInput.vue";
import form from "./Form.vue";
import selectGroups from "./SelectGroups.vue";
import frame from "./Frame.vue";
import map from "./Map.vue";
import placeInput from "./PlaceInput.vue";
import selectInput from "./SelectInput.vue";
import areaInput from "./AreaInput.vue";
import numberInput from "./NumberInput.vue";
import hourInput from "./HourInput.vue";

const components = [
	ico,
	textInput,
	btn,
	loader,
	dateInput,
	form,
	selectGroups,
	frame,
	map,
	placeInput,
	selectInput,
	areaInput,
	numberInput,
	hourInput,
];

export default {
	install(vue){
		for(const component of components){
			vue.component(component.name, component);
		}
	}
};
