import React from 'react'

function CourseCard({ name, description, imageUrl }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-4">
    <img src={imageUrl} alt={name} className="w-full h-auto rounded-lg" />
    <h2 className="text-2xl font-semibold my-4">{name}</h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
      Join Course
    </button>
  </div>
  )
}

export default CourseCard
