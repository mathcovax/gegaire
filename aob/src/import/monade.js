function isNot(arg){
	throw arg;
}

export default function monade(toVerifValue){
	return {
		//string
		isNotString(fnc = isNot){
			if(typeof toVerifValue !== "string")fnc(typeof toVerifValue);

			return {
				lengthIsNotBetween(min, max, fnc = isNot){
					if(toVerifValue.length >= min && toVerifValue.length <= max) return this;
					else fnc(toVerifValue.length);
				},
				lengthIsNotBelow(max, fnc = isNot){
					if(toVerifValue.length <= max) return this;
					else fnc(toVerifValue.length);
				},
				lengthIsNotAbove(min, fnc = isNot){
					if(toVerifValue.length >= min) return this;
					else fnc(toVerifValue.length);
				},
				
				includes(string, fnc = () => {}){
					if(toVerifValue.includes(string) === true) return this;
					else fnc();
				},
				notIncludes(string, fnc = () => {}){
					if(toVerifValue.includes(string) === false) return this;
					else fnc();
				},

				isAqualsTo(string, fnc = () => {}){
					if(string === toVerifValue) return this;
					else fnc();
				},
				isNotAqualsTo(string, fnc = () => {}){
					if(string !== toVerifValue) return this;
					else fnc();
				},

				custom(verifFnc, fnc = isNot){
					if(verifFnc(toVerifValue) === true) return this;
					else fnc();
				},

				get value(){
					return toVerifValue;
				}
			};
		},
		isNotNullableString(fnc){
			if(
				typeof toVerifValue !== "string" &&
				toVerifValue !== null &&
				toVerifValue !== undefined
			)fnc(typeof toVerifValue);

			return {
				lengthIsNotBetween(min, max, fnc = isNot){
					if(toVerifValue === null || toVerifValue === undefined) return this;
					else if(toVerifValue.length >= min && toVerifValue.length <= max) return this;
					else fnc(toVerifValue.length);
				},
				lengthIsNotBelow(max, fnc = isNot){
					if(toVerifValue === null || toVerifValue === undefined) return this;
					else if(toVerifValue.length <= max) return this;
					else fnc(toVerifValue.length);
				},
				lengthIsNotAbove(min, fnc = isNot){
					if(toVerifValue === null || toVerifValue === undefined) return this;
					else if(toVerifValue.length >= min) return this;
					else fnc(toVerifValue.length);
				},
				
				includes(string, fnc = () => {}){
					if(toVerifValue === null || toVerifValue === undefined) return this;
					else if(toVerifValue.includes(string) === true) return this;
					else fnc();
				},
				notIncludes(string, fnc = () => {}){
					if(toVerifValue === null || toVerifValue === undefined) return this;
					else if(toVerifValue.includes(string) === false) return this;
					else fnc();
				},

				isAqualsTo(string, fnc = () => {}){
					if(string === toVerifValue) return this;
					else fnc();
				},
				isNotAqualsTo(string, fnc = () => {}){
					if(string !== toVerifValue) return this;
					else fnc();
				},

				custom(verifFnc, fnc = isNot){
					if(verifFnc(toVerifValue) === true) return this;
					else fnc();
				},

				setDefault(value){
					if(toVerifValue === null || toVerifValue === undefined) toVerifValue = value;
					return this;
				},

				get value(){
					return toVerifValue;
				}
			};
		},

		//number
		isNotNumber(fnc = isNot){
			if(typeof toVerifValue !== "number")fnc(typeof toVerifValue);

			return {
				isNotBetween(min, max, fnc = isNot){
					if(toVerifValue.length >= min && toVerifValue.length <= max) return this;
					else fnc(toVerifValue.length);
				},
				isNotBelow(max, fnc = isNot){
					if(toVerifValue.length <= max) return this;
					else fnc(toVerifValue.length);
				},
				isNotAbove(min, fnc = isNot){
					if(toVerifValue.length >= min) return this;
					else fnc(toVerifValue.length);
				},

				isAqualsTo(number, fnc = () => {}){
					if(number === toVerifValue) return this;
					else fnc();
				},
				isNotAqualsTo(number, fnc = () => {}){
					if(number !== toVerifValue) return this;
					else fnc();
				},

				custom(verifFnc, fnc = isNot){
					if(verifFnc(toVerifValue) === true) return this;
					else fnc();
				},

				get value(){
					return toVerifValue;
				}
			};
		},
		isNotNullableNumber(fnc){
			if(
				typeof toVerifValue !== "number" &&
				toVerifValue !== null && 
				toVerifValue !== undefined
			)fnc(typeof toVerifValue);

			return {
				isNotBetween(min, max, fnc = isNot){
					if(toVerifValue === null || toVerifValue === undefined) return this;
					else if(toVerifValue.length >= min && toVerifValue.length <= max) return this;
					else fnc(toVerifValue.length);
				},
				isNotBelow(max, fnc = isNot){
					if(toVerifValue === null || toVerifValue === undefined) return this;
					else if(toVerifValue.length <= max) return this;
					else fnc(toVerifValue.length);
				},
				isNotAbove(min, fnc = isNot){
					if(toVerifValue === null || toVerifValue === undefined) return this;
					else if(toVerifValue.length >= min) return this;
					else fnc(toVerifValue.length);
				},

				isAqualsTo(number, fnc = () => {}){
					if(number === toVerifValue) return this;
					else fnc();
				},
				isNotAqualsTo(number, fnc = () => {}){
					if(number !== toVerifValue) return this;
					else fnc();
				},

				custom(verifFnc, fnc = isNot){
					if(verifFnc(toVerifValue) === true) return this;
					else fnc();
				},

				setDefault(value){
					if(toVerifValue === null || toVerifValue === undefined) toVerifValue = value;
					return this;
				},

				get value(){
					return toVerifValue;
				}
			};
		},

		//bool
		isNotBool(fnc){
			if(typeof toVerifValue !== "boolean")fnc(typeof toVerifValue);

			return {
				isTrue(fnc = isNot){
					if(toVerifValue === true) return this;
					else fnc();
				},
				isfalse(fnc = isNot){
					if(toVerifValue === false) return this;
					else fnc();
				},

				custom(verifFnc, fnc = isNot){
					if(verifFnc(toVerifValue) === true) return this;
					else fnc();
				},

				get value(){
					return toVerifValue;
				}
			};
		},
		isNotNullableBool(fnc){
			if(
				typeof toVerifValue !== "boolean" &&
				toVerifValue !== null && 
				toVerifValue !== undefined
			)fnc(typeof toVerifValue);

			return {
				isTrue(fnc = isNot){
					if(toVerifValue === true) return this;
					else fnc();
				},
				isfalse(fnc = isNot){
					if(toVerifValue === false) return this;
					else fnc();
				},

				custom(verifFnc, fnc = isNot){
					if(verifFnc(toVerifValue) === true) return this;
					else fnc();
				},

				setDefault(value){
					if(toVerifValue === null || toVerifValue === undefined) toVerifValue = value;
					return this;
				},

				get value(){
					return toVerifValue;
				}
			};
		},

		isNotObject(fnc){
			if(typeof toVerifValue !== "object" || Array.isArray(toVerifValue))fnc(typeof toVerifValue, Array.isArray(toVerifValue));

			return {
				testProperties(){
					
				},

				get value(){
					return toVerifValue;
				}
			};
		},
		isNotNullableObject(fnc){

		},

		isNotArray(fnc){

		},
		isNotNullableArray(fnc){

		},

		[Symbol.iterator]: function* (){
			for(const key in toVerifValue){
				yield monade(toVerifValue[key]);
			}
		},
	};
}

