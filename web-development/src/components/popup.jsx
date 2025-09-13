import './popup.scss'
import { useState } from 'react'

function PopUp(){
return(
 <div className = "Main-Container">
  <header className = "header">
   <p className = "add-teacher">Add Teacher</p>
   <button className = "close-button">&#10006;</button>
  </header>
  <div className = "content">
   <div className = "top">
     <p className = "text-name">
      Name
     </p>
      <input className = "name-field" type = "text" placeholder='Enter name'></input>
       <label for = "speciality" className="speciality-text">Speciality</label>
        <select id = "speciality" className="speciality">
         <option value = "">-- Choose --</option>
         <option value = "math">Mathematics</option>
         <option value = "physics">Physics</option>
         <option value = "informatics">Informatics</option>
         <option value = "english">English</option>
        </select>
    </div>
    <div className = "middle">
     <div className = "right">
       <p className = "text">
        Country
       </p>
        <select id = "select-country" className = "select-country">
         <option value = "">-- Choose --</option>
         <option value = "Ukraine">Ukraine</option>
        </select>
        <p className = "text">
         Email
        </p>
        <input className = "middle-input" type = "text" maxLength={50}></input>
        <p className = "text">
         Date of birth
        </p>
        <input className ="date-input" type = "date"></input>
        <div className = "genders">
         <p className = "text-sex">
          Sex
         </p>
         <label>
          Male
          <input type = "radio" className = "gender" value = "male"></input>
         </label>
         <label>
          Female
          <input type = "radio" className = "gender" value = "female"></input>
         </label>
         <div className = "change-color">
           <p className = "text-back">
            Background color
           </p>
           <input className = "color-input" type = "color"></input>
         </div>
        </div>
     </div>
     <div className = "left">
      <p className = "text">
       City
      </p>
      <input className = "middle-input" type = "text" maxLength={20}></input>
      <p className = "text">
       Phone
      </p>
      <input className = "middle-input" type = "text" maxLength={30}></input>
     </div>
    </div>
    <div className = "bottom">
     <p className = "text-notes">
      Notes (optional)
     </p>
     <input className = "comments" type = "text"></input>
    </div>
    <footer className = "add-button">
     <button className = "add">Add</button>
    </footer>
  </div>
</div>
)
}
export default PopUp;