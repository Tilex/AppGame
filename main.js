  
console.log('Hello');
const jeuxDiv = document.querySelector('#jeux');

function loadJeux(jeux) {
    fetch('http://localhost:3001/jeux')
        .then(response => {
            response.json()
                .then(jeux => {
                    const alljeux = jeux.map(t => `<div><b>${t.name}</b> ${t.description}</div>`)
                            .join('');
            
                    jeuxDiv.innerHTML = alljeux; 
                });
        })
        .catch(console.error);
}

loadJeux(jeux);

	
if(window.caches) {
    caches.open('jeux-1.0').then(cache => {
        cache.addAll([
            'index.html',
            'main.js',
            'style.css'
        ]);
    });
} 