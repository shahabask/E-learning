import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    position: 'static',
    border: 'none',
    background: 'none',
    overflow: 'visible',
  },
};

Modal.setAppElement('#root');

function VideoModal({ isOpen, onRequestClose, videoData, onSaveVideo, onDeleteVideo }) {
  const [videos, setVideos] = useState([...videoData].length>0?[...videoData] : [{ title: '', description: '', videoUrl: null }]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [errors, setErrors] = useState({});

  const clearErrors = () => {
    setErrors({});
  };
  const handleSave = () => {
    clearErrors();
    const isValid = validate();

  if (isValid) {
    onSaveVideo(videos);
    onRequestClose();
  }
  };

  const addMoreVideo = () => {
    setVideos([...videos, { title: '', description: '', videoUrl: null }]);
    setCurrentVideoIndex(videos.length);
  };

  const removeVideo = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  const handleVideoChange = (index, e) => {
    const updatedVideos = [...videos];
    updatedVideos[index].videoUrl = e.target.files[0];
    setVideos(updatedVideos);
  };

  const handletitleChange = (index, e) => {
    const updatedVideos = [...videos];
    updatedVideos[index].title = e.target.value;
    setVideos(updatedVideos);
  };

  const handleDescriptionChange = (index, e) => {
    const updatedVideos = [...videos];
    updatedVideos[index].description = e.target.value;
    setVideos(updatedVideos);
  };

  const validate = () => {
    const newErrors = {};
  
    videos.forEach((video, index) => {
      if (!video.title) {
        newErrors[`title${index}`] = 'Title is required';
      }
  
      if (!video.description) {
        newErrors[`description${index}`] = 'Description is required';
      }
  
      if (!video.videoUrl) {
        newErrors[`videoUrl${index}`] = 'Video is required';
      }
    });
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="w-96 p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {videoData ? 'Edit Videos' : 'Add Videos'}
        </h2>
        <div
          className="max-h-96 overflow-y-auto" // Add max-height and overflow-y: auto for scrolling
        >
         {videos.map((video, index) => (
  <div
    key={index}
    className={`mb-4 ${showAllVideos || index === currentVideoIndex ? 'visible' : 'hidden'}`}
  >
    <input
      type="file"
      accept="video/*"
      onChange={(e) => handleVideoChange(index, e)}
      className="w-full border p-2 rounded mb-2"
    />
    {errors[`videoUrl${index}`] && (
      <p className="text-red-600">{errors[`videoUrl${index}`]}</p>
    )}
    <input
      type="text"
      placeholder="Video title"
      value={video.title}
      onChange={(e) => handletitleChange(index, e)}
      className="w-full border p-2 rounded mb-2"
    />
    {errors[`title${index}`] && (
      <p className="text-red-600">{errors[`title${index}`]}</p>
    )}
    <textarea
      placeholder="Video Description"
      value={video.description}
      onChange={(e) => handleDescriptionChange(index, e)}
      className="w-full border p-2 rounded mb-2"
    />
    {errors[`description${index}`] && (
      <p className="text-red-600">{errors[`description${index}`]}</p>
    )}
    <button
      onClick={() => removeVideo(index)}
      className="bg-red-500 text-white rounded p-2 mr-2 hover:bg-red-600"
    >
      Remove Video
    </button>
  </div>
))}

        </div>
        <div className="mt-4">
          <button
            onClick={() => setShowAllVideos(!showAllVideos)}
            className="bg-blue-500 text-white rounded p-2 mr-2 hover-bg-blue-600"
          >
            {showAllVideos ? 'Show Less' : 'Show All Videos'}
          </button>
          <button
            onClick={addMoreVideo}
            className="bg-blue-500 text-white rounded p-2 mr-2 hover-bg-blue-600"
          >
            Add More Video
          </button>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white rounded p-2 mr-2 hover-bg-blue-600 mt-4"
        >
          Save Videos
        </button>
        <button
          onClick={onRequestClose}
          className="bg-gray-300 text-gray-800 rounded p-2 hover:bg-gray-400 mt-4"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default VideoModal;
