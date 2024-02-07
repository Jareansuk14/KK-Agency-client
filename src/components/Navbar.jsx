import { Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo_transparent2.png" alt="logo" />
      </a>

        <ul className="type-menu">
          <li><a href="#">บ้านเดี่ยว</a></li>
          <li><a href="#">คอนโด</a></li>
          <li><a href="#">ทาวน์เฮ้าส์</a></li>
          <li><a href="#">หอพัก/โรงแรม</a></li>
          <li><a href="#">อาคารพาณิชย์</a></li>
          <li><a href="#">สำนักงาน</a></li>
          <li><a href="#">เซ็งธุรกิจ</a></li>
          <li><a href="#">ที่ดิน</a></li>
        </ul>
        
      <div className="navbar_right">
        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: "#969393" }} />
          {!user ? (
            <Person sx={{ color: "#969393" }} />
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
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="#" className="type-bar">บ้านเดี่ยว</Link>
            <Link to="#" className="type-bar">คอนโด</Link>
            <Link to="#" className="type-bar">ทาวน์เฮ้าส์</Link>
            <Link to="#" className="type-bar">หอพัก/โรงแรม</Link>
            <Link to="#" className="type-bar">อาคารพาณิชย์</Link>
            <Link to="#" className="type-bar">สำนักงาน</Link>
            <Link to="#" className="type-bar">เซ็งธุรกิจ</Link>
            <Link to="#" className="type-bar">ที่ดิน</Link>
            <Link to="/login">รายการโปรด</Link>
            <Link to="/login">เข้าสู่ระบบ</Link>
            <Link to="/register">ลงทะเบียน</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="#" className="type-bar">บ้านเดี่ยว</Link>
            <Link to="#" className="type-bar">คอนโด</Link>
            <Link to="#" className="type-bar">ทาวน์เฮ้าส์</Link>
            <Link to="#" className="type-bar">หอพัก/โรงแรม</Link>
            <Link to="#" className="type-bar">อาคารพาณิชย์</Link>
            <Link to="#" className="type-bar">สำนักงาน</Link>
            <Link to="#" className="type-bar">เซ็งธุรกิจ</Link>
            <Link to="#" className="type-bar">ที่ดิน</Link>
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
