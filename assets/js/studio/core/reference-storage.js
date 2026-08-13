const InfraStackStudioReferenceStorage = (function () {
    const databaseName = 'infrastack-studio';
    const storeName = 'references';

    function openDatabase() {
        return new Promise(function (resolve, reject) {
            const request = indexedDB.open(databaseName, 1);

            request.addEventListener('upgradeneeded', function () {
                if (!request.result.objectStoreNames.contains(storeName)) {
                    request.result.createObjectStore(storeName);
                }
            });
            request.addEventListener('success', function () { resolve(request.result); });
            request.addEventListener('error', function () { reject(request.error); });
        });
    }

    function transact(projectId, mode, action) {
        return openDatabase().then(function (database) {
            return new Promise(function (resolve, reject) {
                const transaction = database.transaction(storeName, mode);
                const request = action(transaction.objectStore(storeName), projectId);

                request.addEventListener('success', function () { resolve(request.result || null); });
                request.addEventListener('error', function () { reject(request.error); });
                transaction.addEventListener('complete', function () { database.close(); });
            });
        });
    }

    /** @param {string} projectId Project ID. @param {Blob} file Image blob. @returns {Promise<void>} Completion promise. */
    function saveReference(projectId, file) {
        return transact(projectId, 'readwrite', function (store, key) { return store.put(file, key); });
    }

    /** @param {string} projectId Project ID. @returns {Promise<Blob|null>} Stored image. */
    function loadReference(projectId) {
        return transact(projectId, 'readonly', function (store, key) { return store.get(key); });
    }

    /** @param {string} projectId Project ID. @returns {Promise<void>} Completion promise. */
    function removeReference(projectId) {
        return transact(projectId, 'readwrite', function (store, key) { return store.delete(key); });
    }

    return { saveReference, loadReference, removeReference };
}());

globalThis.InfraStackStudioReferenceStorage = InfraStackStudioReferenceStorage;
