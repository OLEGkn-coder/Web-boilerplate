import './popup2.scss'
import { useState } from 'react'

function popUp(){
 return(
  <div className = "Main-container">
   <header className = "header-popup">
    <p className = "teacher-info">
     Teacher Info
    </p>
       <button className = "close-button">&#10006;</button>
   </header>
   <div className = "content">
    <div className = "top-2">
     <img className = "img"></img>
    </div>
    <div className = "middle">
     <p className = "name">Ihor Tkachuk</p>
     <p className = "discipline">Chemistry</p>
     <p className = "country">Kyiv, Ukraine</p>
     <p className = "info">35, Male</p>
     <p className = "email">ihor_tkachuk@domain.com</p>
     <p className = "number">+380964993252</p>
    </div>
    <div className = "bottom-2">
     <button className = "button-star">&#x2605;</button>
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
 )
}
export default popUp;