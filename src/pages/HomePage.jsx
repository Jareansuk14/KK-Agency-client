import Navbar from "../components/Navbar"
import Slide from "../components/Slide"
// import Categories from "../components/Categories"
import Listings from "../components/Listings"
import Footer from "../components/Footer"
import Categorylist from "../components/Categorylist"
import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>รวมประกาศที่พักให้เช่าในขอนแก่น | ใกล้ฉัน</title>
        <link rel="canonical" href="https://www.kraichan.com/" />
        <meta name="description" content="kraichan ใกล้ฉัน รวมประกาศ ขาย เช่า บ้าน คอนโด ทาวน์เฮ้าส์/ทาวน์โฮม หอพัก/โรงแรม อาคารพาณิชย์ สำนักงาน ที่ดิน เซ้งร้าน เซ้งกิจการ ขอนแก่น มีหลายโครงการ รายละเอียดครบ ค้นหาง่าย อัพเดททุกวัน" />
      </Helmet>
      
      <Navbar />
      <Slide />
      <Categorylist />
      <Listings />
      <Footer />
    </>
  )
}

export default HomePage