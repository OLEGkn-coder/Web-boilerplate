import React from "react";
import "./mainPage.scss";
import {rightRandomUser ,rightAdditionalUser ,all, validate, filterUser, sortData, searchData, percentAll} from "../scripts/utils";
import { randomUserMock } from "../data/Lab2-mock";
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

  const ages = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
  const country = ["UK", "Ukraine", "India", "Denmark", "Belgium", "Poland", "Iceland", "China"];

  const [ teachersList, setTeachersList ] = React.useState(teachers)
  const [ selectedTeacher, setSelectedTeacher ] = React.useState(null);

  const [ addPopUpOpen, setAddPopUpOpen ] = useState(false);

  const [ searchTeach, setSearchTeach ] = React.useState(teachers);
  const [ selectedTeach, setSelectedTeach ] = React.useState("");
  const [ teachersLi, setTeachersLi ] = React.useState(teachers);

  const [ onlyFavorites, setOnlyFavorites ] = React.useState(false);
  const [ withPhoto, setWithPhoto ] = React.useState(false);

  const[ sortTable, setSortTable ] = React.useState(statistics);
  const[ sortConfig, setSortConfig ] = React.useState({key: null, diraction: "asc"});

  const [ sortByCountry, setSortByCountry ] = React.useState("");
  const [ selectedAge, setSelectedAge ] = React.useState("");
  const [ selectedGender, setSelectedGender ] = React.useState("");

  const favoriteTeachers = teachers.filter((t) => t.favorite);

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
        <div className="img">
          {t.photo === ""? (
            <button className = "initials">{t.initials}</button>
          ):(
            <img src = {t.photo} className = "photo-teach"></img>
          )} 
          </div>
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
      <div className = "img">
        {t.photo === "" ?(
          <button className = "initials">{t.initials}</button>
        ):(
          <img className = "photo-teach" src = {t.photo}></img>
        )}
      </div>
    </div>
  ));

  const renderTableRows = () =>
    sortTable.map((s, idx) => (
      <tr key={idx} >
        <td>{s.name}</td>
        <td>{s.speciality}</td>
        <td>{s.age}</td>
        <td>{s.gender}</td>
        <td>{s.nationality}</td>
      </tr>
  ));
   

const search = () => {
  setSearchTeach(searchData(teachersLi, selectedTeach.toLowerCase()));
  }     
const sortWithPhoto = (list) => {
  return list.filter((t) => t.photo !== "");
}
const sortWithFavoritr = (list) => {
  return list.filter((t) => t.favorite);
}

const sorting = (key) => {
  let diraction = "asc";
  if(sortConfig.key === key && sortConfig.diraction === "asc"){
    diraction = "desc";
  }
  const sorted = [...sortTable].sort((a, b) => {
    if(a[key] < b[key]){
      return diraction === "asc" ? -1 : 1;
    }
    if(a[key] >  b[key]){
      return diraction === "asc" ? 1: -1;
    }
    return 0;
  })
setSortTable(sorted);
setSortConfig({key, diraction});
}

return (
     <>
  <div className="main-container-one">
    <header className="header-main">
      <div className="top">
        <div className="left-one">
          <p className="name-site">Teachinder</p>
        </div>
        <div className="right-one">
          <input className="button-one" type = "text" value = {selectedTeach} onChange={(e) => setSelectedTeach(e.target.value)} placeholder = "Name, note or age to search"></input>
          <button className="button-two" onClick={search}>Search</button>
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
          <select onChange={(e) => {
            const value = Number(e.target.value);
            setSelectedAge(value);
            setSearchTeach(teachersLi.filter((t) => t.age === value));
          }}>
            {ages.map(age => (
              <option key = {age} value = {age}>{age}</option>
            ))}
            </select>
      </div>
      <div className = "region">
        <p>Region</p>
          <select onChange = {(e) => { 
            const value = e.target.value;
            setSortByCountry(value);
            setSearchTeach(teachersLi.filter((t) => t.country === value));
          }}>
          {country.map(country => (
            <option key = {country} value={country}>{country}</option>
          ))}
          </select>
      </div>
      <div className = "sex">
        <p>Sex</p>
          <select 
          onChange={(e) => {
            const value = e.target.value;
            setSelectedGender(value);
            setSearchTeach(teachersLi.filter((t) => t.gender === value));
          }}>
            <option>Male</option>
            <option>Female</option>
            </select>
      </div>
      <div className = "with-photo">
        <input 
        type = "checkbox"
        checked = {withPhoto}
        onChange={(e) => {
        setWithPhoto(e.target.checked)
        if(e.target.checked){
        setSearchTeach(sortWithPhoto(teachersLi))
        } else {
        setSearchTeach(teachersLi)
        }
        }}></input>
          <p className = "with">Only with photo</p>
      </div>
      <div className = "only-favorites">
      <input 
      type = "checkbox"
      checked = {onlyFavorites}
      onChange={(e) =>  {
      setOnlyFavorites(e.target.checked)
      if(e.target.checked){
        setSearchTeach(sortWithFavoritr(teachersLi));
      } else {
        setSearchTeach(teachersLi);
      }
      }
      } ></input>
      <p className = "only">Only favorites</p>
      </div>
    </div>
    <div className="info-grid">
      {renderTeacherGrid(searchTeach)}
    </div>
    <div className="line"><p>Statistics</p></div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name {sortConfig.key === "name"} <button className = "sort" onClick={() => sorting("name")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
              <th>Speciality{sortConfig.key === "speciality"} <button className = "sort" onClick={() => sorting("speciality")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
              <th>Age {sortConfig.key === "age"} <button className = "sort" onClick={() => sorting("age")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
              <th>Gender {sortConfig.key === "gender"} <button className = "sort" onClick={() => sorting("gender")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
              <th>Nationality {sortConfig === "nationality"} <button className = "sort" onClick={() => sorting("nationality")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
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
