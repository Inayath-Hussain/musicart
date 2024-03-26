// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { env } from "./env";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: env.FIREBASE_API_KEY,
//     authDomain: env.FIREBASE_AUTH_DOMAIN,
//     projectId: env.FIREBASE_PROJECTID,
//     storageBucket: env.FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
//     appId: env.FIREBASE_APP_ID
// };

// // Initialize Firebase
// export const firebaseApp = initializeApp(firebaseConfig);





import { cert, initializeApp } from "firebase-admin/app";
import { env } from "./env";

export const firebaseApp = initializeApp({
    credential: cert({
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        projectId: env.FIREBASE_PROJECT_ID,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n')
    }),
    storageBucket: env.FIREBASE_STORAGE_BUCKET
})