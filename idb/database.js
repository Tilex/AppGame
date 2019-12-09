function jeuDb() {
    return idb.open('jeu-store', 2, upgradeDB => {
        switch (upgradeDB.oldVersion) {
            case 0: upgradeDB.createObjectStore('jeu')
        }
    })
}

function getJeu(id) {
    return jeuDb().then(db => {
        return db.transaction('jeu')
            .objectStore('jeu').get(id);
    })
}

function putJeu(value, key) {
    return jeuDb().then(db => {
        const tx = db.transaction('jeu', 'readwrite');
        tx.objectStore('jeu').put(value, key);
        return tx.complete;
    });
}

function deleteJeu(id) {
    return jeuDb().then(db => {
        const tx = db.transaction('jeu', 'readwrite');
        tx.objectStore('jeu').delete(id);
        return tx.complete;
    });
}

function clearJeux() {
    return jeuDb().then(db => {
        const tx = db.transaction('jeu', 'readwrite');
        tx.objectStore('jeu').clear();
        return tx.complete;
    });
}

function getAllJeux() {
    return jeuDb().then(db => {
        return db.transaction('jeu')
            .objectStore('jeu').getAllKeys().then(keys => {
                return Promise.all(keys.map(id => getJeu(id).then(content => (Object.assign({}, { id }, content)))))
            });
    })
}