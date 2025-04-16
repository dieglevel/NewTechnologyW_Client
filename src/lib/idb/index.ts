// idbManager.ts

<<<<<<< Updated upstream
type StoreConfig = {
  keyPath: string;
  autoIncrement?: boolean;
};

type StoreMeta = Map<string, StoreConfig>;

const dbInstances: Map<string, IDBDatabase> = new Map();
const storeMetas: Map<string, StoreMeta> = new Map();

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

export const dbName = "myDB"

export class IDBManager<T extends { [key: string]: any }> {
  private dbName: string = dbName;
  private storeName: string;
  private keyPath: string;

  constructor( storeName: string, keyPath: string = "id") {
    this.storeName = storeName;
    this.keyPath = keyPath;

    // Register store metadata
    if (!storeMetas.has(dbName)) {
      storeMetas.set(dbName, new Map());
    }
    const meta = storeMetas.get(dbName)!;
    if (!meta.has(storeName)) {
      meta.set(storeName, { keyPath: this.keyPath, autoIncrement: true });
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
              db.createObjectStore(name, {
                keyPath: config.keyPath,
                autoIncrement: config.autoIncrement,
              });
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
=======
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
					resolve(db); 
					return;
				}
				const currentVersion = db.version;
				db.close(); 
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
>>>>>>> Stashed changes

	async add(data: T): Promise<String> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			const request = store.add(data);
			request.onsuccess = () => resolve(request.result as String);
			request.onerror = () => reject(request.error);
		});
	}

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes

	async update(data: T): Promise<void> {
		const store = await this.getStore("readwrite");
		return new Promise((resolve, reject) => {
			const request = store.put(data);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

<<<<<<< Updated upstream
  async update(data: T): Promise<void> {
    const key = data[this.keyPath];
    if (!key) throw new Error("Missing keyPath in data for update()");
    const store = await this.getStore("readwrite");
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async updateMany(data: T[]): Promise<void> {
    const store = await this.getStore("readwrite");
    return new Promise((resolve, reject) => {
      let count = 0;
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
=======
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
>>>>>>> Stashed changes
}
