const DB_NAME = 'PhotoBookDB';
const DB_VERSION = 1;
const STORE_NAME = 'images';

let dbInstance: IDBDatabase | null = null;

const getDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      return resolve(dbInstance);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB error:', request.error);
      reject('IndexedDB error');
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // The 'id' will be the keyPath for our image objects
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

export const initDB = async () => {
    await getDB();
};

export const saveImageToDB = async (id: string, blob: Blob): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    // Store the image blob with its ID
    const request = store.put({ id, blob });

    request.onsuccess = () => resolve();
    request.onerror = () => {
        console.error('Failed to save image to DB:', request.error);
        reject(request.error);
    };
  });
};

export const getImageFromDB = async (id: string): Promise<Blob | null> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
        resolve(request.result ? request.result.blob : null);
    };
    request.onerror = () => {
        console.error('Failed to get image from DB:', request.error);
        reject(request.error);
    };
  });
};

export const deleteImageFromDB = async (id: string): Promise<void> => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);
    
    request.onsuccess = () => resolve();
    request.onerror = () => {
        console.error('Failed to delete image from DB:', request.error);
        reject(request.error);
    };
  });
};
