const jeuIdField = document.querySelector();

addJeuForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const payload = {
        // 9.1 Infrastructure
        id: jeuIdField,
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
                    return putJeu(payload, payload.id).then(() => {
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
            clearForm();
            document.location.href="index.html"
        })
        .catch(error => console.error(error));

        // 9.1 Infrastructure
        const clearForm = () => {
            jeunameField.value = '';
            jeuDescriptionField.value = '';
            jeuImageField.value = '';
            jeuIdField.focus();
        }; 
})