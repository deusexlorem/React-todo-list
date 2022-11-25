import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database'
import { getStorage , ref} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDJv8OxMrhofNoQavUijaZrEnf4xX-LOZ0",
    authDomain: "test-task-react-omg.firebaseapp.com",
    databaseURL: "https://test-task-react-omg-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-task-react-omg",
    storageBucket: "test-task-react-omg.appspot.com",
    messagingSenderId: "280746055782",
    appId: "1:280746055782:web:a3fbfd42ce77cd93b8b5a7"
  };
  
  const app = initializeApp(firebaseConfig);

  export const db = getDatabase(app);

  export const storage = getStorage(app)

  export const storageRef = ref;

// const firebaseConfig = {
//   apiKey: "AIzaSyDJv8OxMrhofNoQavUijaZrEnf4xX-LOZ0",
//   authDomain: "test-task-react-omg.firebaseapp.com",
//   databaseURL: "https://test-task-react-omg-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "test-task-react-omg",
//   storageBucket: "test-task-react-omg.appspot.com",
//   messagingSenderId: "280746055782",
//   appId: "1:280746055782:web:a3fbfd42ce77cd93b8b5a7"
// };

// initializeApp(firebaseConfig);

// export const db = getFirestore()

// export const collectionRef = collection(db, 'posts')

// getDocs(collectionRef)
// .then((snapshot) => {
//   let posts = []
//   snapshot.docs.forEach((post) => {
//     posts.push({...post.data(), id: post.id})
//   })
// })

  