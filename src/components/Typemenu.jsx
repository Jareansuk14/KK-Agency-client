import { useState } from "react";
import "../styles/Typemenu.scss";
import { Link } from "react-router-dom";
import Hamburger from 'hamburger-react'

const Typemenu = () => {
    const [isOpen, setOpen] = useState(false)
    const toggleDropdown = () => {
        setOpen(!isOpen);
    };
    return (
        <div className="typememu">
            <div className="typememu-container">
                <button
                    className="typememu-btn"
                    onClick={toggleDropdown}
                >
                    <Hamburger
                        color="#24355A"
                        duration={0.8}
                        toggled={isOpen}
                        toggle={setOpen} />
                </button>

                {isOpen && (
                    <div className="typememu-dropdown">
                        <Link to="/properties/type/บ้านเดี่ยว" className="type-bar">บ้านเดี่ยว</Link>
                        <Link to="/properties/type/คอนโด" className="type-bar">คอนโด</Link>
                        <Link to="/properties/type/ทาวน์เฮ้าส์" className="type-bar">ทาวน์เฮ้าส์</Link>
                        <Link to="/properties/type/หอพัก โรงแรม" className="type-bar">หอพัก/โรงแรม</Link>
                        <Link to="/properties/type/อาคารพาณิชย์" className="type-bar">อาคารพาณิชย์</Link>
                        <Link to="/properties/type/สำนักงาน" className="type-bar">สำนักงาน</Link>
                        <Link to="/properties/type/เซ้งธุรกิจ" className="type-bar">เซ้งธุรกิจ</Link>
                        <Link to="/properties/type/ที่ดิน" className="type-bar">ที่ดิน</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Typemenu;
