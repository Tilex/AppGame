const jeunameField = document.querySelector('#jeu-name');
const jeuDescriptionField = document.querySelector('#jeu-description');
const jeuImageField = document.querySelector('#jeu-image');
const addJeuForm = document.querySelector('#add-jeu-form');

const jeunameField2 = document.querySelector('#jeu2-name');
const jeuDescriptionField2 = document.querySelector('#jeu2-description');
const jeuImageField2 = document.querySelector('#jeu2-image');
const addJeuForm2 = document.querySelector('#add-jeu2-form');

const jeunameField3 = document.querySelector('#jeu3-name');
const jeuDescriptionField3 = document.querySelector('#jeu3-description');
const jeuImageField3 = document.querySelector('#jeu3-image');
const addJeuForm3 = document.querySelector('#add-jeu3-form');

const jeunameField4 = document.querySelector('#jeu4-name');
const jeuDescriptionField4 = document.querySelector('#jeu4-description');
const jeuImageField4 = document.querySelector('#jeu4-image');
const addJeuForm4 = document.querySelector('#add-jeu4-form');

const jeunameField5 = document.querySelector('#jeu5-name');
const jeuDescriptionField5 = document.querySelector('#jeu5-description');
const jeuImageField5 = document.querySelector('#jeu5-image');
const addJeuForm5 = document.querySelector('#add-jeu5-form');

addJeuForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const payload = {
        // 9.1 Infrastructure
        id: Date.now(),
        name: jeunameField.value,
        description: jeuDescriptionField.value,
        url_background : jeuImageField.value
    }
    //9.3 Branchement de notre Bdd Firebase
    fetch('https://us-central1-pwa-appgame.cloudfunctions.net/addJeu', { 
            method: 'POST', 
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
            if(window.Notification && window.Notification !== "denied"){
                // demande une permission
                Notification.requestPermission(perm => {
                    // vérifie si la permission est acceptée par l'utilisateur
                    if(perm === "granted"){
                        // On crée une nouvelle notification
                        const options = {
                            icon : "images/icons/icon-72x72.png"
                        }
                        const notif = new Notification( "Le jeu a bien été ajouté", options);
                    }
                    else{
                        // Notification refusée
                        console.log("Notification refusée");
                    }
                })
            }
            clearForm();
            document.location.href="accueil.html"
        })
        .catch(error => console.error(error));

        // 9.1 Infrastructure
        const clearForm = () => {
            jeunameField.value = '';
            jeuDescriptionField.value = '';
            jeuImageField.value = '';
            jeunameField.focus();
        }; 
})

addJeuForm2.addEventListener('submit', evt => {
    evt.preventDefault();
    const payload = {
        // 9.1 Infrastructure
        id: Date.now(),
        name: jeunameField2.value,
        description: jeuDescriptionField2.value,
        url_background : jeuImageField2.value
    }
    //9.3 Branchement de notre Bdd Firebase
    fetch('https://us-central1-pwa-appgame.cloudfunctions.net/addJeu', { 
            method: 'POST', 
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
            if(window.Notification && window.Notification !== "denied"){
                // demande une permission
                Notification.requestPermission(perm => {
                    // vérifie si la permission est acceptée par l'utilisateur
                    if(perm === "granted"){
                        // On crée une nouvelle notification
                        const options = {
                            icon : "images/icons/icon-72x72.png"
                        }
                        const notif = new Notification( "Le jeu a bien été ajouté", options);
                    }
                    else{
                        // Notification refusée
                        console.log("Notification refusée");
                    }
                })
            }
            clearForm();
            document.location.href="accueil.html"
        })
        
        .catch(error => console.error(error));

        // 9.1 Infrastructure
        const clearForm = () => {
            jeunameField2.value = '';
            jeuDescriptionField2.value = '';
            jeuImageField2.value = '';
            jeunameField2.focus();
        }; 
})

addJeuForm3.addEventListener('submit', evt => {
    evt.preventDefault();
    const payload = {
        // 9.1 Infrastructure
        id: Date.now(),
        name: jeunameField3.value,
        description: jeuDescriptionField3.value,
        url_background : jeuImageField3.value
    }
    //9.3 Branchement de notre Bdd Firebase
    fetch('https://us-central1-pwa-appgame.cloudfunctions.net/addJeu', { 
            method: 'POST', 
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
            if(window.Notification && window.Notification !== "denied"){
                // demande une permission
                Notification.requestPermission(perm => {
                    // vérifie si la permission est acceptée par l'utilisateur
                    if(perm === "granted"){
                        // On crée une nouvelle notification
                        const options = {
                            icon : "images/icons/icon-72x72.png"
                        }
                        const notif = new Notification( "Le jeu a bien été ajouté", options);
                    }
                    else{
                        // Notification refusée
                        console.log("Notification refusée");
                    }
                })
            }
            clearForm();
            document.location.href="accueil.html"
        })
        .catch(error => console.error(error));

        // 9.1 Infrastructure
        const clearForm = () => {
            jeunameField3.value = '';
            jeuDescriptionField3.value = '';
            jeuImageField3.value = '';
            jeunameField3.focus();
        }; 
})

addJeuForm4.addEventListener('submit', evt => {
    evt.preventDefault();
    const payload = {
        // 9.1 Infrastructure
        id: Date.now(),
        name: jeunameField4.value,
        description: jeuDescriptionField4.value,
        url_background : jeuImageField4.value
    }
    //9.3 Branchement de notre Bdd Firebase
    fetch('https://us-central1-pwa-appgame.cloudfunctions.net/addJeu', { 
            method: 'POST', 
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
            if(window.Notification && window.Notification !== "denied"){
            // demande une permission
            Notification.requestPermission(perm => {
                // vérifie si la permission est acceptée par l'utilisateur
                if(perm === "granted"){
                    // On crée une nouvelle notification
                    const options = {
                        icon : "images/icons/icon-72x72.png"
                    }
                    const notif = new Notification("Le jeu a bien été ajouté", options);
                }
                else{
                    // Notification refusée
                    console.log("Notification refusée");
                }
            })
        }
            clearForm();
            document.location.href="accueil.html"
        })
        .catch(error => console.error(error));

        // 9.1 Infrastructure
        const clearForm = () => {
            jeunameField4.value = '';
            jeuDescriptionField4.value = '';
            jeuImageField4.value = '';
            jeunameField4.focus();
        }; 
})

addJeuForm5.addEventListener('submit', evt => {
    evt.preventDefault();
    const payload = {
        // 9.1 Infrastructure
        id: Date.now(),
        name: jeunameField5.value,
        description: jeuDescriptionField5.value,
        url_background : jeuImageField5.value
    }
    //9.3 Branchement de notre Bdd Firebase
    fetch('https://us-central1-pwa-appgame.cloudfunctions.net/addJeu', { 
            method: 'POST', 
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
            if(window.Notification && window.Notification !== "denied"){
                // demande une permission
                Notification.requestPermission(perm => {
                    // vérifie si la permission est acceptée par l'utilisateur
                    if(perm === "granted"){
                        // On crée une nouvelle notification
                        const options = {
                            icon : "images/icons/icon-72x72.png"
                        }
                        const notif = new Notification( "Le jeu a bien été ajouté", options);
                    }
                    else{
                        // Notification refusée
                        console.log("Notification refusée");
                    }
                })
            }
            clearForm();
            document.location.href="accueil.html"
        })
        .catch(error => console.error(error));

        // 9.1 Infrastructure
        const clearForm = () => {
            jeunameField5.value = '';
            jeuDescriptionField5.value = '';
            jeuImageField5.value = '';
            jeunameField5.focus();
        }; 
})