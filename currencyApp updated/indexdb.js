var Currency = (function() {
  var tDB = {};
  var datastore = null;

tDB.open = function(callback) {
  
  var version = 1;

  
  var request = indexedDB.open('currency', version);

  
  request.onupgradeneeded = function(e) {
    var db = e.target.result;

    e.target.transaction.onerror = tDB.onerror;

    
    if (db.objectStoreNames.contains('currency')) {
      db.deleteObjectStore('currency');
    }

    
    var store = db.createObjectStore('currency', {
      keyPath: 'timestamp'
    });
  };

  
  request.onsuccess = function(e) {
    
    datastore = e.target.result;

    
    callback();
  };

  
  request.onerror = tDB.onerror;
};

  
  return tDB;
 
tDB.fetchTodos = function(callback) {
  var db = datastore;
  var transaction = db.transaction(['currency'], 'readwrite');
  var objStore = transaction.objectStore('currency');

  var keyRange = IDBKeyRange.lowerBound(0);
  var cursorRequest = objStore.openCursor(keyRange);

  var currency = [];

  transaction.oncomplete = function(e) {
    
    callback(Currency);
  };

  cursorRequest.onsuccess = function(e) {
    var result = e.target.result;

    if (!!result == false) {
      return;
    }

    currency.push(result.value);

    result.continue();
  };

  cursorRequest.onerror = tDB.onerror;
};
}());