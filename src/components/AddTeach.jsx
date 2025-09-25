import './addTeach.scss'
import { useState } from 'react'
function PopUp({onClose, AddTeacher}){
  const[formData, setFormData] = useState({
    name: "",
    surname: "",
    discipline: "",
    country: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    note: "",
    city: "",
    date: "",
    color: ""

  })
  const change = (e) => {
    setFormData(
     {...formData, [e.target.name]: e.target.value}
    )
  }

  const submit = () => {
   AddTeacher(formData);
   setFormData({
    name: "",
    surname: "",
    discipline: "",
    country: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    note: "",
    city: "",
    date: "",
    color: ""
   });
   onClose();
   alert("Teacher added succsessfully");
  }
return(
  <div className = "popup-overlay" onClick={onClose}>
 <div className = "Main-Container" onClick={(e) => e.stopPropagation()}>
  <header className = "header">
   <p className = "add-teacher">Add Teacher</p>
   <button className = "close-button" onClick={onClose}>&#10006;</button>
  </header>
  <div className = "content">
   <div className = "top">
     <p className = "text-name">
      Name
     </p>
      <input className = "name-field" type = "text" placeholder='Enter name' name = "name"value={formData.name} onChange={change}></input>
       <label for = "speciality" className="speciality-text" >Speciality</label>
        <select id = "speciality" className="speciality" name = "discipline" value={formData.discipline} onChange={change}>
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
        <select id = "select-country" className = "select-country" name = "country" value={formData.country} onChange={change}>
         <option value = "">-- Choose --</option>
         <option value = "Ukraine">Ukraine</option>
        </select>
        <p className = "text">
         Email
        </p>
        <input className = "middle-input" type = "text" maxLength={50} name = "email" value={formData.email} onChange={change}></input>
        <p className = "text">
         Date of birth
        </p>
        <input className ="date-input" type = "date" value={formData.date} name = "date" onChange={change}></input>
        <div className = "genders">
         <p className = "text-sex">
          Sex
         </p>
         <label>
          Male
          <input type = "radio" className = "gender" value = "male" name = "gender" checked = {formData.gender === "male"} onChange={change}></input>
         </label>
         <label>
          Female
          <input type = "radio" className = "gender" value = "female" name = "gender" checked = {formData.gender === "female"} onChange={change}></input>
         </label>
         <div className = "change-color">
           <p className = "text-back">
            Background color
           </p>
           <input className = "color-input" type = "color" name = "color" value={formData.color} onChange={change}></input>
         </div>
        </div>
     </div>
     <div className = "left">
      <p className = "text">
       City
      </p>
      <input className = "middle-input" type = "text" maxLength={20} name = "city" value = {formData.city} onChange={change}></input>
      <p className = "text">
       Phone
      </p>
      <input className = "middle-input" type = "text" maxLength={30} name = "phone" value={formData.phone} onChange={change}></input>
     </div>
    </div>
    <div className = "bottom">
     <p className = "text-notes">
      Notes (optional)
     </p>
     <input className = "comments" type = "text" name = "note" value={formData.note} onChange={change}></input>
    </div>
    <footer className = "add-button">
     <button className = "add" onClick={submit} >Add</button>
    </footer>
  </div>
</div>
</div>
)
}
export default PopUp;