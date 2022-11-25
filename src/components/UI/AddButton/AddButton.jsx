import React from "react";
import './AddButton.css';
/**
 * Функция открытия модального окна
 * @param {boolean} props данные из const [modal, setModal]
 * @returns 
 */
function AddButton(props){
    return(
        <div className='addButton' onClick = {props.openModal}>
          <p>+</p>
          <p>добавить задачу</p>
        </div>
    )
}

export default AddButton;