

import { useEffect, useState } from 'react';
import Category from './Category';
import CourseCard from './Course';
import axiosInstance from '../../utils/axios';
function CourseCategoryPage() {

 const [coursesData,setCoursesData]=useState([])
 const [categoriesData,setCategoriesData] =useState([])
 useEffect(()=>{
 fetchData()
 },[])
 const fetchData=async()=>{
   const response=await axiosInstance.get('/courseCategoryList')
   console.log('courses',response.data.courses)
   setCoursesData(response.data.courses)
   setCategoriesData(response.data.categories)
 }
  return (
    <div className="main-component pt-16" style={{backgroundColor:'#FDF8EE'}}>
      <div className="text-center my-4 m-10">
        <h1 className="text-3xl font-semibold mb-4">Top Courses</h1>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          
            {coursesData && coursesData.map((course) => (
              <CourseCard key={course?._id} {...course} />
            ))}
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mx-auto my-4">
  Load More Courses
</button>

      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl font-semibold mb-4">Categories</h1>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {categoriesData.map((category) => (
            <Category key={category?._id} {...category} />
          ))}
        </div>
        <button className="btn btn-primary mx-auto my-4">Load More Categories</button>
      </div>
    </div>
  );
}

export default CourseCategoryPage;
