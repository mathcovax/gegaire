export default class Queue{
	constructor(time = 0){
		this.#time = time;
		this.#process();
	}

	async push(fnc){
		this.#inc++;
		return await new Promise(resovle => {
			this.#list[this.#inc] = {
				fnc,
				resovle
			};

			if(this.#resovle !== false){
				this.#resovle();
				this.#resovle = false;
			}
		});
		
	}

	async #process(){
		for await (const {fnc, resovle} of this.#getProcess()){
			try {
				resovle(await fnc());
			}
			catch (error){
				resovle(error);
			}
		}
	}

	async * #getProcess(){
		while(true){
			for(const [key, obj] of Object.entries(this.#list)){
				delete this.#list[key];
				yield obj;
				await new Promise(r => setInterval(r, this.#time));
			}

			if(Object.keys(this.#list).length === 0) await new Promise(r => this.#resovle = r);
		}
	}

	#list = {};

	#inc = 0;

	#resovle = false;

	#time;
}
