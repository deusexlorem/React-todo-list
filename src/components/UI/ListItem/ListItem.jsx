import React, { useState } from "react";
import './ListItem.css';


function ListItem(props){
    /**
     * Массив изменяющий background компонета ListItem
     */
    const [background,setBackground] = useState('white');
    
    /**
     * Подключение библиотеки dayjs
     */
    const dayjs = require('dayjs');
    /**
     * Вычисление оставшегося времени до установленного пользователем срока выполнения задачи
     */
    let daysLeft = dayjs(props.post.date).diff(dayjs(Date.now()).format('YYYY-MM-DD'), 'day');
    
    if(daysLeft===0){
        daysLeft = 'Сегодня'
    } else if(daysLeft<0){
        daysLeft = 'Срок истек'
    }
    
    return(
        <div className="field" style = {{background}}>
            <p>{props.number}</p>
            <div className="table">
            <table>
                <thead>
                <tr>
                    <th>Cтастус</th>
                    <th>{props.post.name}</th>
                    <th>Срок выполнения</th>
                    <th>Дней до окончания</th>
                    <th>Прикрепленные файлы</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <select onClick = {(e) => setBackground(e.target.value)} size = "1" name="statusSelect" id="">
                            <option  value={"white"}>Выполняется</option>
                            <option  value={"SpringGreen"}>Выполнено</option>
                            <option  value={"LightSalmon"}>Не выполнено</option>
                        </select>
                    </td>
                    <td>{props.post.description}</td>
                    <td>{dayjs(props.post.date).format('DD.MM.YYYY')}</td>
                    <td>{daysLeft}</td>
                    <td><a href={props.post.url}>{props.post.file}</a></td>
                </tr>
                </tbody>
            </table>
            </div>
            <div className="listButton">
                <button  onClick = {() => props.delete(props.post) } >×</button>
            </div>
        </div>
    )
}
export default ListItem;
