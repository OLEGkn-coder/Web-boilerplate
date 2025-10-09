import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './showTeach.scss'
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import dayjs from 'dayjs';

function PopUp({t, onClose}){
const [showMap, setShowMap] =  useState(false);
const mapRef = useRef(null);
const [isFavorite, setIsFavorite] = useState(false);

useEffect(() => {
  if (!showMap || !mapRef.current || !t?.location?.coordinates) return;
  const lat = parseFloat(t.location.coordinates.latitude);
  const lng = parseFloat(t.location.coordinates.longitude);
  if (isNaN(lat) || isNaN(lng)) return;

  console.log("User loc:", lat, lng);

  const map = L.map(mapRef.current).setView([lat, lng], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`${t.name} ${t.surname}`)
    .openPopup();

  return () => map.remove();
}, [showMap, t]);

useEffect(() => { 
if (t) setIsFavorite(t.favorite || false);
}, [t]);

if(!t) return null;

const birthday = dayjs(t.dob?.date);
let nextBirthday = birthday.year(dayjs().year());
if (nextBirthday.isBefore(dayjs(), "day")) {
  nextBirthday = nextBirthday.add(1, "year");
}
const daysleft = nextBirthday.diff(dayjs(), "day");

const toogleFavorite = () => {
  if(!t) return;
  t.favorite = !isFavorite;
  setIsFavorite(!isFavorite);
}

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
     <div className = "img">
        {t.photo === ""? (
             <div className = "initials" >{t.initials}</div>
             ) : (
             <img className = "photo-teach" src = {t.photo}></img>
        )}
    </div>
    </div>
    <div className = "middle">
     <p className = "name">{t.name} {t.surname}</p>
     <p className = "discipline">{t.discipline}</p>
     <p className = "country">{t.country}</p>
     <p className = "info">{t.age} {t.gender}</p>
     <p className = "email">{t.email}</p>
     <p className = "number">{t.phone}</p>
     <p className = "number">Days until next birthday: {daysleft}</p>
    </div>

    <div className = "bottom-2">
     <button className = {`button-star ${t.favorite ? "favorite" : ""}`} onClick={toogleFavorite}>
        &#x2605;
     </button>
    </div>
   </div>
   <div className = "info-div">
    <p className = "info_about">
     <span className = "span">About</span>
     {t.note || "No info"}
    </p>
    <a href = "#" className = "link" onClick = {(e) =>  {e.preventDefault(); setShowMap((prev) => !prev)}}>{showMap ? "Hide map" : "Show map"}</a>
    { showMap && (
        <div
        id = "teach-map"
        ref = {mapRef}
        style = {{
            height: "300px",
            width: "100%",
            marginTop: "10px",
            marginLeft: "20px",
            borderRadius: "10px"
        }}
        ></div>
    )}
   </div>
  </div>
</div>
      
 )
}
export default PopUp;