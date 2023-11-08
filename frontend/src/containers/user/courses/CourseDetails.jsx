import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';

function CourseDetails() {
const [courseInfo,setCourseInfo]=useState('')
const [isSubscriptionActive,setSubscriptionActive]=useState(false)
    const { courseId } = useParams();
    useEffect(()=>{
        fetchCourseDetails()
        
    },[])

    const fetchCourseDetails=async()=>{
        try {
            let response=await axiosInstance.get(`/loadCourseDetails/${courseId}`)
            console.log(response.data.courseDetails,'details')
            response.data.courseDetails.image=`http://localhost:5000/${response.data.courseDetails.image.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`
            setCourseInfo(response.data.courseDetails)
            const endDateISO = Date.parse(response.data.plan.endDate);
            const endDate = new Date(endDateISO);
              
          
            if(endDate> Date.now()){
               setSubscriptionActive(true)
               
            }
            
        } catch (error) {
            toast.error(error?.couseDetails?.data||error.error)
        }
    }

// const imagePath=courseInfo?.image
// console.log('IM',imagePath)
// const modifiedImagePath=`http://localhost:5000/${imagePath.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`

  return (
    <div>
 

    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div style={{height:'40px'}}></div>
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6" >

            <img className="card-img-top mb-5 mb-md-0" src={courseInfo.image} alt="..."  style={{height:'400px',borderRadius:'8px',border:'1px solid black'}}/>
          </div>
          <div className="col-md-6">
            {/* <small className="mb-1">SKU: BST-498</small> */}
            <h1 className="text-3xl font-extrabold text-gray-900">{courseInfo.course}</h1>
           <p className="lead text-3xl">
             {courseInfo.description}
            </p>
            <div className="d-flex">
                
        {isSubscriptionActive?<div></div>:<Link to="/plans" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
  <i className="bi-cart-fill me-1"></i>Subscribe Now
</Link>}    
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-5 bg-light">
      <div className="container px-4 px-lg-5 mt-5">
        <h2 className="fw-bolder mb-4 text-3xl font-extrabold text-gray-900">videos</h2>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          <div className="col mb-5">
            <div className="card h-100">
              <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
              <div className="card-body p-4 text-center">
                <h5 className="fw-bolder">Fancy Product</h5>
                <span>$40.00 - $80.00</span>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                <a className="btn btn-outline-dark mt-auto" href="#">View options</a>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div className="card h-100">
              <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>Sale</div>
              <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
              <div className="card-body p-4 text-center">
                <h5 className="fw-bolder">Special Item</h5>
                <div className="d-flex justify-content-center small text-warning mb-2">
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                </div>
                <span className="text-muted text-decoration-line-through">$20.00</span>
                <span>$18.00</span>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                <a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div className="card h-100">
              <div className="badge bg-dark text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>Sale</div>
              <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
              <div className="card-body p-4 text-center">
                <h5 className="fw-bolder">Sale Item</h5>
                <span className="text-muted text-decoration-line-through">$50.00</span>
                <span>$25.00</span>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                <a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
              </div>
            </div>
          </div>
          <div className="col mb-5">
            <div className="card h-100">
              <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
              <div className="card-body p-4 text-center">
                <h5 className="fw-bolder">Popular Item</h5>
                <div className="d-flex justify-content-center small text-warning mb-2">
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                  <i className="bi-star-fill"></i>
                </div>
                <span>$40.00</span>
              </div>
              <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                <a className="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

 
  </div>
);
}

export default CourseDetails