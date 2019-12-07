console.log('Hello');
const jeuxDiv = document.querySelector('#card-container');
function loadJeux(jeux) {
    fetch('https://us-central1-pwa-appgame.cloudfunctions.net/getJeux')
        .then(response => {
            response.json()
                .then(jeux => {
                    const alljeux = jeux.map(t => `
                    <div class="card">
                    <img src="${t.url_background}" alt="game pic" style="width:100%">
                    <h1>${t.name}</h1>
                    <p class="description">${t.description}</p>
                    <p>
                      <i class="fas fa-star checked" size="5x"></i>
                      <i class="fas fa-star checked"></i>
                      <i class="fas fa-star checked"></i>
                      <i class="fas fa-star checked"></i>
                      <i class="fas fa-star"></i>
                    </p>
                  </div>
                </div>
                `)
                        .join('');

                    jeuxDiv.innerHTML = alljeux;
                });
        })
        .catch(console.error);
}

loadJeux(jeux);

if (navigator.serviceWorker) {
    navigator.serviceWorker
        .register('sw.js')
        .catch(err => console.error('service worker NON enregistré', err));
}

if (window.caches) {
    caches.open('jeux-1.0').then(cache => {
        cache.addAll([
            'index.html',
            'main.js',
            'style.css'
        ]);
    });
}


/*if(window.Notification && window.Notification !== "denied"){
    // demande une permission
    Notification.requestPermission(perm => {
        // vérifie si la permission est acceptée par l'utilisateur
        if(perm === "granted"){

            // 7.2 Option de la notification
            const options = {
                body : "Body de la notification",
                icon : "images/icons/icon-72x72.png"
            }

            // On crée une nouvelle notification
            // 7.2 On passe les options en deuxième argument
            const notif = new Notification("Hello notification", options);

        }
        else{
            // Notification refusée
            console.log("Notification refusée");
        }
    })
}
*/