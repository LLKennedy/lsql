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

export interface keyMapper<T> {
	(key: string): T
}

export function jsonToMap<ValT, KeyT = string>(json: { [key: string]: ValT } | string, keyMapFunc?: keyMapper<KeyT>): Map<KeyT, ValT> {
	if (typeof json === "string") {
		json = JSON.parse(json) as { [key: string]: ValT };
	}
	let m = new Map<KeyT, ValT>();
	if (keyMapFunc === undefined) {
		keyMapFunc = (key: string) => { return (key as unknown) as KeyT }
	}
	for (let k in json) {
		m.set(keyMapFunc(k), json[k]);
	}
	return m;
}