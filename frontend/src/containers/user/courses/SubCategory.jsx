import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Navbar, Nav, Row, Col, Card, Button } from 'react-bootstrap';
function SubCategory() {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 3; // Number of courses per page
 const [category,setCategory]=useState([])
const [subCategoryCourses,setSubCategoryCourses]=useState([])
 const { categoryId } = useParams();
  const handleSubcategoryClick = (subcategory) => {

    setSelectedSubcategory(subcategory);
    // setCurrentPage(1);
  };

  // const handleLoadMore = () => {
  //   setCurrentPage(currentPage + 1);
  // };
useEffect(()=>{
    fetchCategoryDetails()
   setSelectedSubcategory(category[0]?.subCategory)
   console.log('sub',selectedSubcategory) 
},[])
const fetchCategoryDetails=async()=>{
    try {
        const response=await axiosInstance.get(`http://localhost:5000/api/categoryDetails/${categoryId}`)
        console.log('response',response?.data)
      const modifiedCategory=response?.data?.map((item) => {
        if (item.courseImage) {
          item.courseImage = `http://localhost:5000/${item.courseImage.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`;
        }
        if(item.image){
          item.image = `http://localhost:5000/${item.image.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`;

        }
        return item;
      })
        setCategory([...modifiedCategory])
        console.log('categories',category)
    } catch (error) {
      console.log('error',error)
      toast.error(error?.response?.data ||error.error)  
    }
        
}




useEffect(()=>{
   
 
    const coursesDetails=category.filter((category)=>{
      if(category.subCategory===selectedSubcategory){
     
        return category
      }
     
    })
    console.log('courses123235',coursesDetails)
    if(coursesDetails.length==0){
      console.log('helo')
      setSubCategoryCourses([])
    }else{

      setSubCategoryCourses([...coursesDetails])
    }
},[selectedSubcategory])

      // useEffect(()=>{
      //   // console.log('modifiedImage:',modifiedImage)
      // },[modifiedImage])
  return (

<div style={{backgroundColor:'#FDF8EE'}}>
  <div style={{height:'100px'}}></div>

  {/* Page Content */}
  <div className="px-4 px-lg-5">
    {/* Heading Row */}
    <div className='flex justify-center'>
    <div className="text-white my-4 py-1 text-center w-full" style={{height:'60px' ,borderRadius:'7px',backgroundColor:'purple' }}>
      <div className="h-50">
        <h1 className="m-0">{category[0]?.categoryName}</h1>
      </div>
    </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center my-5">
    <div className="lg:col-span-1 flex justify-center items-center">
  <div className="relative group">
    <img
      className="rounded max-h-48 mb-4 transform transition-transform duration-300 group-hover:scale-110"
      src={category[0]?.image}
      alt="..."
      style={{ width: '200px' }}
    />
    {/* <div className="hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 group-hover:flex justify-center items-center">
      <p className="text-white text-lg font-semibold">Hover Effect</p>
    </div> */}
  </div>
</div>

  <div className="lg:col-span-1">
    <h3 className="font-light">SUBCATEGORIES:</h3>
    <div>
      {category[0]?.subCategories?.map((subcategory, index) => (
        <button
          key={index}
          className="bg-black text-white py-2 px-4 mx-2 group-hover:scale-110"
          onClick={() => handleSubcategoryClick(subcategory)}
        >
          {subcategory}
        </button>
      ))}
    </div>
  </div>
</div>


    {/* Call to Action */}
    <div className='flex justify-center'>
    <div className=" text-white my-4 py-1 text-center w-full" style={{height:'60px' ,borderRadius:'7px',backgroundColor:'purple'}}>
      <div className="h-50">
        <h1 className="m-0">Courses</h1>
      </div>
    </div>
    </div>
    {/* Content Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex justify-center items-center">
  {subCategoryCourses.length > 0
    ? subCategoryCourses.map((course, index) => (
        <div key={index} className="mb-5">
          <div className="border rounded-lg shadow-lg p-4">
            <img
              src={course.courseImage}
              alt={`${course.course} Image`}
              className="w-full h-auto max-h-48 mb-4" // Adjust the max height as needed
            />
            <h2 className="text-lg font-semibold">{course.course}</h2>
            {/* <p className="text-gray-600">{course.courseDescription}</p> */}
            <a
              href="#!"
              className="bg-primary text-white py-2 px-4 inline-block mt-4"
            >
              More Info
            </a>
          </div>
        </div>
      ))
    : (
      <div className="flex justify-center items-center h-48 animate-pulse">
        <div className="bg-gray-200 rounded-lg p-4 text-center">
          <p className="text-gray-500 text-lg">
            No courses in {selectedSubcategory} category
          </p>
          <div className="mt-4">
            <div className="h-3 w-24 bg-danger rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    )}
</div>

  </div>
</div>

  )

}

export default SubCategory;
