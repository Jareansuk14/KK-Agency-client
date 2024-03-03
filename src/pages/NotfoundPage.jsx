import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/NotfoundPage.scss"

const NotfoundPage = () => {
 
  return (
    <div className='notfoundPage'>
      <div className='notfoundPage-container'>
        <div>
        <h1>ไม่พบประกาศนี้แล้ว <br />
        เนื่องจาก อยู่ในสถานะปล่อยเช่าแล้ว !!!</h1>
        <Link className='gotohome' to={"/"}>ดูประกาศอื่นที่พร้อมให้เช่า</Link>
        </div>
      </div>
    </div>
  )
  
      
}

export default NotfoundPage