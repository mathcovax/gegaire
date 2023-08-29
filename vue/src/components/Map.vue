<template>
	<div map>
		<div 
		:id="'map-' + id"
		class="map"
		/>

		<div 
		:id="'geocoder-' + id"
		class="geocoder"
		/>

		<div class="slots">
			<slot/>
		</div>
	</div>
</template>

<script>
import {defineComponent} from "vue";
import Mapbox from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default defineComponent({
	name: "Map",
	props: {
		modelValue: {
			default(){
				return {};
			},
		},
	},
	emits: ["update:modelValue", "load"],
	data(){
		return {
			token: "pk.eyJ1IjoibWF0aGNvdmF4IiwiYSI6ImNsZGxlaXZ2aDAwdDIzb2xham93cnRzeGMifQ.701wXmLToU4glj9-czCRQg",
			map: false,
			geocoder: false,
			id: (Math.random() + 1).toString(36).substring(2),
			center: {lng: 2.29, lat: 48.85},
			zoom: 12,
			countries: "fr",
			marker: false,
		};
	},
	methods: {
		init(){
			this.map = new Mapbox.Map({
				accessToken: this.token,
				container: "map-" + this.id,
				center: this.center,
				zoom: this.zoom,
				style: "mapbox://styles/mapbox/streets-v12"
			});

			this.map.on("load", this.load);

			this.geocoder = new MapboxGeocoder({
				accessToken: this.token,
				mapboxgl: Mapbox,
				placeholder: "Rechercher",
				flyTo: {duration: 0},
				countries: this.countries,
			});

			this.geocoder.addTo("#geocoder-" + this.id);
			this.geocoder.on("result", this.geocoderResult);
		}, 
        
		load(){
			this.map.doubleClickZoom.disable();
			this.resize();
			this.$emit("load", this.map);
		},

		resize(){
			setTimeout(() => {
				this.map.resize();
			}, 200);
		},

		geocoderResult({result}){
			this.map.jumpTo({
				center: result.center,
				zoom: 15,
			});
            
			if(this.marker !== false) this.marker.remove();
			this.marker = new Mapbox.Marker()
			.setLngLat(result.center)
			.addTo(this.map);

			try {
				this.$emit("update:modelValue", {
					lng: result.center[0],
					lat: result.center[1],
					postcode: (() => {
						let code = result.context.find(value => value.id.startsWith("postcode"));
						return code.text;
					})(),
					text: result.place_name,
					city: (() => {
						let city = result.context.find(value => value.id.startsWith("place"));
						return city.text;
					})(),
				});
			}
			catch {
				this.$emit("update:modelValue", false);
			}
		},
	},
	mounted(){
		this.init();
	},
	unmounted(){
		this.map.remove(); 
	}
});
</script>


<style lang="scss">
div[map]{
    max-width: 100%;
    max-height: 100%;
    position: relative;

    .map{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .geocoder{
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
    }

    .slots{
        top: 0;
        left: 0;
        width: 0;
        height: 0;
    }
}
</style>
