(function(){


    const config = {
        apiKey: "AIzaSyC7A8wBklJGRYhLIIDjqJ2GXXya4cLyWlQ",
        authDomain: "pwa-appgame.firebaseapp.com",
        databaseURL: "https://pwa-appgame.firebaseio.com",
        projectId: "pwa-appgame",
        storageBucket: "pwa-appgame.appspot.com",
        messagingSenderId: "963010366551",
        appId: "1:963010366551:web:43bce5da03aba73b816712"
      };
      
      firebase.initializeApp(config);

  const txtEmail = document.getElementById("email1");
  const txtPassword = document.getElementById("password");
  const btnInscription = document.getElementById("inscription");
  const btnConnexion = document.getElementById("connexion");
  const btnDisconnect = document.getElementById("logout");

  if(btnConnexion){
    btnConnexion.addEventListener('click',e =>{
        //get email and pass
        const email =txtEmail.value;
        const pass =txtPassword.value;
        const auth = firebase.auth();
        //sign in
        if(email!=null && pass!=null){
        const promise = auth.signInWithEmailAndPassword(email,pass).then(function(){
          document.location.href="accueil.html"
          console.log('log in succesful');
      }).catch(function(error){
          console.log(error.message);
      });
    }
  
    });
  };

if(btnInscription){
  btnInscription.addEventListener('click',e => {
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //sign in
      const promise =auth.createUserWithEmailAndPassword(email,pass);
      promise.catch(e => console.log(e.message));
  });
};
if(btnDisconnect){
  btnDisconnect.addEventListener('click',e =>{
    firebase.auth().signOut().then(function(){
        document.location.href="index.html"
        console.log('log out succesful');
    }).catch(function(error){
        console.log(error.message);
    });
  });
};

  firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
            
        }else{
            console.log('not logged in');

        }
  });

  

  //google

  googleSignIn=()=>{
      base_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(base_provider).then(function(result){
          console.log(result);
          console.log(result.user);
          console.log("success.. Googlla Account Linked");
          document.location.href="accueil.html"
      }).catch(function(err){
          console.log(err);
          console.log(err.code);
          console.log(err.message);
          console.log("Failed to do");
      })

  }
  

}());