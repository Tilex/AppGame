 function remove_jeu(item) {
    //const removeJeuForm = $(item).attr("id");
    id_jeux = item.dataset["id_jeux"];

    const payload = {
        // 9.1 Infrastructure
        id: id_jeux,
    }
    //9.3 Branchement de notre Bdd Firebase
    fetch('https://us-central1-pwa-appgame.cloudfunctions.net/deleteJeu', { 
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            console.log('resp to post to /jeux', resp);
        })
        // 9.1 Infrastructure
        .catch(() => {
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                console.log('SyncManager supported by browser');
                console.log('we are probably offline');
                navigator.serviceWorker.ready.then(registration => {
                    // put jeu in IndexedDB for later syncing
                    return deleteJeu(payload.id).then(() => {
                        // register a sync with the ServiceWorker
                        return registration.sync.register('sync-jeux')
                    });
                })
            } else {
                // TODO browser does NOT support SyncManager: send data to server via ajax
                console.log('SyncManager NOT supported by your browser');
            }
        })
        .then(() => {
            document.location.href="accueil.html"
        })
        .catch(error => console.error(error));
};