import React, { useState, useEffect } from "react";
import "./mainPage.scss";
import { searchData, randomCourse, validate } from "../scripts/utils";
import PopUp2 from "../components/ShowTeach";
import PopUp from "../components/AddTeach";

function MainPage() {
  const ages = ["All" ,18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
  const country = ["None" ,"UK", "Ukraine", "India", "Denmark", "Belgium", "Poland", "Iceland", "China"];

  const [ users, setUsers ] = useState([]);  //Нові вчителі з api запиту
  const [ displayedUsers, setDisplayedUsers ] = useState([]);  //Ті що зараз відображаються
  const [ loading, setLoading ] = useState(true); //Чи завантажені
  const [ page, setPage ] = useState(1); //Сторінка 
  const [ tableUsers, setTableUsers ] = useState(1); //Вчителі з таблиці статистики
  const rowsTable = 10; // Кількість вчителів в табличці та замовченням

  const [ teachersList, setTeachersList ] = React.useState([]); //Всі вчителі
  const [ selectedTeacher, setSelectedTeacher ] = React.useState(null); //Вибраний вчитель для пошуку

  const [ addPopUpOpen, setAddPopUpOpen ] = useState(false); //Відкриття popup

  const [ searchTeach, setSearchTeach ] = React.useState([]); //Пошуй вчителя(key, value)
  const [ selectedTeach, setSelectedTeach ] = React.useState(""); //Вибраний вчитель
  const [ teachersLi, setTeachersLi ] = React.useState([]); //Всі вчителі

  const [ onlyFavorites, setOnlyFavorites ] = React.useState(false); //Відображати лишн favorite
  const [ withPhoto, setWithPhoto ] = React.useState(false); //Відображати лише з фото

  const[ sortTable, setSortTable ] = React.useState([]); // Сорутвання таблички
  const[ sortConfig, setSortConfig ] = React.useState({key: null, diraction: "asc"}); // Яку колонку ми сортуємо

  const [ sortByCountry, setSortByCountry ] = React.useState(""); //Сортування за країною
  const [ selectedAge, setSelectedAge ] = React.useState(""); //Сортувати зо віком
  const [ selectedGender, setSelectedGender ] = React.useState(""); //Сортувати за гендером

  
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
    .then((res) => res.json())
    .then((data) => {
      const normalizedData = data.results.map((u, i) =>({
        id: u.login?.uuid || i,
        name: u.name.first,
        surname: u.name.last,
        age: u.dob.age,
        gender: u.gender,
        country: u.location.country,
        discipline: randomCourse(),
        note: "",
        photo: u.picture.medium,
        favorite: false,
        email: u.email,

      }));
      setUsers(normalizedData);
      setDisplayedUsers(normalizedData);
      setLoading(false);
      setTeachersLi(normalizedData);
      setTeachersList(normalizedData);
      setSearchTeach(normalizedData);
      setSortTable(normalizedData);
    });
  }, []);

  const loadMoreUsers = () => {
    const nextPage = page + 1;
    fetch(`https://randomuser.me/api/?results=10&page=${nextPage}`)
    .then((res) => res.json())
    .then((data) => {
       const newUsers = data.results.map((u, i) =>({
        id: u.login?.uuid || i,
        name: u.name.first,
        surname: u.name.last,
        age: u.dob.age,
        gender: u.gender,
        country: u.location.country,
        discipline: randomCourse(),
        note: "",
        photo: u.picture.medium,
        favorite: false,
        email: u.email,

      }));
      setUsers((prev) => [...prev, ...newUsers]);
      setSearchTeach((prev) => [...prev, ...newUsers]);
      setPage(nextPage);
    })
  }

  const submit = async ( user ) => {
    if(!validate(user)) return alert("Error");

    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    alert("Teacher added succsessfully");
  }
  const favoriteTeachers = users.filter((t) => t.favorite);

  const toggleFavorite = (index) => {
    const newTeachers = [...teachersList];
    newTeachers[index].favorite = !newTeachers[index].favorite
    setTeachersList(newTeachers);
  }

  const handleAddTeacher = async (newTeachers) => {
   await submit(newTeachers);
   setTeachersList((prev) => [...prev, { ...newTeachers, favorite: false}])
   setTeachersLi((prev) => [...prev, { ...newTeachers, favorite: false}])
   setSearchTeach((prev) => [...prev, { ...newTeachers, favorite: false}])
   setSortTable((prev) => [...prev, { ...newTeachers, favorite: false}])
  };

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

  const startUser = (tableUsers - 1) * rowsTable;
  const endUsers = startUser + rowsTable;


  const sorted = [...sortTable.slice(startUser, endUsers)].sort((a, b) => {
    if(a[key] < b[key]){
      return diraction === "asc" ? -1 : 1;
    }
    if(a[key] >  b[key]){
      return diraction === "asc" ? 1: -1;
    }
    return 0;
  })

  const updateSort = [
    ...sortTable.slice(0, startUser),
    ...sorted,
    ...sortTable.slice(endUsers)
  ]
setSortTable(updateSort);
setSortConfig({key, diraction});
}

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

  const renderTableRows = () => {
    const startUser = (tableUsers - 1) * rowsTable;
    const endUsers = startUser + rowsTable;
    return sortTable.slice(startUser, endUsers).map((s, idx) => (
      <tr key={idx} >
        <td>{s.name}</td>
        <td>{s.discipline}</td>
        <td>{s.age}</td>
        <td>{s.gender}</td>
        <td>{s.country}</td>
      </tr>
  ));
};

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
            if(e.target.value === "All"){
              setSearchTeach(teachersLi);
            } else {
            setSearchTeach(teachersLi.filter((t) => t.age === value));
          }}}>
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
            if(value === "None"){
              setSearchTeach(teachersLi);
            } else {
            setSearchTeach(teachersLi.filter((t) => t.country === value));
          }}}>
          {country.map(country => (
            <option key = {country} value={country}>{country}</option>
          ))}
          </select>
      </div>
      <div className = "sex">
        <p>Sex</p>
          <select 
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setSelectedGender(value);
            if(value === "none"){
              setSearchTeach(teachersLi);
            } else {
            setSearchTeach(teachersLi.filter((t) => t.gender === value));
            }
          }}>
            <option>None</option>
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
    <div className="gridUsers">
      <div className = "info-grid">{renderTeacherGrid(searchTeach)}</div>
      <button className = "nextUsers" onClick={loadMoreUsers}>Next</button>
    </div>
    <div className="line"><p>Statistics</p></div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name {sortConfig.key === "name"} <button className = "sort" onClick={() => sorting("name")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
              <th>Discipline {sortConfig.key === "discipline"} <button className = "sort" onClick={() => sorting("discipline")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
              <th>Age {sortConfig.key === "age"} <button className = "sort" onClick={() => sorting("age")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
              <th>Gender {sortConfig.key === "gender"} <button className = "sort" onClick={() => sorting("gender")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
              <th>Country {sortConfig === "country"} <button className = "sort" onClick={() => sorting("country")}>{sortConfig.diraction === "asc" ? "↑" : "↓"}</button> </th>
            </tr>
          </thead>
         <tbody>{renderTableRows()}</tbody>
        </table>
        <div className="two">
          {Array.from({ length: page}, (_, i) => (
            <button
              key={i}
              onClick={() => setTableUsers(i + 1)}
              className = {tableUsers === i + 1 ? "active" : ""}
            >
             {i + 1}
            </button>
          ))}
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
    <PopUp onClose={() => setAddPopUpOpen(false)} AddTeacher={handleAddTeacher} />}
   </>
  );
}

export default MainPage;
