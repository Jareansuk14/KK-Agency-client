import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/NotfoundPage.scss"
import { Helmet } from 'react-helmet';

const NotfoundPage = () => {

  return (
    <div className='notfoundPage'>
      <Helmet>
        <title>ไม่พบประกาศนี้แล้ว !!!</title>
      </Helmet>
      <div className='notfoundPage-container'>
        <div>
          <h1>ไม่พบประกาศนี้แล้ว !!!</h1>
          <Link className='gotohome' to={"/"}>ดูประกาศอื่นที่พร้อมให้เช่า</Link>
        </div>
      </div>
    </div>
  )


}

export default NotfoundPage