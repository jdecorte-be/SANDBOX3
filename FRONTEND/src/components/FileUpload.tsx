import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

export const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      return;
    }
    const data = new FormData();
    data.append('file', file);
    await axios.post('http://localhost:3001/app/auth/file', data);
    await axios.post('http://localhost:3001/app/auth/data', file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" id="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
