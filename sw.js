console.log("hello depuis le service worker");

const cacheName = 'jeux' + '1.0';

	
// 9.6 Synchroniser les données au retour de la connexion
// Ajout des imports pour les appels méthodes hors connexion
self.importScripts('idb/idb.js', 'idb/database.js');
 
// ..
 
 
// 9.6 Synchroniser les données au retour de la connexion
self.addEventListener('sync', event => {
    console.log('sync event', event);
    // test du tag de synchronisation utilisé dans add_jeu
    if (event.tag === 'sync-jeux') {
        console.log('syncing', event.tag);
        // Utilisation de waitUntil pour s'assurer que le code est exécuté (Attend une promise)
        event.waitUntil(updateJeuPromise);
    }
})
 
// 9.6 Synchroniser les données au retour de la connexion
// constante de la Promise permettant de faire la synchronisation
const updateJeuPromise = new Promise(function(resolve, reject) {
 
    // récupération de la liste des jeux de indexedDB
    getAllJeux().then(jeux => {
        console.log('got jeux from sync callback', jeux);
        
        // pour chaque item : appel de l'api pour l'ajouter à la base
        jeux.map(jeu => {
            console.log('Attempting fetch', jeu);
            fetch('https://us-central1-pwa-appgame.cloudfunctions.net/addJeu', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(jeu)
            })
            .then(() => {
                // Succès : suppression de l'item en local si ajouté en distant
                console.log('Success update et id supprimée', jeu.id);
                return deleteJeu(jeu.id);
            })
            .catch(err => {
                // Erreur
                console.log('Error update et id supprimée', err);
                resolve(err);
            })
        })
 
    })
});

self.addEventListener('install', (evt) => {
    console.log(`sw installé à ${new Date().toLocaleTimeString()}`);

    const cachePromise = caches.open(cacheName).then(cache => {
        return cache.addAll([
            'idb/idb.js',
            'idb/database.js',
            'accueil.html',
            'main.js',
            'style.css',
            'add_jeux.html',
            'add_jeux.js',
        ])
            .then(console.log('cache initialisé'))
            .catch(console.err);
    });

    evt.waitUntil(cachePromise);

});

self.addEventListener('activate', (evt) => {
    console.log(`sw activé à ${new Date().toLocaleTimeString()}`);

    // 5.4 Supprimer les anciennes instances de cache
    let cacheCleanPromise = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== cacheName) {
                caches.delete(key);
            }
        });
    });

    evt.waitUntil(cacheCleanPromise);
});

//..
self.addEventListener('fetch', (evt) => {

    // 5.3 Stratégie de network first with cache fallback
    // On doit envoyer une réponse
    if(evt.request.method === 'POST') {
        return;
    }
    evt.respondWith(
        // on doit d'abord faire une requête sur le réseau de ce qui a été intercepté
        fetch(evt.request).then(res => {
            console.log("url récupérée depuis le réseau", evt.request.url);
            // mettre dans le cache le résultat de cette réponse : en clef la requête et en valeur la réponse
            caches.open(cacheName).then(cache => cache.put(evt.request, res));
            // quand on a la réponse on la retourne (clone car on ne peut la lire qu'une fois)
            return res.clone();
        })
            // Si on a une erreur et que l'on arrive pas à récupérer depuis le réseau, on va chercher dans le cache
            .catch(err => {
                console.log("url récupérée depuis le cache", evt.request.url);
                return caches.match(evt.request);
            })
    );


    // if(!navigator.onLine) {
    //     const headers = { headers: { 'Content-Type': 'text/html;charset=utf-8'} };
    //     evt.respondWith(new Response('<h1>Pas de connexion internet</h1><div>Application en mode dégradé. Veuillez vous connecter</div>', headers));
    // }

    // console.log('sw intercepte la requête suivante via fetch', evt);
    // console.log('url interceptée', evt.request.url);


    // // 5.1 Stratégie : cache only with network callback
    // evt.respondWith(
    //     caches.match(evt.request)
    //         .then(cachedResponse => {   
    //             if (cachedResponse) {
    //                 // 5.2 identification de la requête trouvée dans le cache
    //                 console.log("url depuis le cache", evt.request.url);

    //                 return cachedResponse;
    //             }

    //             // 5.1 Stratégie de cache
    //             return fetch(evt.request).then(
    //                 // On récupère la requête
    //                 function(newResponse) {
    //                     // 5.2 identification de la requête ajoutée au cache
    //                     console.log("url depuis le réseau et mise en cache", evt.request.url);

    //                     // Accès au cache
    //                     caches.open(cacheName).then(
    //                         function(cache){
    //                             // ajout du résultat de la requête au cache
    //                             cache.put(evt.request, newResponse);
    //                         }
    //                     );
    //                     // Utilisation de clone car on ne peut utiliser qu'une fois la réponse
    //                     return newResponse.clone();
    //                 }
    //             )
    //         }
    //     )
    // );


});

/*self.registration.showNotification("Notification du SW", {
    body:"je suis une notification dite persistante",
  
    // 7.4 Options de notifications grâce aux actions
    actions:[
        {action:"accept", title:"accepter"},
        {action: "refuse", title: "refuser"}
    ]
})
 
// 7.4 Options de notifications grâce aux actions
// Ecouteur au clic d'un des deux boutons de la notification
self.addEventListener("notificationclick", evt => {
    console.log("notificationclick evt", evt);
    if(evt.action === "accept"){
        console.log("vous avez accepté");
    } else if(evt.action === "refuse"){
        console.log("vous avez refusé");
    } else{
        console.log("vous avez cliqué sur la notification (pas sur un bouton)");
    }
  
    // 7.5 Fermer programmatiquement une notification
    evt.notification.close();
})*/