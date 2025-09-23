import React from 'react'
import { useState } from 'react'
import './showTeach.scss'
import { teachers } from '../data/teachers';
function PopUp({t, onClose}){
const [teacherList, setTeachersList] = React.useState(teachers);

const toogleFavorite = (index) => {
    const newTeachers = [...teacherList];
    newTeachers[index].favorite = !newTeachers[index].favorite
    setTeachersList(newTeachers);
}
if(!t) return null;
return(
    <div className = "popup-overlay" onClick={onClose}>
    <div className = "Main-container" onClick={(e) => e.stopPropagation()}>
   <header className = "header-popup">
    <p className = "teacher-info">
     Teacher Info
    </p>
       <button className = "close-button" onClick={onClose}>&#10006;</button>
   </header>
   <div className = "content">
    <div className = "top-2">
     <button className = "img">{t.initials}</button>
    </div>
    <div className = "middle">
     <p className = "name">{t.name} {t.surname}</p>
     <p className = "discipline">{t.discipline}</p>
     <p className = "country">{t.country}</p>
     <p className = "info">{t.age} {t.gender}</p>
     <p className = "email">{t.email}</p>
     <p className = "number">{t.phone}</p>
    </div>

    <div className = "bottom-2">
     <button className = {`button-star ${t.favorite ? "favorite" : ""}`} onClick={ () => toogleFavorite(teachers.indexOf(t))}>
        &#x2605;
     </button>
    </div>
   </div>
   <div className = "info-div">
    <p className = "info_about">
     Lorem ipsum dolor sit amet, 
     consectetur adipisicing elit. 
     Ab autem consectetur culpa 
     cumque, distinctio dolor dolore 
     dolorem doloremque ea explicabo 
     facilis nam nesciunt nisi pariatur 
     perspiciatis porro quis similique 
     temporibus veniam veritatis? A ab ad, 
     aliquam amet consequatur cupiditate 
     debitis deserunt doloribus dolorum earum 
     eius eos minus nostrum odit omnis 
     perferendis...
    </p>
    <a href = "#" className = "link">toggle map</a>
   </div>
  </div>
</div>
      
 )
}
export default PopUp;