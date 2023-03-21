export const getData = (key: string) => {
	if (!localStorage) return;

	try {
		const itemFromStorage = localStorage.getItem(key);

		if (itemFromStorage) {
			return JSON.parse(itemFromStorage);
		}
	} catch (err) {
		console.error(`Error getting item ${key} from localStorage`, err);
	}
};

export const storeData = <T>(key: string, item: T) => {
	if (!localStorage) return;

	try {
		localStorage.setItem(key, JSON.stringify(item));
	} catch (err) {
		console.error(`Error storing item ${key} to localStorage`, err);
	}
};
