const email = document.querySelector('#email1');
const pseudo = document.querySelector('#pseudo');
const password = document.querySelector('#password');
const inscriptionForm = document.querySelector('#inscription');

inscriptionForm.addEventListener('submit', evt => {
    evt.preventDefault();
    
    const payload = {
        // 9.1 Infrastructure
        id: Date.now(),
        email: email.value,
        pseudo: pseudo.value,
        password: password.value,
    }

    //9.3 Branchement de notre Bdd Firebase
    fetch('https://us-central1-pwa-technos-lkj.cloudfunctions.net/addTechno', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            console.log('resp to post to /technos', resp);
        })
        // 9.1 Infrastructure
        .catch(() => {
            if ('serviceWorker' in navigator && 'SyncManager' in window) {
                console.log('SyncManager supported by browser');
                console.log('we are probably offline');
                navigator.serviceWorker.ready.then(registration => {
                    // put techno in IndexedDB for later syncing
                    return putTechno(payload, payload.id).then(() => {
                        // register a sync with the ServiceWorker
                        return registration.sync.register('sync-technos')
                    });
                })
            } else {
                // TODO browser does NOT support SyncManager: send data to server via ajax
                console.log('SyncManager NOT supported by your browser');
            }
        })
        .then(() => {
            clearForm();
        })
        .catch(error => console.error(error));

        // 9.1 Infrastructure
        const clearForm = () => {
            email.value = '';
            pseudo.value = '';
            password.value = '';
            email.focus();
        }; 
})