import { Person } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";
import Hamburger from 'hamburger-react'

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

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
            onClick={() => setDropdownMenu(!dropdownMenu)}
          >
            <Hamburger
              size={20}
              color="#24355A"
              duration={0.8}
            />
          </button>

          <div className="profile">
            {!user ? (
              <Person sx={{ fontSize: 28, color: "#969393" }} />
            ) : (
              <img
                src={`http://localhost:3001/${user.profileImagePath.replace(
                  "public",
                  ""
                )}`}
                alt="profile photo"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            )}
          </div>
        </div>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/properties/type/บ้านเดี่ยว" className="type-bar">บ้านเดี่ยว</Link>
            <Link to="/properties/type/คอนโด" className="type-bar">คอนโด</Link>
            <Link to="/properties/type/ทาวน์เฮ้าส์" className="type-bar">ทาวน์เฮ้าส์</Link>
            <Link to="/properties/type/หอพัก โรงแรม" className="type-bar">หอพัก/โรงแรม</Link>
            <Link to="/properties/type/อาคารพาณิชย์" className="type-bar">อาคารพาณิชย์</Link>
            <Link to="/properties/type/สำนักงาน" className="type-bar">สำนักงาน</Link>
            <Link to="/properties/type/เซ็งธุรกิจ" className="type-bar">เซ็งธุรกิจ</Link>
            <Link to="/properties/type/ที่ดิน" className="type-bar">ที่ดิน</Link>
            <Link to="/login">รายการโปรด</Link>
            <Link to="/login">เข้าสู่ระบบ</Link>
            <Link to="/register">ลงทะเบียน</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="/properties/type/บ้านเดี่ยว" className="type-bar">บ้านเดี่ยว</Link>
            <Link to="/properties/type/คอนโด" className="type-bar">คอนโด</Link>
            <Link to="/properties/type/ทาวน์เฮ้าส์" className="type-bar">ทาวน์เฮ้าส์</Link>
            <Link to="/properties/type/หอพัก โรงแรม" className="type-bar">หอพัก/โรงแรม</Link>
            <Link to="/properties/type/อาคารพาณิชย์" className="type-bar">อาคารพาณิชย์</Link>
            <Link to="/properties/type/สำนักงาน" className="type-bar">สำนักงาน</Link>
            <Link to="/properties/type/เซ็งธุรกิจ" className="type-bar">เซ็งธุรกิจ</Link>
            <Link to="/properties/type/ที่ดิน" className="type-bar">ที่ดิน</Link>
            <Link to={`/${user._id}/wishList`}>รายการโปรด</Link>
            <Link to="/create-listing">ลงประกาศ</Link>
            <Link to="/login" onClick={() => { dispatch(setLogout()) }}>ออกจากระบบ</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
