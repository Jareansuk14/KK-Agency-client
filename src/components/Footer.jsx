import "../styles/Footer.scss"
import { IoCall } from "react-icons/io5";
import { FaLine, FaFacebookMessenger } from "react-icons/fa6";
const Footer = () => {
  //button contact
  const PhoneCall = () => {
    const phoneNumber = '0990554324'; // replace with the phone number you want to call
    window.open(`tel:${phoneNumber}`);
  };
  return (
    <div className="footer">
      <div className="footer_left">
        <a className="logobf" href="/">
          <img src="/assets/Logo.png" alt="logo" />
        </a>
        <a className="logoaf" href="/">
          <img src="/assets/Logo wow.png" alt="logo" />
        </a>
      </div>

      <div className="footer_right">
        <h3>สนใจฝากปล่อยเช่า</h3>
        <ul>
          <li><a className="call" onClick={PhoneCall}><IoCall sx={{ fontSize: "50px", color: "#FFF" }} /></a></li>
          <li><a className="facebook" href="https://www.facebook.com/profile.php?id=100067895833848" target="_blank"><FaFacebookMessenger /></a></li>
          <li><a className="line" href="https://lin.ee/OfC9JTI"><FaLine /></a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer