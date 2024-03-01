import { Person } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";
import Hamburger from 'hamburger-react'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const top = () => { window.scrollTo(0, 0) }
  const toggleDropdown = () => {
    setOpen(!isOpen);
  };
  const closeMenu = () => { setOpen(false);};
  const handleClick = () => {
    top()
    closeMenu();
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo_transparent2.png" alt="logo" />
      </a>

      <div className="type-menu">
        <Link to="/properties/type/บ้านเดี่ยว" className="type-menu-bar" onClick={top}>บ้านเดี่ยว</Link>
        <Link to="/properties/type/คอนโด" className="type-menu-bar" onClick={top}>คอนโด</Link>
        <Link to="/properties/type/ทาวน์เฮ้าส์" className="type-menu-bar" onClick={top}>ทาวน์เฮ้าส์</Link>
        <Link to="/properties/type/หอพัก โรงแรม" className="type-menu-bar" onClick={top}>หอพัก/โรงแรม</Link>
        <Link to="/properties/type/อาคารพาณิชย์" className="type-menu-bar" onClick={top}>อาคารพาณิชย์</Link>
        <Link to="/properties/type/สำนักงาน" className="type-menu-bar" onClick={top}>สำนักงาน</Link>
        <Link to="/properties/type/เซ็งธุรกิจ" className="type-menu-bar" onClick={top}>เซ็งธุรกิจ</Link>
        <Link to="/properties/type/ที่ดิน" className="type-menu-bar" onClick={top}>ที่ดิน</Link>
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

        {isOpen && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/properties/type/บ้านเดี่ยว" className="type-bar" onClick={handleClick}>บ้านเดี่ยว</Link>
            <Link to="/properties/type/คอนโด" className="type-bar" onClick={handleClick}>คอนโด</Link>
            <Link to="/properties/type/ทาวน์เฮ้าส์" className="type-bar" onClick={handleClick}>ทาวน์เฮ้าส์</Link>
            <Link to="/properties/type/หอพัก โรงแรม" className="type-bar" onClick={handleClick}>หอพัก/โรงแรม</Link>
            <Link to="/properties/type/อาคารพาณิชย์" className="type-bar" onClick={handleClick}>อาคารพาณิชย์</Link>
            <Link to="/properties/type/สำนักงาน" className="type-bar" onClick={handleClick}>สำนักงาน</Link>
            <Link to="/properties/type/เซ็งธุรกิจ" className="type-bar" onClick={handleClick}>เซ็งธุรกิจ</Link>
            <Link to="/properties/type/ที่ดิน" className="type-bar" onClick={handleClick}>ที่ดิน</Link>
            <div className="range-price">
              <p>ช่วงราคา (บาท)</p>
            </div>
            <Link to="/properties/pricerange/น้อยกว่า 5,000" onClick={handleClick}>น้อยกว่า 5,000</Link>
            <Link to="/properties/pricerange/5,000 - 10,000" onClick={handleClick}>5,000 - 10,000</Link>
            <Link to="/properties/pricerange/10,000 - 15,000" onClick={handleClick}>10,000 - 15,000</Link>
            <Link to="/properties/pricerange/15,000 - 20,000" onClick={handleClick}>15,000 - 20,000</Link>
            <Link to="/properties/pricerange/20,000 - 30,000" onClick={handleClick}>20,000 - 30,000</Link>
            <Link to="/properties/pricerange/30,000 ++" onClick={handleClick}>30,000 ++</Link>
          </div>
        )}

        {isOpen && user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login" onClick={() => { dispatch(setLogout()); }}>ออกจากระบบ</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
