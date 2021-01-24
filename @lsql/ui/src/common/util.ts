export function indexString(elementIndex: number[]): string {
	let str = "";
	for (let i = 0; i < elementIndex?.length; i++) {
		if (i !== 0) {
			str += "-";
		}
		str += `${elementIndex[i]}`;
	}
	return str;
}

export function jsonToNumberMap<ValT>(json: { [key: string]: ValT }): Map<number, ValT> {
	return jsonToMap<ValT, number>(json, "number");
}

export function jsonToStringMap<ValT>(json: { [key: string]: ValT }): Map<string, ValT> {
	return jsonToMap<ValT, string>(json, "string");
}

function jsonToMap<ValT, KeyT extends string | number>(json: { [key: string]: ValT }, type: "string" | "number"): Map<KeyT, ValT> {
	let m = new Map<KeyT, ValT>();
	for (let k in json) {
		switch (type) {
			case "string":
				m.set(k as KeyT, json[k]);
			case "number":
				m.set(Number(k) as KeyT, json[k]);
			default:
				throw new Error("invalid type converting JSON to map");
		}
	}
	return m;
}