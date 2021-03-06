import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const config = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_DATABASE_URL,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APP_ID,
   measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
   constructor() {
      if (!app.length) {
         app.initializeApp(config);
      }

      this.auth = app.auth();
      this.db = app.firestore();
      this.fieldvalue = app.firestore.FieldValue;
   }

   //***Auth API***
   doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
   doSignInWithEmailAndPassWord = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
   doSignOut = () => this.auth.signOut();
   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
   doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
   doSendEmailVerification = () =>
      this.auth.currentUser.sendEmailVerification({
         url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
      });

   // *** Merge Auth and DB User API *** //
   onAuthUserListener = (next, fallback) =>
      this.auth.onAuthStateChanged(authUser => {
         if (authUser) {
            this.user(authUser.uid)
               .get()
               .then(snap => {
                  const dbUser = snap.data();

                  if (!dbUser.roles) {
                     dbUser.roles = {};
                  }

                  authUser = {
                     uid: authUser.uid,
                     email: authUser.email,
                     emailVerified: authUser.emailVerified,
                     providerData: authUser.providerData,
                     ...dbUser
                  };

                  next(authUser);
               });
         } else {
            fallback();
         }
      });

   //***User ApI ***
   user = uid => this.db.doc(`users/${uid}`);
   users = () => this.db.collection('users');

   message = uid => this.db.doc(`messages/${uid}`);
   messages = () => this.db.collection('messages');

   //***Archived Articles***
   articleRef = email =>
      this.db
         .collection('archived-articles')
         .doc(email)
         .collection('archived-articles');
}

export default Firebase;
