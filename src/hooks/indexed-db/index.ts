import { useEffect, useState } from "react";

interface IndexedDBType {
   databaseName: string;
   storeName: string;
   databaseVersion: number;
}

// Hook cho IndexedDB
export const useIndexedDB = <T>({databaseName, storeName, databaseVersion}: IndexedDBType) => {
	const [db, setDb] = useState<IDBDatabase | null>(null);

	// Mở hoặc tạo database khi component mount
	useEffect(() => {
		const request = indexedDB.open(databaseName, databaseVersion);

		console.log(db);

		request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(storeName)) {
				db.createObjectStore(storeName, { keyPath: "id" });
			}
		};

		request.onsuccess = (event: Event) => {
			setDb((event.target as IDBOpenDBRequest).result);
		};

		request.onerror = (event: Event) => {
			console.error("Error opening database:", (event.target as IDBOpenDBRequest).error);
		};
	}, []);

	// Thêm dữ liệu vào IndexedDB
	const addItem = (item: T): void => {
		if (!db) return;
		const transaction = db.transaction(storeName, "readwrite");
		const store = transaction.objectStore(storeName);
		store.add(item);
	};

	// Lấy dữ liệu theo ID
	const getItemById = (id: number, callback: (data: T | undefined) => void): void => {
		if (!db) return;
		const transaction = db.transaction(storeName, "readonly");
		const store = transaction.objectStore(storeName);
		const request = store.get(id);
		request.onsuccess = () => callback(request.result);
	};

	// Lấy tất cả dữ liệu
	const getAllItems = (callback: (data: T[]) => void): void => {
		if (!db) return;
		const transaction = db.transaction(storeName, "readonly");
		const store = transaction.objectStore(storeName);
		const request = store.getAll();
		request.onsuccess = () => callback(request.result);
	};

	// Cập nhật dữ liệu
	const updateItem = (item: T): void => {
		if (!db) return;
		const transaction = db.transaction(storeName, "readwrite");
		const store = transaction.objectStore(storeName);
		store.put(item);
	};

	// Xóa dữ liệu
	const deleteItem = (id: number): void => {
		if (!db) return;
		const transaction = db.transaction(storeName, "readwrite");
		const store = transaction.objectStore(storeName);
		store.delete(id);
	};

	return { addItem, getItemById, getAllItems, updateItem, deleteItem };
};
