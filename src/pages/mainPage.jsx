import React, { useState, useEffect, useRef} from "react";
import "./mainPage.scss";
import { searchData, randomCourse, validate } from "../scripts/utils";
import PopUp2 from "../components/ShowTeach";
import PopUp from "../components/AddTeach";
import StatisticsChart from "../components/StatisticsChart";
import WebDataRocks from "@webdatarocks/webdatarocks";
import WebDataRocksReact from "@webdatarocks/react-webdatarocks";
import "@webdatarocks/webdatarocks/webdatarocks.css";
import _ from "lodash";

function MainPage() {
  const ages = ["All" ,18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];
  const country = ["None" ,"UK", "Ukraine", "India", "Denmark", "Belgium", "Poland", "Iceland", "China"];

  const [ users, setUsers ] = useState([]);  //Нові вчителі з api запиту
  const [ displayedUsers, setDisplayedUsers ] = useState([]);  //Ті що зараз відображаються
  const [ loading, setLoading ] = useState(true); //Чи завантажені
  const [ page, setPage ] = useState(1); //Сторінка 
  const [ tableUsers, setTableUsers ] = useState(1); //Вчителі з таблиці статистики
  const rowsTable = 10; // Кількість вчителів в табличці та замовченням
  const [showChart, setShowChart] = useState(false); //Діаграма
  const [ showReport, setShowReport ] = useState(false); //Звіт
  const pivotRef = useRef(null);

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
     const normalizedData = _.map(data.results, (u, i) => ({
      id: _.get(u, "login.uuid", i),
      name: _.get(u, "name.first", ""),
      surname: _.get(u, "name.last", ""),
      phone: _.get(u, "phone", ""),
      age: _.get(u, "dob.age", 0),
      gender: (_.get(u, "gender", "unknown")),
      country: _.get(u, "location.country", "Unknown"),
      discipline: randomCourse(),
      note: "",
      photo: _.get(u, "picture.medium", ""),
      favorite: false,
      dob: _.get(u, "dob", {}),
      email: _.get(u, "email", ""),
      location: {
   coordinates: {
      latitude: _.get(u, "location.coordinates.latitude", null),
      longitude: _.get(u, "location.coordinates.longitude", null),
    },
  },
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


  useEffect(() => {
    if(showReport && pivotRef.current) {
      const pivot = new WebDataRocks({
        container: pivotRef.current,
        toolbar: true,
        report: {
        dataSource: { data: teachersLi },
        slice: {
          rows: [{ uniqueName: "country" }],
          columns: [{ uniqueName: "discipline" }],
          measures: [{ uniqueName: "age", aggregation: "average" }],
        },
        options: {
          grid: { type: "flat" },
        },
      },
      });
      return () => pivotRef.current && (pivotRef.current.innerHTML = "");
  }}, [ showReport, teachersLi])

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

  const submitTeacher = async (user) => {
  try {
    if (!validate(user)) {
      alert("Validation error");
      return;
    }

    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log("Added teacher:", data);

    alert("Teacher added successfully ✅");
  } catch (err) {
    console.error("❌ Error while adding teacher:", err);
    alert("Error while adding teacher, check console");
  }
};
  const favoriteTeachers = users.filter((t) => t.favorite);

  const toggleFavorite = (index) => {
    const newTeachers = [...teachersList];
    newTeachers[index].favorite = !newTeachers[index].favorite
    setTeachersList(newTeachers);
  }

 const handleAddTeacher = async (newTeacher) => {
  await submitTeacher(newTeacher);

  setTeachersList((prev) => [...prev, { ...newTeacher, favorite: false }]);
  setTeachersLi((prev) => [...prev, { ...newTeacher, favorite: false }]);
  setSearchTeach((prev) => [...prev, { ...newTeacher, favorite: false }]);
  setSortTable((prev) => [...prev, { ...newTeacher, favorite: false }]);
};

const search = () => {
  setSearchTeach(searchData(teachersLi, selectedTeach.toLowerCase()));
  }     
const sortWithPhoto = (list) => _.filter(list, (t) => !_.isEmpty(t.photo));
const sortWithFavoritr = (list) => _.filter(list, "favorite");

const sorting = (key) => {
  let diraction = "asc";
  if(sortConfig.key === key && sortConfig.diraction === "asc"){
    diraction = "desc";
  }

  const startUser = (tableUsers - 1) * rowsTable;
  const endUsers = startUser + rowsTable;

const sorted = _.orderBy(sortTable, [key], [sortConfig.diraction]);
setSortTable(sorted);


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
  <div className="stat-buttons" style={{ textAlign: "center", marginBottom: "10px" }}>
    <button
      onClick={() => {setShowChart(false); setShowReport(false)}}
      style={{
      background: 
      !showChart && !showReport ? "#f68258" : "transparent",
      border: `2px solid #f68258`,
      color:  !showChart && !showReport ? "white" : "#f68258",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.25s ease",
      }}
    >
      Table
    </button>
    <button
      onClick={() => {setShowChart(true); setShowReport(false)}}
      style={{
      background: showChart ? "#f68258" : "transparent",
      border: `2px solid #f68258`,
      color:  showChart ? "white" : "#f68258",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.25s ease",
      marginLeft: "106px",
      }}
    >
      Diagram
    </button>
    <button
    onClick= {() => {setShowChart(false); setShowReport(true)}}
    style={{
      background: showReport ? "#f68258" : "transparent",
      border: `2px solid #f68258`,
      color:  showReport ? "white" : "#f68258",
      padding: "6px 12px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "0.25s ease",
      marginLeft: "106px",
    }}
    >
      Report
    </button>
  </div>

  {showReport ? (
<div className = "report-cont">
<div
    ref={pivotRef}
    className = "pivot-cont"
  ></div>
  </div>
  ) : !showChart? (
    <>
      <table>
        <thead>
  <tr>
    <th>
      Name
      <button
        className="sort"
        onClick={() => sorting("name")}
      >
        {sortConfig.key === "name"
          ? sortConfig.diraction === "asc"
            ? "↑"
            : "↓"
          : "↕"}
      </button>
    </th>

    <th>
      Discipline
      <button
        className="sort"
        onClick={() => sorting("discipline")}
      >
        {sortConfig.key === "discipline"
          ? sortConfig.diraction === "asc"
            ? "↑"
            : "↓"
          : "↕"}
      </button>
    </th>

    <th>
      Age
      <button
        className="sort"
        onClick={() => sorting("age")}
      >
        {sortConfig.key === "age"
          ? sortConfig.diraction === "asc"
            ? "↑"
            : "↓"
          : "↕"}
      </button>
    </th>

    <th>
      Gender
      <button
        className="sort"
        onClick={() => sorting("gender")}
      >
        {sortConfig.key === "gender"
          ? sortConfig.diraction === "asc"
            ? "↑"
            : "↓"
          : "↕"}
      </button>
    </th>

    <th>
      Country
      <button
        className="sort"
        onClick={() => sorting("country")}
      >
        {sortConfig.key === "country"
          ? sortConfig.diraction === "asc"
            ? "↑"
            : "↓"
          : "↕"}
      </button>
    </th>
  </tr>
</thead>

        <tbody>{renderTableRows()}</tbody>
      </table>
      <div className="two">
        {Array.from({ length: page }, (_, i) => (
          <button
            key={i}
            onClick={() => setTableUsers(i + 1)}
            className={tableUsers === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  ) : (
    <StatisticsChart data={teachersLi} />
  )}
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
