const functions = require("firebase-functions");
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.database();
const refJeux = db.ref('/jeux');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from a Severless Database!");
});

const getJeuxFromDatabase = (res) => {
    let jeux = [];

    return refJeux.on('value', (snapshot) => {
        snapshot.forEach((jeu) => {
            let objJeu = jeu.val();
            objJeu.id = jeu.key;
            jeux.push(objJeu);
        });
        res.status(200).json(jeux);
    }, (error) => {
        res.status(500).json({
            message: `Something went wrong. ${error}`
        })
    })
};

exports.addJeu = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not allowed'
            })
        }
        console.log(req.body);
        const jeu = req.body;
        refJeux.child(jeu.id).set(jeu);
        getJeuxFromDatabase(res);
    });
});

exports.getJeux = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'GET') {
            return res.status(500).json({
                message: 'Not allowed'
            });
        }
        getJeuxFromDatabase(res)
    });
});

exports.deleteJeu = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'DELETE') {
            return res.status(500).json({
                message: 'Not allowed'
            })
        }
        const id = req.query.id
        refJeux.child(id).remove()
        getJeuxFromDatabase(res)
    })
})