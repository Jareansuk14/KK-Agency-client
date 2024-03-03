import "../styles/Footer.scss"
import { LocalPhone, Email } from "@mui/icons-material"
import { FaFacebookSquare, FaInstagram, FaLine } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/"><img src="/assets/Untitled-2.png" alt="logo" /></a>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+1-234-567-890</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>KKAgency@support.com</p>
        </div>
        
        <div>
          <ul className="social-contact">
            <li><a href="#" className="facebook"><FaFacebookSquare /></a></li>
            <li><a href="#" className="youtube"><IoLogoYoutube /></a></li>
            <li><a href="#" className="instagram"><FaInstagram /></a></li>
            <li><a href="#" className="line"><FaLine /></a></li>
          </ul>
        </div>

      </div>
    </div>
  )
}

export default Footer