import { useEffect, useState } from 'react';
import Category from './Category';
import CourseCard from './Course';
import axiosInstance from '../../utils/axios';

function CourseCategoryPage() {
  const [coursesData, setCoursesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try{
      const response = await axiosInstance.get('/courseCategoryList');
      setCoursesData(response.data.courses);
      console.log(response.data.courses,'courses')
      setCategoriesData(response.data.categories);
    }catch(error){
console.log('error',error)
    }
   
  };

  const itemsPerPage = 3;
  const [currentCoursePage, setCurrentCoursePage] = useState(1);
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);

  const handleLoadMoreCourses = () => {
    setCurrentCoursePage((currentCoursePage % Math.ceil(coursesData.length / itemsPerPage)) + 1);
  };

  const handleLoadMoreCategories = () => {  
    setCurrentCategoryPage((currentCategoryPage % Math.ceil(categoriesData.length / itemsPerPage)) + 1);
  };

  const indexOfLastCourse = currentCoursePage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = coursesData.slice(indexOfFirstCourse, indexOfLastCourse);

  const indexOfLastCategory = currentCategoryPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categoriesData.slice(indexOfFirstCategory, indexOfLastCategory);

  return (
    <div className="main-component pt-16" style={{ backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
      <div className="text-center my-4">
        <h1 className="text-3xl font-semibold mb-4">Top Courses</h1>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {currentCourses.map((course) => (
            
            <CourseCard className='m-8 p-5' key={course?._id} {...course} />
          ))}
        </div>
        {coursesData.length > itemsPerPage && (
          <button
            className="text-white shadow bg-gradient-to-r from-purple-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleLoadMoreCourses}>
            Load More Courses
          </button>
       ) }
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl font-semibold mb-4">Categories</h1>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {currentCategories.map((category) => (
            <Category key={category?._id} {...category} />
          ))}
        </div>
        {categoriesData.length > itemsPerPage && (
          <button
            className="text-white shadow bg-gradient-to-r from-purple-700 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={handleLoadMoreCategories}
          >
            Load More Categories
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseCategoryPage;
