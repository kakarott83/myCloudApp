import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import { Travel } from "./travel";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})

export class FireStoreService {
  userData: any; // Save logged in user data
  private travelCollection: AngularFirestoreCollection<Travel>;
  private filteredTravelByUser: AngularFirestoreCollection<Travel>;
  private userFilteredCollection: AngularFirestoreCollection<User>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email,password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(user: User) {
    console.log(user)
    
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.pw)
      .then((result) => {
        // Call the SendVerificaitonMail() function when new user sign 
        // up and returns promise
        this.SendVerificationMail(user);
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
    
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail(user: User) {
    //todo
    var actionCodeSettings = {
      url: 'http://localhost:4200/dashboard',
      handleCodeInApp: true
    }
    return this.afAuth.sendSignInLinkToEmail(user.email, actionCodeSettings)
    .then(() => {
      this.router.navigate(['verify-email-address']);
    }).catch((error) => {
      console.log(error)
      this.router.navigate(['verify-email-address']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }

  GetAllTravels() {
    this.travelCollection = this.afs.collection<Travel>('travels');
    return this.travelCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Travel;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
  }

  GetAllUsers() {
    this.userCollection = this.afs.collection<User>('users');
    return this.userCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data};
      }))
    );
  }

  GetFilteredUser(filter: string) {
    this.userFilteredCollection = this.afs.collection('users', ref => ref.where('email','==', filter));
    return this.userFilteredCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data}
      }))
    )
  }

  addTravel(travel: Travel) {
    this.afs.collection('travels').add(travel);
  }

  GetFilteredTravelByUser(userId: string) {
    this.filteredTravelByUser = this.afs.collection('travels', ref => ref.where('user','==',userId));
    return this.filteredTravelByUser.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Travel;
        const id = a.payload.doc.id
        return {id, ...data}
      }))
    )
  }



}