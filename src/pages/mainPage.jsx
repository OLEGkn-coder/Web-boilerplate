import React from "react";
import "./mainPage.scss";
import {rightRandomUser ,rightAdditionalUser ,all, validate, filterUser, sortData, searchData, percentAll} from "../scripts/utils";
import { randomUserMock } from "../scripts/Lab2-mock";

const teachers = [
  { initials: "I.T", name: "Ihor", surname: "Tkachuk", discipline: "Chemistry", country: "Ukraine", favorite: false },
  { initials: "P.R", name: "Pragg", surname: "Rameshbau", discipline: "Chess", country: "India", favorite: true },
  { initials: "F.J", name: "Floor", surname: "Jansenk", discipline: "Vocal", country: "Denmark", favorite: true},
  { initials: "J.B", name: "John", surname: "Burke", discipline: "Computer Science", country: "Belgium", favorite: true },
  { initials: "A.T", name: "Ari", surname: "Tang", discipline: "Biology", country: "China", favorite: true },
  { initials: "R.A", name: "Rachel", surname: "Andrew", discipline: "Medicine", country: "UK", favorite: false },
  { initials: "A.M", name: "Anna", surname: "Muzychuk", discipline: "Chess", country: "Iceland", favorite: false },
  { initials: "R.L", name: "Radoslaw", surname: "Ljuboevic", discipline: "Physics", country: "Poland", favorite: true },
];

const statistics = [
  { name: "Daisy Alexander", speciality: "Chemistry", age: 28, gender: "Female", nationality: "Vietnam" },
  { name: "Julia Bradley", speciality: "Math", age: 26, gender: "Female", nationality: "USA" },
  { name: "Rita Hart", speciality: "Art", age: 41, gender: "Female", nationality: "England" },
  { name: "Jonathan Jacobs", speciality: "Math", age: 32, gender: "Male", nationality: "Austria" },
  { name: "Natheniel White", speciality: "Computer Science", age: 37, gender: "Male", nationality: "Austria" },
  { name: "Frank Medina", speciality: "English", age: 43, gender: "Male", nationality: "Italy" },
  { name: "Ella Curtis", speciality: "Chess", age: 34, gender: "Female", nationality: "USA" },
  { name: "Claire Simmmons", speciality: "Art", age: 38, gender: "Female", nationality: "Netherlands" },
  { name: "Benjamin Knight", speciality: "Biology", age: 44, gender: "Male", nationality: "Scotland" },
  { name: "Norma Rose", speciality: "Statistics", age: 36, gender: "Female", nationality: "France" },
];

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


  const renderTeacherGrid = (list) =>
    list.map((t, index) => (
      <div className="grid" key={index}>
        <button className="img">{t.initials}</button>
        <p className="name">{t.name}</p>
        <p className="surname">{t.surname}</p>
        <p className="disciplin">{t.discipline}</p>
        <p className="country">{t.country}</p>
        {t.favorite && <div className="star">&#x2605;</div>}
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
            <button className="add-teachers">Add teacher</button>
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
          <button className="add-teachers">Add teacher</button>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
