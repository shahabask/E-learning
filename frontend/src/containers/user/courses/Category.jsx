

function Category({ categoryName, image}) {
  const modifiedImagePath = image
      ? `http://localhost:5000/${image.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`
      : '';
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 relative">
    <div className="card h-100">
      <img className="card-img-top" src={modifiedImagePath} alt="..." style={{ height: '200px' }} />
  
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="badge text-black text-xl font-semibold" style={{borderRadius:'1px', backgroundColor:'white',fontSize:14}}>
          {categoryName}
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Category
