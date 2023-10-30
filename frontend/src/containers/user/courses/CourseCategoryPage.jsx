

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
 }
  return (
    <div className="main-component pt-16">
      <div className="text-center my-4">
        <h1 className="text-3xl font-semibold mb-4">Top Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         
          {coursesData && coursesData.map((course) => (
            <CourseCard key={course?._id} {...course} />
          ))}
        </div>
        <button className="btn btn-primary mx-auto my-4">Load More Courses</button>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl font-semibold mb-4">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
