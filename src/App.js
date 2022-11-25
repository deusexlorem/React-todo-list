import React, {useState, useEffect} from "react";
import './styles/App.css';
import AddButton from './components/UI/AddButton/AddButton.jsx';
import ModalWindow from "./components/UI/ModalWindow/ModalWindow.jsx";
import ListItem from "./components/UI/ListItem/ListItem.jsx";
import { set, ref, onValue, remove} from "firebase/database";
import {db, storage, storageRef} from "./firebase";
import { uploadBytes, getDownloadURL,  listAll} from "firebase/storage";



function App() {
  /** Определение состояния модального окна (закрыто/открыто), по умолчанияю закрыто*/
  const [modal,setModal] = useState(false)

  /** массив с данными введенными пользователем в модальном окне*/
  const [posts, setPosts] = useState([ ]);

  /** Refrence к файлам, загруженным в хранилище базы данных*/
  const allFilesRef = storageRef(storage, 'files/');

  /** массив с данными файлов, загруженными пользователем*/
  const [urls, setUrls] = useState([ ])

  /**
   * Функция заносит объект с данными и файл в базу данных и закрывает модальное окно
  * 
  * @param {Object} newPost объект получаемый из модального окна
  * 
  */
  const createPost = (newPost) => {
    
    const uid = Date.now();

    set(ref(db, `${uid}`), {
      id: newPost.id, 
      name: newPost.name, 
      description: newPost.description, 
      date: newPost.date, 
      status: newPost.status,
      file: newPost.file.name,
      url: newPost.url,
    });

    if(newPost.file == null) return;

    const fileRef = storageRef(storage, `files/${newPost.id}`);
    const uploadFile = uploadBytes(fileRef, newPost.file);
    
    setModal(false)
  }

/**
 * Перебор массива с обьектами posts и массива с объектами urls для сравнения их по параметру id и получения url загруженного 
 * в базу данных файла и присвоения значения url объектам массива posts в соответствии с их id
 * 
 */
    posts.forEach(post =>{
      
      urls.map(url => {
        
        if(url.id == post.id){
          
           post.url = url.url
        } 
      })   
    })
   
/**
 * Получения данных из базы данных и формирование массива posts
 */
  useEffect(() => {

    onValue(ref(db), snapshot => {

      setPosts([ ])

      const data = snapshot.val();

        if (data !== null){

          Object.values(data).map(post =>{

            setPosts(posts => [...posts, post])
            
            
          })
        }
    })
  }, [])
 
/**
 * Функция удаления постов из базы данных
 * 
 * @param {Object} post объект массива posts
 */
  const deletePost  = (post) => {
    
    remove(ref(db, `${post.id}`))

  }
  
  /**
   * Получение  параметров id и url загруженных файлов и формирование массива urls
   */
  useEffect(()=>{

    listAll(allFilesRef).then((response) => {

      response.items.forEach((item)=>{

        getDownloadURL(item).then((url) =>{
          // console.log(item)
          setUrls(urls => [...urls,  {id: item.name, url: url}])
        
          
        })
      })
    })
  }, [])

  return (
    /**
     * Передача данных массива posts в дочерние элементы для формирования разметки страницы
     */
    <div className='taskList'>
      <div className='listName'>
          <h1>Список задач</h1>
      </div>
      <div className='listItem'>
        {posts.map((post, index) =>
          <ListItem 
            number = {index + 1} 
            post = {post} 
            key = {post.id}
            delete = {deletePost}
          /> 
        )}
        <AddButton 
          openModal = {() => setModal(true)}
        />
        <ModalWindow
          isOpened = {modal}
          onModalClose = {() => setModal(false)}
          create = {createPost}
        />
      </div>
  </div>
  )
}

export default App;
