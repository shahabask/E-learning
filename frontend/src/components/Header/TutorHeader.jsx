
import '../../Components/Header/TutorHeader.css';
import { FaSearch } from 'react-icons/fa';
import img from "../../assets/E-learning.svg";
import { useSelector } from 'react-redux';

function TutorHeader() {

    const {tutorInfo}=useSelector((state)=>state.tutorAuth)
    if(tutorInfo){

    
  return (
    <header className="admin-header">
      <div className="logo">
        <img src={img} alt="Logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button type="button">
          <FaSearch size={20} />
        </button>
      </div>
      <div className="profile-container">
        {/* Image added as a background to the profile-image div */}
        <div className="profile-image" style={{ backgroundImage: "url('https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg')" }}></div>
      </div>
    </header>
  );
}else{
    return(  <header className="admin-header">
    <div className="logo">
      <img src={img} alt="Logo" />
    </div>

  </header>)  
}
}

export default TutorHeader;