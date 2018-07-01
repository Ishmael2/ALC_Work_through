const db = Idb.open("db-name", 1, upgradeDb =>{
    switch(upgradeDb.oldVersion){
    case 0:
    UpgradeDb. createObjectStore("store-name", {keyPath:'id'});
    }
    });