import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onImageChange, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreview(imageUrl);
        onImageChange(imageUrl);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a PNG or JPG image file.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Token Logo (Optional)
      </label>
      
      {preview ? (
        <div className="relative">
          <div className="w-full h-48 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
            <img 
              src={preview} 
              alt="Token logo preview" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`w-full h-48 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
            isDragging 
              ? 'border-purple-400 bg-purple-50' 
              : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="p-3 bg-gray-100 rounded-full mb-3">
              {isDragging ? (
                <Upload className="w-8 h-8 text-purple-500" />
              ) : (
                <ImageIcon className="w-8 h-8" />
              )}
            </div>
            <p className="text-sm font-medium mb-1">
              {isDragging ? 'Drop your image here' : 'Upload token logo'}
            </p>
            <p className="text-xs text-gray-400">
              PNG or JPG up to 10MB
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Click to browse or drag and drop
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500">
        Recommended: Square image (512x512px or larger) for best results
      </p>
    </div>
  );
};

export default ImageUpload;
