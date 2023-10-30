
// import "../profile/profile.css";
import AddForm from "./AddForm";

function TutorProfile() {
  return (
    <div style={{ height: "100vh", backgroundColor: "#f2bc4f" }}>
      <div className="container ">
        <div className="row gutters row-with-padding">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar  with-border">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdE5vknOx-qLzTCFwcHv4c2gaQEgwV25KmSg&usqp=CAU"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 className="user-name">Yuki Hayashi</h5>
                    <h6 className="user-email">yuki@Maxwell.com</h6>
                  </div>
                  <div className="centered-container">
                    <div className="row-container">
                      <div className="colum">
                        <i className="fas fa-edit " style={{color:"blue"}}></i>
                        <span className="icon"style={{marginLeft:"10px"}}>Edit</span>
                      </div>
                       <div className="colum">
                       <i className="fas fa-certificate"style={{color:"gold"}}></i> 
                      <span className="icon"style={{marginLeft:"10px"}}>
                       Badge
                      </span>
                      </div>
                      <div className="colum">
                      <i className="fas fa-eye"></i>
                      <span className="icon"style={{marginLeft:"10px"}}>
                         Views
                      </span>
                      </div>
                      <div className="colum">
                      <i className="fas fa-users"></i> 
                      <span className="icon" style={{ paddingLeft: "10px" }}>
                        Followers
                      </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AddForm />
        </div>
      </div>
    </div>
  );
}

export default TutorProfile;