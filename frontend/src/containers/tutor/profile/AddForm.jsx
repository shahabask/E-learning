import './profile.css';
function AddForm() {
  return (
    <>
    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-3 text-primary">Personal Details</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter full name"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="eMail">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter city"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="State">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="State"
                      placeholder="Enter State"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="url"
                      className="form-control"
                      id="country"
                      placeholder="enter country"
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-3 text-primary mt-2">Qualification</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="Street">Dgree</label>
                    <input
                      type="name"
                      className="form-control"
                      id="Degree"
                      placeholder="Enter degree"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="ciTy">Skills</label>
                    <input
                      type="name"
                      className="form-control"
                      id="Skills"
                      placeholder="Enter Skills"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="sTate">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Category"
                      placeholder="Enter category"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="zIp">Subjects</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Subject"
                      placeholder="enter subjects"
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right d-flex justify-content-center">
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-primary mt-3"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default AddForm