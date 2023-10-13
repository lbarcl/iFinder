import { initializeApp } from 'firebase/app';
import {
    Firestore,
    doc,
    getDoc,
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from 'firebase/firestore';
import {initializeAuth} from 'firebase/auth';

const config = {
    apiKey: "AIzaSyCBV1HI_MDNdumb_J-1wbN_JuZbNEQx6Mw",
    authDomain: "itu-finder.firebaseapp.com",
    projectId: "itu-finder",
    storageBucket: "itu-finder.appspot.com",
    messagingSenderId: "56013868169",
    appId: "1:56013868169:web:977047b1481d1902574a58"
};

export const app = initializeApp(config);
export let firestore: Firestore;
try {
    firestore = initializeFirestore(app, {
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });
} catch (error) {
    firestore = getFirestore();
}

export const auth = initializeAuth(app);

export async function getDocument(path: string) {
    return (await getDoc(doc(firestore, path))).data();
}