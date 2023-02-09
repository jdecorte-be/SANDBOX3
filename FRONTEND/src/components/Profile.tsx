import React, { useState } from 'react';
import axios from 'axios';

export const Profile: React.FC = () => {
  const [avatar, setAvatar] = useState<string>();
  const [login, setLogin] = useState<string>();
  const [status, setStatus] = useState<string>();

  const handleProfileButtonClick = async () => {
    await axios
      .post('http://localhost:3001/app/users/profile', {
        id: Number.parseInt(sessionStorage.getItem('currentUser')),
      })
      .then((res) => {
        setAvatar(res.data.avatar);
        setLogin(res.data.login);
        setStatus(res.data.status);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div>
        <h3>{login}</h3>
        <h4>{status}</h4>
        <img
          src={`data:image/jpeg;base64,${avatar}`}
          alt="Avatar"
          style={{ height: '5%', width: '5%' }}
        />
        <button onClick={handleProfileButtonClick}>Profile</button>
      </div>
    </div>
  );
};
