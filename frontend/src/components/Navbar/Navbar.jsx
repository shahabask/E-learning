import{ useState } from "react";
import "./Navbar.css";
import img from "../../assets/E-learning.svg";
import { useLocation } from "react-router-dom"
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(null);
const location=useLocation()
// const login=location.pathname.startsWith('/login') ?true:location.pathname.startsWith('/register') ? true:false
  const handleMobileMenuClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleClick = (index) => {
    setCurrentActive(index);
  };

  return (
    <>
      <nav className='navbar'>
        <a href="#">
          <img src={img} alt="Logo" />
        </a>
        <div>
       {  <ul id="navbar" className={mobileMenuOpen ? "active" : ""}>
            {["Home", "Aboutus", "Courses", "Service", "Contact"].map(
              (link, index) => (
                <li key={index}>
                  <a
                    href=""
                    className={index === currentActive ? "active-link" : ""}
                    onClick={() => {
                      handleClick(index);
                      if (window.innerWidth <= 769) {
                        handleMobileMenuClick();
                      }
                    }}
                  >
                    {link}
                  </a>
                </li>
              )
            )}
            {/* Add a profile icon here */}
            <li>
              <a href="#" className="profile-icon">
                <i className="fas fa-user"></i>
              </a>
            </li>
          </ul> } 
        </div>
        <div id="mobile" onClick={handleMobileMenuClick}>
          <i
            id="bar"
            className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
