import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const FileUpload: React.FC = (event: React.FormEvent) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    //await axios.post('http://localhost:3001/app/auth/file', formData);
    await axios.post('http://localhost:3001/app/auth/data', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" id="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
