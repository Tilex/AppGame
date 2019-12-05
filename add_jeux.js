const jeuxnameField = document.querySelector('#jeux-name');
const jeuxDescriptionField = document.querySelector('#jeux-description');
const jeuxUrlField = document.querySelector('#jeux-url');
const addJeuxForm = document.querySelector('#add-jeux-form');
 
addJeuxForm.addEventListener('submit', evt => {
    evt.preventDefault();
    
    const payload = {
        name: jeuxnameField.value,
        description: jeuxDescriptionField.value,
        url: jeuxUrlField.value
    }
 
    fetch('http://localhost:3001/jeuxs', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(resp => {
            console.log(resp);
        })
        .catch(err =>console.error);
})