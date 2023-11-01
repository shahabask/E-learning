import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
function CourseCard({image,course,description,categoryName}) {
  const modifiedImagePath = image
      ? `http://localhost:5000/${image.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`
      : '';
  //     useEffect(()=>{
  //       if(image){
  //         console.log('modifiedImagePath',modifiedImagePath)
  //       }
  //     },[])
  return (
    <div className="col mb-5">
    <div className="card h-100">
      { (
        <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>
          Sale
        </div>
      )}
      <img className="card-img-top" src={modifiedImagePath} alt="..." style={{height:'200px'}}/>
      <div className="card-body p-4">
        <div className="text-center">
          <h5 className="fw-bolder">{course}</h5>
          <p>{description}</p>
        </div>
      </div>
      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div className="text-center">
        <Link to={`/plans?categoryName=${categoryName}`} className="btn btn-outline-dark mt-auto">
      join course
    </Link>
        </div>
      </div>
    </div>
  </div>
  
  
  )
}

export default CourseCard
