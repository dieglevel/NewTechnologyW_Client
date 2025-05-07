// idbManager.ts

import { normalizeMessage } from "@/utils";

type StoreConfig = {
	keyPath: string;
	autoIncrement?: boolean;
};

type StoreMeta = Map<string, StoreConfig>;

const dbInstances: Map<string, IDBDatabase> = new Map();
const storeMetas: Map<string, StoreMeta> = new Map();
const indexMetas: Map<string, any[]> = new Map();

export const RootIDB = (dbName: string) => {
	const deleteDB = () => {
		dbInstances.delete(dbName);
		return new Promise((resolve, reject) => {
			const request = indexedDB.deleteDatabase(dbName);
			request.onsuccess = () => resolve(true);
			request.onerror = () => reject(request.error);
		});
	};

	return { deleteDB };
};

export const dbName = "myDB";

export class IDBManager<T extends { [key: string]: any }> {
	private dbName: string = dbName;
	private storeName: string;
	private keyPath: string;
	private index?: any[];

	constructor(storeName: string, keyPath: string = "id", index?: any[]) {
		this.storeName = storeName;
		this.keyPath = keyPath;
		this.index = index;

		if (!storeMetas.has(dbName)) {
			storeMetas.set(dbName, new Map());
		}
		const meta = storeMetas.get(dbName)!;
		if (!meta.has(storeName)) {
			meta.set(storeName, { keyPath: this.keyPath, autoIncrement: true });
		}
		if (this.index) {
			indexMetas.set(storeName, this.index);
		}
	}

	private createIndexesForStore(objStore: IDBObjectStore, storeName: string): void {
		const indexes = indexMetas.get(storeName);

		if (indexes) {
			for (const index of indexes) {
				if (Array.isArray(index)) {
					objStore.createIndex(index.join("_"), index, { unique: false });
				} else {
					objStore.createIndex(index, index, { unique: false });
				}
			}
		}
	}

	private async initDB(): Promise<IDBDatabase> {
		if (dbInstances.has(this.dbName)) return dbInstances.get(this.dbName)!;

		return new Promise((resolve, reject) => {
			const version = 1;
			const request = indexedDB.open(this.dbName, version);

			request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
				const db = (event.target as IDBOpenDBRequest).result;
				const meta = storeMetas.get(this.dbName);

				if (meta) {
					meta.forEach((config, name) => {
						if (!db.objectStoreNames.contains(name)) {
							const objStore = db.createObjectStore(name, {
								keyPath: config.keyPath,
								autoIncrement: config.autoIncrement,
							});

							this.createIndexesForStore(objStore, name);
						}
					});
				}
			};

			request.onsuccess = () => {
				dbInstances.set(this.dbName, request.result);
				resolve(request.result);
			};

			request.onerror = () => reject(request.error);
		});
	}

	private async getStore(mode: IDBTransactionMode): Promise<IDBObjectStore> {
		const db = await this.initDB();
		const tx = db.transaction(this.storeName, mode);
		return tx.objectStore(this.storeName);
	}

	async add(data: T): Promise<IDBValidKey> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			const request = store.add(data);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async get(id: IDBValidKey): Promise<T | undefined> {
		const store = await this.getStore("readonly");
		return new Promise((resolve, reject) => {
			const request = store.get(id);
			request.onsuccess = () => resolve(request.result as T);
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

	public async getMessagesByRoomId(roomId: string): Promise<T[]> {
		const store = await this.getStore("readonly");

		return new Promise((resolve, reject) => {
			try {
				const index = store.index("roomId_createdAt");

				const keyRange = IDBKeyRange.bound([roomId, ""], [roomId, "\uffff"]);

				const request = index.getAll(keyRange);

				request.onsuccess = () => {
					const result = request.result;
					resolve(result);
				};

				request.onerror = (event) => {
					console.error("Error getting messages:", event);
					reject(request.error);
				};
			} catch (error) {
				reject(error);
			}
		});
	}

	async getAllByIndex(direction: IDBCursorDirection = "prev"): Promise<T[]> {
		const store = await this.getStore("readonly");
		return new Promise((resolve, reject) => {
			try {
				const indexNames = indexMetas.get(this.storeName)!;
				if (!indexNames || indexNames.length === 0) {
					throw new Error(`No indexes found for store: ${this.storeName}`);
				}
				const index = store.index(indexNames[0]);
				const request = index.openCursor(null, direction);

				const results: T[] = [];
				request.onsuccess = () => {
					const cursor = request.result;
					if (cursor) {
						results.push(cursor.value);
						cursor.continue();
					} else {
						resolve(results);
					}
				};
				request.onerror = () => reject(request.error);
			} catch (error) {
				reject(error);
			}
		});
	}

	async update(data: T): Promise<void> {
		try {
			const key = data[this.keyPath];
			if (!key) throw new Error("Missing keyPath in data for update()");

			const store = await this.getStore("readwrite");

			const existingData: T | undefined = await new Promise((resolve, reject) => {
				const getRequest = store.get(key);
				getRequest.onsuccess = () => resolve(getRequest.result);
				getRequest.onerror = () => reject(getRequest.error);
			});

			const newData = existingData
				? { ...existingData, ...data }
				: data;

			await new Promise<void>((resolve, reject) => {
				const request = store.put(newData);
				request.onsuccess = () => resolve();
				request.onerror = () => {
					reject(request.error);
				};
			});
		} catch (error) {
			throw error;
		}
	}

	async updateMany(data: T[]): Promise<void> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			let count = 0;
			if (!data || data.length === 0)
				resolve();
			data.forEach((item) => {
				const request = store.put(item);
				request.onsuccess = () => {
					count++;
					if (count === data.length) resolve();
				};
				request.onerror = () => reject(request.error);
			});
		});
	}

	async delete(id: IDBValidKey): Promise<void> {
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

	async initData(data: T[]): Promise<T[]> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			const request = store.clear();

			request.onsuccess = () => {
				const addRequests = data.map((item) => store.add(item));
				Promise.all(addRequests)
					.then(() => resolve(data))
					.catch((error) => reject(error));
			};
			request.onerror = () => reject(request.error);
		});
	}
}
