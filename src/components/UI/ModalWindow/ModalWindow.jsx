import React, { useState } from "react";
import './ModalWindow.css';

const ModalWindow = (props) => {
    
/** 
 * Массив данных, введенных пользователем, по умолчаиню пуст
*/
    const [post, setPost] = useState({name:'', description:'', date:'', file: ''})
    
/** 
 * Функция принимает данные пользователя из инпутов и формирует объект newPost, присваивает id, status - цвет заднего фона и 
 * url загруженного пользователем файла(по умолчанию пуст, затем передает newPost файлу App.js для загрузки данных в 
 * базу данных )
*/
    const addNewPost = (e) =>{
        
        const newPost = {...post, id: Date.now(), status: 'white', url: ''};

        props.create(newPost);
        
        setPost({ name:'', description:'', date:'', file: ''});

        
    }

    return (
        <div className={`modalWindow ${props.isOpened ? 'open' : 'close'}`}>
            <div className='modalWinowContent'>
                <div className='inputs'>
                    <label htmlFor="taskName">Задача</label>
                    <input 
                        value = {post.name} 
                        onChange = {e => setPost({...post, name: e.target.value})} 
                        type="text" 
                        name = "taskName"
                    />
                    <label htmlFor="taskDescription">Описание задачи</label>
                    <textarea  
                        value = {post.description} 
                        onChange = {e => setPost({...post, description: e.target.value})}
                        cols="40" 
                        rows="5" 
                        name = "taskDescription"
                    />
                    <label htmlFor="taskDate">Выполнить в срок до</label>
                    
                    
                    <input 
                        value = {post.date} 
                        onChange = {e => setPost({...post, date: e.target.value})} 
                        type="date"  
                        name="taskDate"
                    />
                    
                    <input
                        id="upload"
                        type="file" 
                        name="taskFile"
                        onChange = {e => setPost({...post, file: e.target.files[0]})}
                    />
                </div>
                <div className="buttons">
                    <button onClick = {addNewPost}>Сохранить</button>
                    <button onClick = {props.onModalClose}>Отмена</button>
                </div>
            </div>
        </div>
    )
}
export default ModalWindow;