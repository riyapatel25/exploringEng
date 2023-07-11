import React from 'react';
import pic from '../assets/purple.jpeg';
const ImageGallery = () => {
  return (
    <div className="image-gallery">
      <img src={pic} alt="Image 1" className="gallery-image" />
      <img src={pic} alt="Image 2" className="gallery-image" />
      <img src={pic} alt="Image 3" className="gallery-image" />
    </div>
  );
};

export default ImageGallery;