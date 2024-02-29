import { Person } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import Hamburger from 'hamburger-react'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const toggleDropdown = () => {
    setOpen(!isOpen);
  };
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo_transparent2.png" alt="logo" />
      </a>

      <div className="type-menu">
        <Link to="/properties/type/บ้านเดี่ยว" className="type-menu-bar">บ้านเดี่ยว</Link>
        <Link to="/properties/type/คอนโด" className="type-menu-bar">คอนโด</Link>
        <Link to="/properties/type/ทาวน์เฮ้าส์" className="type-menu-bar">ทาวน์เฮ้าส์</Link>
        <Link to="/properties/type/หอพัก โรงแรม" className="type-menu-bar">หอพัก/โรงแรม</Link>
        <Link to="/properties/type/อาคารพาณิชย์" className="type-menu-bar">อาคารพาณิชย์</Link>
        <Link to="/properties/type/สำนักงาน" className="type-menu-bar">สำนักงาน</Link>
        <Link to="/properties/type/เซ็งธุรกิจ" className="type-menu-bar">เซ็งธุรกิจ</Link>
        <Link to="/properties/type/ที่ดิน" className="type-menu-bar">ที่ดิน</Link>
      </div>

      <div className="navbar_right">
        <div className="navbar_right_accountcontainer">
          <button
            className="accounttype"
            onClick={toggleDropdown}
          >
            <Hamburger
              size={25}
              color="#24355A"
              duration={0.8}
              toggled={isOpen}
              toggle={setOpen}
            />
          </button>

          <div className="profile">
            {!user ? (
              <Person sx={{ fontSize: 28, color: "#969393" }} />
            ) : (
              <img
                src={`https://kkagency-api.onrender.com/${user.profileImagePath.replace(
                  "public",
                  ""
                )}`}
                alt="profile photo"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            )}
          </div>
        </div>

        {isOpen && (
          <div className="navbar_right_accountmenu">
            <Link to="/properties/type/บ้านเดี่ยว" className="type-bar">บ้านเดี่ยว</Link>
            <Link to="/properties/type/คอนโด" className="type-bar">คอนโด</Link>
            <Link to="/properties/type/ทาวน์เฮ้าส์" className="type-bar">ทาวน์เฮ้าส์</Link>
            <Link to="/properties/type/หอพัก โรงแรม" className="type-bar">หอพัก/โรงแรม</Link>
            <Link to="/properties/type/อาคารพาณิชย์" className="type-bar">อาคารพาณิชย์</Link>
            <Link to="/properties/type/สำนักงาน" className="type-bar">สำนักงาน</Link>
            <Link to="/properties/type/เซ็งธุรกิจ" className="type-bar">เซ็งธุรกิจ</Link>
            <Link to="/properties/type/ที่ดิน" className="type-bar">ที่ดิน</Link>
            <div className="range-price">
              <p>ช่วงราคา (บาท)</p>
            </div>
            <Link to="/properties/pricerange/น้อยกว่า 5,000">น้อยกว่า 5,000</Link>
            <Link to="/properties/pricerange/5,000 - 10,000">5,000 - 10,000</Link>
            <Link to="/properties/pricerange/10,000 - 15,000">10,000 - 15,000</Link>
            <Link to="/properties/pricerange/15,000 - 20,000">15,000 - 20,000</Link>
            <Link to="/properties/pricerange/20,000 - 30,000">20,000 - 30,000</Link>
            <Link to="/properties/pricerange/30,000 ++">30,000 ++</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
