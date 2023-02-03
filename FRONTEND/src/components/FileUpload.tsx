import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

export const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('user', sessionStorage.getItem('currentUser'));
    formData.append('file', file);
    await axios.post('http://localhost:3001/app/auth/data', formData);
  };

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <input type="file" name="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
