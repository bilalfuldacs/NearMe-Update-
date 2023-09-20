import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUploader.css'; // Import your CSS file

const ImageUploader = ({setFormData}) => {
    const [isValid, setIsValid] = useState(false);
  const [images, setImages] = useState([]);
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      isValid,
    }));
  }, [isValid]);
  const handleDrop = (acceptedFiles) => {
    const imageObjects = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const updatedImages = [...images, ...imageObjects];
    setImages(updatedImages);
   if (updatedImages.length > 0) {
    console.log(isValid);
    setIsValid(true);
      setFormData((prevData) => ({
        ...prevData,
        images: updatedImages,
        isValid
      }));
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  console.log(updatedImages.length);
      if (updatedImages.length <= 0) {
        setIsValid(false); console.log(isValid);setFormData((prevData) => ({
        ...prevData,
        images: updatedImages,
        isValid
      }));}
   else if (updatedImages.length > 0) {
    setIsValid(true);
    console.log(isValid);
      setFormData((prevData) => ({
        ...prevData,
        images: images,
        isValid
      }));
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(images);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  return (
    <div className="image-uploader-container">
      <div className="upload-container" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
      <div className="image-row">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.preview} alt="" className="image-preview" />
            <button onClick={() => handleRemoveImage(index)} className="remove-button">
              X
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default ImageUploader;
