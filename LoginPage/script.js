
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


// ----------------------------functions and all begins----------------------------------------------------------------------

// this function will work whenever the form gets submitted (login-btn)
function login(event){

    event.preventDefault(); // preventing form from submitting

    // display loading icon
    var displayDiv = document.getElementById("display-div");
    displayDiv.innerHTML = `<img src="./assets/images/loading-icon.png" class="fa-spin" height="35px"> `;

    const email = document.getElementById("email-field").value;
    const password = document.getElementById("password-field").value;

    // console.log(email);
    // console.log(password);
    firebase.auth().signInWithEmailAndPassword(email, password)

    .then((userCredentials) => {
        
        // Signed in successfully
        const user = userCredentials.user;
        if(user){
            // window.location.href = "https://www.youtube.com"; // replace this link with the home page of ur website 
            window.location.href="http://localhost:3000/";
        }
    })
    
    .catch((error) => {
        // displayDiv.innerHTML = `${error}`; // remove the loading icon when error occurs
        displayDiv.innerHTML = `Wrong Credentials :(`; // remove the loading icon when error occurs
        displayDiv.style.color = "red";

        // var msgDiv = document.getElementById("msg-display-div");
        // msgDiv.innerHTML = `wrong credentials*`;
        // errorDiv.style.color = "red";
        // alert("wrong credentials");
    })
}