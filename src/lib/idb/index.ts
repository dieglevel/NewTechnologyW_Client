// idbManager.ts

const DB_NAME = "myDatabase";
const DB_VERSION = 1;

export const RootIDB = () => {
	const initDB = () => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(DB_NAME, DB_VERSION);

			request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
				const db = (event.target as IDBOpenDBRequest).result;
				if (!db.objectStoreNames.contains("users")) {
					db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
				}
			};

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	};

	const deleteDB = () => {
		return new Promise((resolve, reject) => {
			const request = indexedDB.deleteDatabase(DB_NAME);
			request.onsuccess = () => resolve(true);
			request.onerror = () => reject(request.error);
		});
	};

	return { initDB, deleteDB };
};

export class IDBManager<T extends { id?: string }> {
	private storeName: string;
	private keyPath?: string = "id";

	constructor(storeName: string, keyPath?: string) {
		this.storeName = storeName;
		if (keyPath) {
			this.keyPath = keyPath;
		}
	}

	public async initDB(): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(DB_NAME);

			request.onsuccess = (e) => {
				const db = (e.target as IDBOpenDBRequest).result;

				if (db.objectStoreNames.contains(this.storeName)) {
					resolve(db); // Store đã tồn tại
					return;
				}

				const currentVersion = db.version;
				db.close(); // Đóng DB cũ

				const secondRequest = indexedDB.open(DB_NAME, currentVersion + 1);

				secondRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
					const upgradedDB = (event.target as IDBOpenDBRequest).result;
					upgradedDB.createObjectStore(this.storeName, {
						keyPath: this.keyPath,
						autoIncrement: true,
					});
				};

				secondRequest.onsuccess = () => resolve(secondRequest.result);
				secondRequest.onerror = () => reject(secondRequest.error);
			};

			request.onerror = () => reject(request.error);
		});
	}

	private async getStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
		try {
			const db = await this.initDB();
			const tx = db.transaction(this.storeName, mode);
			return tx.objectStore(this.storeName);
		} catch (error) {
			console.error("Error getting store:", error);
			throw error;
		}
	}

	async add(data: T): Promise<String> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			const request = store.add(data);
			request.onsuccess = () => resolve(request.result as String);
			request.onerror = () => reject(request.error);
		});
	}

	async get(id: string): Promise<T | undefined> {
		const store = await this.getStore("readonly");
		return new Promise((resolve, reject) => {
			const request = store.get(id);
			request.onsuccess = () => resolve(request.result as T | undefined);
			request.onerror = () => reject(request.error);
		});
	}

	async getAll(): Promise<T[]> {
		const store = await this.getStore("readonly");
		return new Promise((resolve, reject) => {
			const request = store.getAll();
			request.onsuccess = () => resolve(request.result as T[]);
			request.onerror = () => reject(request.error);
		});
	}

	async update(data: T): Promise<void> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			const request = store.put(data);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async delete(id: string): Promise<void> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			const request = store.delete(id);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async clear(): Promise<void> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			const request = store.clear();
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}
}
