

function Category({ name, imageUrl }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
    <div className="relative">
      <div className="w-24 h-16 overflow-hidden rounded-lg border border-gray-300">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <p className="text-white text-lg font-semibold">{name}</p>
      </div>
    </div>
  </div>
  )
}

export default Category
