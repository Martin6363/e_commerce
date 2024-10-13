import { Link } from "react-router-dom";
import "../../assets/styles/Footer.scss";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export default function Footer() {
  return (
    <>
      <footer className="footer max-w-screen-xl mx-auto">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li>
                  <Link to={''}>about us</Link>
                </li>
                <li>
                  <Link to={''}>our services</Link>
                </li>
                <li>
                  <Link to={''}>privacy policy</Link>
                </li>
                <li>
                  <Link to={''}>affiliate program</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li>
                  <Link to={''}>FAQ</Link>
                </li>
                <li>
                  <Link to={''}>shipping</Link>
                </li>
                <li>
                  <Link to={''}>returns</Link>
                </li>
                <li>
                  <Link to={''}>order status</Link>
                </li>
                <li>
                  <Link to={''}>payment options</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>online shop</h4>
              <ul>
                <li>
                  <Link to={''}>watch</Link>
                </li>
                <li>
                  <Link to={''}>bag</Link>
                </li>
                <li>
                  <Link to={''}>shoes</Link>
                </li>
                <li>
                  <Link to={''}>dress</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <Link className="social_links" to={''}>
                  <FaFacebook/>
                </Link>
                <Link className="social_links" to={''}>
                  <RiTwitterXLine/>
                </Link>
                <Link className="social_links" to={''}>
                  <FaInstagram/>
                </Link>
                <Link className="social_links" to={''}>
                  <FaLinkedin/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
