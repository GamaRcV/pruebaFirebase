import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth ,signInWithEmailAndPassword,signOut,updateProfile} from 'firebase/auth'
import firebaseConfig from './config';

class Firebase {
    constructor() {
        initializeApp(firebaseConfig);
        this.auth = getAuth()
    }
    //registrar un usuario
    async registrar(nombre, email, password){
        
        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
        return await updateProfile(nuevoUsuario.user, {
            displayName: nombre
        })
    }
    //inicio de sesion del usuario
    async login(email,password){
        return  signInWithEmailAndPassword(this.auth,email,password)

    }

    //cierra sesion del usuario
    async cerrarSesion(){
        await signOut(this.auth)
    }
}

const firebase = new Firebase();
export default firebase;