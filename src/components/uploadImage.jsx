import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '../components/uploadImages.css';

const UploadImage = () => {
  const [image, setImage] = useState('');
  const [Crop, setCrop] = useState({ aspect: 0 });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const imgRef = useRef(null);

  const handleImage = (e) => {
    const Reader = new FileReader();
    Reader.onloadend = () => {
      setImage(Reader.result);
      setIsDialogOpen(true);
    };
    Reader.readAsDataURL(e.target.files[0]);
  };

  const download = () => {
    const img = imgRef.current;
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

    setIsDialogOpen(false);
  };

  return (
    <div>
      <input type="file" onChange={handleImage} />

      {isDialogOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <ReactCrop crop={Crop} onChange={setCrop}>
              <img src={image} alt="" ref={imgRef} />
            </ReactCrop>
            <button onClick={download}>Download Image</button>
           
          </div>
        </div>
      )}

      <div className="preview-section">
        <h3>Cropped Image Preview</h3>
        {previewUrl && <img src={previewUrl} alt="Cropped Preview image" />}
      </div>
    </div>
  );
};

export default UploadImage;
