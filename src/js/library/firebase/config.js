let uiConfig = () => ({
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/'
});

let config = {
  apiKey: "AIzaSyAWA-6GU2ARBmfMOTniWEZLtz_LYE5N828",
  authDomain: "drum-machine-12c62.firebaseapp.com",
  databaseURL: "https://drum-machine-12c62.firebaseio.com",
  projectId: "drum-machine-12c62",
  storageBucket: "drum-machine-12c62.appspot.com",
  messagingSenderId: "444715842758"
};

export { config, uiConfig }