import React, { useState, useRef } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Modal, Button } from 'antd';
import '../components/uploadImages.css';

const UploadImage = () => {
  const [image, setImage] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const imgRef = useRef(null); // ✅ Use this with Cropper

  const handleImage = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setIsDialogOpen(true);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const download = () => {
    const cropper = imgRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        const dataUrl = canvas.toDataURL();
        setPreviewUrl(dataUrl);

        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "cropped-image.png";
        a.click();

        setIsDialogOpen(false);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImage} />

      <Modal
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        footer={null}
         closable={false} 
      >
        <Cropper
          src={image}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={NaN} 
          guides={true}
             ref={imgRef}
        />

        <Button type="primary" onClick={download} style={{ marginTop: 16 }}>
          Download Image
        </Button>
      </Modal>

      <div className="preview-section">
        <h3>Image Preview</h3>
        {previewUrl && (
          <img src={previewUrl} alt="Cropped Preview image" />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
