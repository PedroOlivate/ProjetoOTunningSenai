

  var firebaseConfig = {
    apiKey: "AIzaSyDni9msfbXK5oGKb0H5pOFW8IyMU-EhcfY",
    authDomain: "fir-l-14ac5.firebaseapp.com",
    projectId: "fir-l-14ac5",
    storageBucket: "fir-l-14ac5.appspot.com",
    messagingSenderId: "692892477461",
    appId: "1:692892477461:web:132a5ea754d022e24d461c"
  };
  firebase.initializeApp(firebaseConfig);

  const auth =  firebase.auth();

  function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
    //
    promise.catch(e=>alert(e.message));
    alert("Login efetuado com sucesso!");
  }

  function  signIn(){
    var email = document.getElementById("email");
    var password  = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value,password.value);
    promise.catch(e=>alert(e.message));
    
  }



  function signOut(){
    auth.signOut();
    alert("Deslogado com sucesso!");
    window.location.href = "index.html"
  }
//   
 