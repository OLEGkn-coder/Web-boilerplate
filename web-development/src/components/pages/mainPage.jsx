import react from 'react';
import './mainPage.scss';

function MainPage(){
 return(
  <div className = "main-container-one">
   <header className = "header-main">
    <div className = "top">
     <div className = "left-one">
    <p className = "name-site">
     Teachinder
    </p>
    </div>
    <div className = "right-one">
    <button className = "button-one">
     Name, note or age to search
    </button>
    <button className = "button-two">
     Search
    </button>
    </div>
    </div>
    <div className = "bottom">
     <div className = "left-two">
     <button className = "teachers">
      Teachers
     </button>
     <button className = "statistics">
      Statistics
     </button>
     <button className = "favorites">
      Favorites
     </button>
     <button className = "about">
      About
     </button>
     </div>
     <div className = "right-two">
      <button className = "add-teachers">
       Add teacher
      </button>
     </div>
    </div>
   </header>
   <div className = "top-teachers">
    <p>
     Top Teachers
    </p>
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
   <div className = "info-grid">
    <div className = "grid">
     <button className = "img">I.T</button>
     <p className = "name">Ihor</p>
     <p className = "surname">Tkachuk</p>
     <p className = "disciplin">Chemistry</p>
     <p className = "country">Ukraine</p>
    </div>
     <div className = "grid">
     <button className = "img">P.R</button>
     <p className = "name">Pragg</p>
     <p className = "surname">Rameshbau</p>
     <p className = "disciplin">Chess</p>
     <p className = "country">India</p>
    </div>
     <div className = "grid">
     <button className = "img">F.J</button>
     <p className = "name">Floor</p>
     <p className = "surname">Jansenk</p>
     <p className = "disciplin">Vocal</p>
     <p className = "country">Denmark</p>
    </div>
     <div className = "grid">
     <button className = "img">J.B</button>
     <p className = "name">John</p>
     <p className = "surname">Burke</p>
     <p className = "disciplin">Computer Science</p>
     <p className = "country">Belgium</p>
     <div className = "star">&#x2605;</div>
    </div>

     <div className = "grid">
     <button className = "img">A.T</button>
     <p className = "name">Ari</p>
     <p className = "surname">Tang</p>
     <p className = "disciplin">Biology</p>
     <p className = "country">China</p>
     <div className = "star">&#x2605;</div>
    </div>
     <div className = "grid">
     <button className = "img">R.A</button>
     <p className = "name">Rachel</p>
     <p className = "surname">Andrew</p>
     <p className = "disciplin">Medicine</p>
     <p className = "country">UK</p>
    </div>
     <div className = "grid">
     <button className = "img">A.M</button>
     <p className = "name">Anna</p>
     <p className = "surname">Muzychuk</p>
     <p className = "disciplin">Chess</p>
     <p className = "country">Iseland</p>
    </div>
     <div className = "grid">
     <button className = "img">R.L</button>
     <p className = "name">Radoslaw</p>
     <p className = "surname">Ljuboevic</p>
     <p className = "disciplin">Rhysics</p>
     <p className = "country">Poland</p>
    </div>
   </div>
   <div className = "line">
    <p>Statistics</p>
   </div>
   <div className = "table">
    <button className = "one-button">&#x2B9C;</button>
    <button className = "two-button">&#x2B9E;</button>
    <div className = "one">
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
     <tbody>
      <tr>
       <td>Daisy Alexander</td>
       <td>Chemistry</td>
       <td>28</td>
       <td>Female</td>
       <td>Vietnam</td>
      </tr>
      <tr>
       <td>Julia Bradley</td>
       <td>Math</td>
       <td>26</td>
       <td>Female</td>
       <td>USA</td>
      </tr>
      <tr>
       <td>Rita Hart</td>
       <td>Art</td>
       <td>41</td>
       <td>Female</td>
       <td>England</td>
      </tr>
      <tr>
       <td>Jonathan Jacobs</td>
       <td>Math</td>
       <td>32</td>
       <td>Male</td>
       <td>Austria</td>
      </tr>
       <tr>
       <td>Natheniel White</td>
       <td>Computer Science</td>
       <td>37</td>
       <td>Male</td>
       <td>Austria</td>
      </tr>
       <tr>
       <td>Frank Medina</td>
       <td>English</td>
       <td>43</td>
       <td>Male</td>
       <td>Italy</td>
      </tr>
       <tr>
       <td>Ella Curtis</td>
       <td>Chess</td>
       <td>34</td>
       <td>Female</td>
       <td>USA</td>
      </tr>
       <tr>
       <td>Claire Simmmons</td>
       <td>Art</td>
       <td>38</td>
       <td>Female</td>
       <td>Netherlands</td>
      </tr>
       <tr>
       <td>Benjamin Knight</td>
       <td>Biology</td>
       <td>44</td>
       <td>Male</td>
       <td>Scotland</td>
      </tr>
       <tr>
       <td>Norma Rose</td>
       <td>Statistics</td>
       <td>36</td>
       <td>Female</td>
       <td>France</td>
      </tr>
     </tbody>
    </table>
    </div>
    <div className = "two">
     <button className = "first">1</button>
     <button>2</button>
     <button>3</button>
     <button className = "dot">...</button>
     <button>Last</button>
    </div>
   </div>
   <div className = "line-two">
    <p>Favorites</p>
   </div>
   <div className = "favorite-grid">
    <div className = "grid">
     <button className = "img">I.T</button>
     <p className = "name">Ihor</p>
     <p className = "surname">Tkachuk</p>
     <p className = "disciplin">Chemistry</p>
     <p className = "country">Ukraine</p>
    </div>
     <div className = "grid">
     <button className = "img">P.R</button>
     <p className = "name">Pragg</p>
     <p className = "surname">Rameshbau</p>
     <p className = "disciplin">Chess</p>
     <p className = "country">India</p>
    </div>
     <div className = "grid">
     <button className = "img">F.J</button>
     <p className = "name">Floor</p>
     <p className = "surname">Jansenk</p>
     <p className = "disciplin">Vocal</p>
     <p className = "country">Denmark</p>
    </div>
     <div className = "grid">
     <button className = "img">J.B</button>
     <p className = "name">John</p>
     <p className = "surname">Burke</p>
     <p className = "disciplin">Computer Science</p>
     <p className = "country">Belgium</p>
    </div>
     <div className = "grid">
     <button className = "img">A.T</button>
     <p className = "name">Ari</p>
     <p className = "surname">Tang</p>
     <p className = "disciplin">Biology</p>
     <p className = "country">China</p>
    </div>
    
   </div>
   <div className = "line-three"></div>
   <div className = "info-text">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing 
     elit. A atque facere, hic impedit itaque molestiae 
     sit tempore? Ea in mollitia natus rerum voluptates. 
     Ea ex excepturi facere tempora. Aliquid asperiores 
     hic impedit lusto natus quaerat ratione sit? 
     Culpa iusto optio voluptas voluptate.
     Enim eveniet fugit iure maiores molestiae, 
     praesentium quia.
    </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing 
     elit. Aliquam eligendi illum in inventore ipsum 
     odio officiis omnis quisquam sed tempora?
    </p>
    <p>Lorem ipsum dolor sit amet, consectetur 
     adipisicing elit. A atque esse expedita id 
     iusto mollitia, odit sint ullam veritatis vero?
    </p>
   </div>
   <footer className = "footer">
    <div className = "left-two">
     <button className = "teachers">
      Teachers
     </button>
     <button className = "statistics">
      Statistics
     </button>
     <button className = "favorites">
      Favorites
     </button>
     <button className = "about">
      About
     </button>
     </div>
     <div className = "right-two">
      <button className = "add-teachers">
       Add teacher
      </button>
     </div>
    </footer>
  </div>
 )
}
export default MainPage;