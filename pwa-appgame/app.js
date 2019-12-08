
(function(){


    const config = {
        apiKey: "AIzaSyBHw1eKMUVSPCZDag9EuXXthx8oom4uVb4",
        authDomain: "app-game-akajji.firebaseapp.com",
        databaseURL: "https://app-game-akajji.firebaseio.com",
        storageBucket: "app-game-akajji.appspot.com",
        messagingSenderId: "1097373638477",
        appId: "1:1097373638477:web:a7473071e422b570c22104"
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
      const promise = auth.signInWithEmailAndPassword(email,pass);
      document.location.href="loggedin.html"
      promise.catch( e => console.log(e.message));
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
          document.location.href="loggedin.html"
      }).catch(function(err){
          console.log(err);
          console.log(err.code);
          console.log(err.message);
          console.log("Failed to do");
      })

  }
  

}());