import React, { useEffect, useRef } from 'react'
import '../ImageUpload/ImageUpload.css'
import PenIcon from '../../../assets/SimpleIcons/icon-park-outline.png'
import AddImageIcon from '../../../assets/SimpleIcons/Add Image.png'
import CloseIcon from '../../../assets/SimpleIcons/close.png'
import axios from 'axios'

function ImageUpload({formValues,handleInputs,imageFile, setImageFile,uploadedImageUrl, setUploadedImageUrl,imageLoadingState, setImageLoadingState}) {

  const inputRef=useRef(null)

  function handleImageFileChange(e) {
    console.log(e.target.files);
    const selectedFile=e.target.files?.[0]
    if(selectedFile) setImageFile(selectedFile)
  }

  function handleDragOver(e) {
    e.preventDefault()
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile=e.dataTransfer.files?.[0];
    if(droppedFile) setImageFile(droppedFile)
  }

  function handleRemoveImage() {
    setImageFile(null);
    if(inputRef.current){
      inputRef.current.value='';
    }
  }

  console.log(imageFile);

  async function uploadImageToCloudinary() {
    setImageLoadingState(true)
    const data=new FormData()
    data.append('my_file',imageFile);
    const response=await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/products/upload-image`,data)
    console.log(response.data);
    
    if(response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false)
    }
  }
  

  useEffect(() => {
    if(imageFile!== null) uploadImageToCloudinary()
  }, [imageFile])

//   const handleInputs = (e) => {
//     const { name, value } = e.target;
//     setValues((prevValues) => ({
//         ...prevValues,
//         [name]: value,
//     }));
// };

  return (
    <div className='ImageUpload'>
        <div className="input-label">
            <input 
              type="text" 
              placeholder='Add label'
              name='label'
              value={formValues.label}
              onChange={handleInputs} 
            />
            <img src={PenIcon} alt="edit" />
        </div>
        <div className="input-image" onDragOver={handleDragOver} onDrop={handleDrop}>
            
            <input type="file" name="" id="image-upload" ref={inputRef} onChange={handleImageFileChange} />
            {!imageFile ?
              (<label htmlFor='image-upload'>
                <img src={AddImageIcon} alt="add-image" />
              </label>
              ):(
                imageLoadingState?
                <div>Loading</div>:
                <div className='imageholder'>
                  <div className="image">
                    <img src={AddImageIcon} alt="" />
                  </div>
                  <p>{imageFile.name}</p>
                  <button className='remove-image' onClick={handleRemoveImage}>
                    <img src={CloseIcon} alt="close" />
                  </button>
                </div>
              )
              
            }
            
        </div>
        
    </div>
  )
}

export default ImageUpload