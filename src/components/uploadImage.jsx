// import React, { useState } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import '../components/uploadImages.css'


// const UploadImage = () => {
//   const [image, setImage] = useState('');
//   const [Crop , setCrop] = useState({aspect:0})
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const imgRef = useRef(null);

  

//    const handleImage = (e) => {
//     const Reader= new FileReader();
//     Reader.onloadend = () => {
//      setImage( Reader.result) // get bits64 img
//     }
//     Reader.readAsDataURL(e.target.files[0])//current image ko read karta hai and convert to bits 64 and call onloadend funt
    
//   };

//   const download =() =>{
//     const img= document.querySelector("img");
//     const canvas = document.createElement("canvas")// create canvas
//     const ctx =canvas.getContext("2d") // canvas per grapical elemnt create karta hai
//     canvas.width= Crop.width;
//     canvas.height= Crop.height;

//     // ctx.drawImage(img , Crop.x , Crop.y , Crop.width , Crop.height, 0 ,0 , Crop.width,Crop.height)
//      const scaleX = img.naturalWidth / img.width;
//     const scaleY = img.naturalHeight / img.height;

//     ctx.drawImage(
//       img,
//       Crop.x * scaleX,
//       Crop.y * scaleY,
//       Crop.width * scaleX,
//       Crop.height * scaleY,
//       0,
//       0,
//       Crop.width,
//       Crop.height
//     );
//     const dataUrl = canvas.toDataURL(); // Base64 string

//   setPreviewUrl(dataUrl); 
  
//     const a= document.createElement("a");
//         a.href =canvas.toDataURL();

//     a.download = "cropimage.png"
//     a.click()
//   }

//   return (
    
//     <div>
//       <input type="file"onChange={handleImage}/>
//       <ReactCrop crop={Crop} onChange ={setCrop}>
//         <img src={image} alt=""/>
//          </ReactCrop>
//       <button onClick={download}>Download Image</button>
      
//       <div className="preview-section">
//         <h3>Cropped Image Preview</h3>
//         {previewUrl && <img src={previewUrl} alt="Cropped Preview" />}
//       </div>
//     </div>
//   );
// };

// export default UploadImage;

import React, { useState, useRef } from 'react'; // ✅ Added useRef
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../components/uploadImages.css';

const UploadImage = () => {
  const [image, setImage] = useState('');
  const [Crop, setCrop] = useState({ aspect: 0 });
  const [previewUrl, setPreviewUrl] = useState(null);
  const imgRef = useRef(null); // ✅ Create the ref

  const handleImage = (e) => {
    const Reader = new FileReader();
    Reader.onloadend = () => {
      setImage(Reader.result);
    };
    Reader.readAsDataURL(e.target.files[0]);
  };

  const download = () => {
    const img = imgRef.current; // ✅ Use ref instead of querySelector
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = Crop.width;
    canvas.height = Crop.height;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    ctx.drawImage(
      img,
      Crop.x * scaleX,
      Crop.y * scaleY,
      Crop.width * scaleX,
      Crop.height * scaleY,
      0,
      0,
      Crop.width,
      Crop.height
    );

    const dataUrl = canvas.toDataURL();
    setPreviewUrl(dataUrl);

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "cropimage.png";
    a.click();
  };

  return (
    <div>
      <input type="file" onChange={handleImage} />
      <ReactCrop crop={Crop} onChange={setCrop}>
        <img src={image} alt="" ref={imgRef} />
      </ReactCrop>
      <button onClick={download}>Download Image</button>

      <div className="preview-section">
        <h3>Cropped Image Preview</h3>
        {previewUrl && <img src={previewUrl} alt="Cropped Preview" />}
      </div>
    </div>
  );
};

export default UploadImage;
