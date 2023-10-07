// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAioHyXYK9aNol3uN5Hi_49R4cXTjmrxU",
    authDomain: "safar-suhana-auth.firebaseapp.com",
    projectId: "safar-suhana-auth",
    storageBucket: "safar-suhana-auth.appspot.com",
    messagingSenderId: "471974559318",
    appId: "1:471974559318:web:1a3c1b6956154b015c05f7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// signup function - for new users
function signup(event){

    event.preventDefault(); // prevent form from submiting 

    var firstname = document.getElementById("firstname-field").value;
    var lastname = document.getElementById("lastname-field").value;
    var email = document.getElementById("email-field").value;
    var password =  document.getElementById("password-field").value;

    if(firstname == "" || lastname == ""){
        alert(`kindly fill both first and last name `)
        return false;
    } 

    
    // var displayDiv = document.getElementById("display-div");
    // displayDiv.innerHTML = `<img class="fa-spin" src="./assets/images/loading-icon.png">`

    // this below code will execute only if first and last name are not empty
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        
        // Signed in 
        var user = userCredential.user;
        alert("new account created, you can now Login :>");
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`${errorMessage}, can not user created  :(`);

        // ..
    });

    console.log(`${firstname}, ${lastname}, ${email}, ${password}`);
}