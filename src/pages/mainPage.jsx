import React from "react";
import "./mainPage.scss";
import {rightRandomUser ,rightAdditionalUser ,all, validate, filterUser, sortData, searchData, percentAll} from "../scripts/utils";
import { randomUserMock } from "../scripts/Lab2-mock";
import { useState } from "react";
import PopUp2 from "../components/ShowTeach";
import PopUp from "../components/AddTeach";
import { teachers } from "../data/teachers";
import { statistics } from "../data/statistics";

function MainPage() {
  console.log("1", searchData(teachers, "name", "Ihor"))
  console.log("2 ",percentAll(statistics, (s) => s.gender === "Female") + "%");
  console.log("3" ,filterUser(statistics, {age: 32}));
  console.log("4", rightRandomUser);
  console.log("5" , rightAdditionalUser);
  console.log("6" , all);
  console.log("7" , validate( randomUserMock));


  const topTeachers = teachers;
  const favoriteTeachers = teachers.filter((t) => t.favorite);

  const [ teachersList, setTeachersList ] = React.useState(teachers)
  const [ selectedTeacher, setSelectedTeacher ] = React.useState(null);
  const [ addPopUpOpen, setAddPopUpOpen ] = useState(false);
  const toggleFavorite = (index) => {
    const newTeachers = [...teachersList];
    newTeachers[index].favorite = !newTeachers[index].favorite
    setTeachersList(newTeachers);
  }

  const handleAddTeacher = (newTeachers) => {
    const teacherWithId = {
      ...newTeachers,
      favorite: false,
    };
    setTeachersList([...teachersList, teacherWithId])
  };

  const renderTeacherGrid = (list) =>
    list.map((t, index) => (
      <div className="grid" key={index} onClick={() => setSelectedTeacher(t)}>
        <button className="img">{t.initials}</button>
        <p className="name">{t.name}</p>
        <p className="surname">{t.surname}</p>
        <p className="disciplin">{t.discipline}</p>
        <p className="country">{t.country}</p>
        <button className={`star ${t.favorite ? "favorite" : ""}`} onClick={(e) =>{e.stopPropagation(); toggleFavorite(index);}}>
          &#x2605;
        </button>
      </div>
    ));

    const renderFavoriteGrid = (list) =>
      list.map((t, index) => (
       <div className = "grid" key = {index}>
        <button className = "img">{t.initials}</button>
       </div>
      ));

  const renderTableRows = () =>
    statistics.map((s, idx) => (
      <tr key={idx}>
        <td>{s.name}</td>
        <td>{s.speciality}</td>
        <td>{s.age}</td>
        <td>{s.gender}</td>
        <td>{s.nationality}</td>
      </tr>
    ));

  return (
     <>
    <div className="main-container-one">
      <header className="header-main">
        <div className="top">
          <div className="left-one">
            <p className="name-site">Teachinder</p>
          </div>
          <div className="right-one">
            <button className="button-one">Name, note or age to search</button>
            <button className="button-two">Search</button>
          </div>
        </div>
        <div className="bottom">
          <div className="left-two">
            {["Teachers", "Statistics", "Favorites", "About"].map((btn, i) => (
              <button key={i}>{btn}</button>
            ))}
          </div>
          <div className="right-two">
            <button className="add-teachers" onClick={() => setAddPopUpOpen(true)}>
              Add teacher
              </button>
          </div>
        </div>
      </header>

      <div className="top-teachers">
        <p>Top Teachers</p>
        </div>
        <div className = "search">
    <div className = "age">
     <p>Age</p>
     <select>
      <option>18</option>
      <option>19</option>
     </select>
    </div>
    <div className = "region">
     <p>Region</p>
     <select>
      <option>Kyiv</option>
      <option>Lviv</option>
     </select>
    </div>
    <div className = "sex">
     <p>Sex</p>
     <select>
      <option>Male</option>
      <option>Female</option>
     </select>
    </div>
    <div className = "with-photo">
     <input type = "checkbox"></input>
     <p className = "with">Only with photo</p>
    </div>
    <div className = "only-favorites">
     <input type = "checkbox"></input>
     <p className = "only">Only favorites</p>
    </div>
   </div>
      <div className="info-grid">
        {renderTeacherGrid(topTeachers)}
        </div>

      <div className="line"><p>Statistics</p></div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Speciality</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
        <div className="two">
          <button className="first">1</button>
          <button>2</button>
          <button>3</button>
          <button className="dot">...</button>
          <button>Last</button>
        </div>
      </div>

      <div className="line-two">
        <p>Favorites</p>
      </div>
      <div className = "button">
        <button className="one-button">&#x2B9C;</button>
      <div className="favorite-grid">
        {renderFavoriteGrid(favoriteTeachers)}
      </div>
       <button className="two-button">&#x2B9E;</button>
      </div>

      <div className="line-three"></div>
      <div className="info-text">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque facere, hic impedit itaque molestiae sit tempore? Ea in mollitia natus rerum voluptates. Ea ex excepturi facere tempora. Aliquid asperiores hic impedit lusto natus quaerat ratione sit? Culpa iusto optio voluptas voluptate. Enim eveniet fugit iure maiores molestiae, praesentium quia.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eligendi illum in inventore ipsum odio officiis omnis quisquam sed tempora?</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque esse expedita id iusto mollitia, odit sint ullam veritatis vero?</p>
      </div>

      <footer className="footer">
        <div className="left-two">
          {["Teachers", "Statistics", "Favorites", "About"].map((btn, i) => (
            <button key={i}>{btn}</button>
          ))}
        </div>
        <div className="right-two">
          <button className="add-teachers" onClick={() => setAddPopUpOpen(true)}>Add teacher</button>
        </div>
      </footer>
    </div>
    <PopUp2 t={selectedTeacher} onClose={() => setSelectedTeacher(null)}/>
    {addPopUpOpen && 
    <PopUp onClose={() => setAddPopUpOpen(false)} AddTeacher={handleAddTeacher}/>}
   </>
  );
}

export default MainPage;
