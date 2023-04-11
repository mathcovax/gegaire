import {defineStore} from "pinia";

export const fixedStore = defineStore(
	"fixedStore",
	{
		state(){
			return {
				loader: [],
				loaderTimeout: [],

				toasts: []
			};
		},

		actions: {
			requestLoader(id){
				id = id || (Date.now() + "-" + Math.random());
				let timeout = setTimeout(() => this.loader.push(id), 150);
				this.loaderTimeout.push({id, timeout});

				return {
					id,
					close: (cid = id) => this.closeLoader(cid)
				}; 
			},
			closeLoader(id){
				let timeout = this.loaderTimeout.find(v => v.id === id)?.timeout;
				if(timeout === undefined) return;
				clearTimeout(timeout);
				if(this.loader.findIndex(v => v === id) !== -1){
					setTimeout(() => {
						this.loader = this.loader.filter(v => v !== id);
					}, 300);
				}
				this.loaderTimeout = this.loaderTimeout.filter(v => v.id !== id);
			},
			toasterPush(status, message){
				let id = Date.now() + "-" + Math.random();

				if(this.toasts.findIndex(v => v.message === message) !== -1){
					this.toasts = this.toasts.filter(v => v.message !== message);
				}
				
				this.toasts.push({
					id,
					status,
					message
				});

				setTimeout(() => {
					this.toasts = this.toasts.filter(v => v.id !== id);
				}, 8000);

				
			},
			toasterKill(toast){
				this.toasts = this.toasts.filter(v => v.id !== toast.id);
			}
		}
	}
);
