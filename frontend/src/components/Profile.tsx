import { useEffect, useState } from 'react';
import axios from 'axios';

export const Profile = () => {
  const [avatar, setAvatar] = useState<string>();
  const [login, setLogin] = useState<string>();
  const [file, setFile] = useState<any>();

  useEffect(() => {
    const fetchAvatar = async () => {
      await axios
        .get(
          `http://localhost:3001/app/users/profile/${sessionStorage.getItem(
            'currentUser',
          )}`,
        )
        .then((res) => {
          setAvatar(res.data.avatar);
        })
        .catch((err) => {
          console.error(err.response.data);
        });
    };

    if (!avatar) {
      fetchAvatar();
    }
  }, []);

  const base64FileURL = (e: File, cb: Function) => {
    let file = e;
    let reader = new FileReader();
    reader.onloadend = (e) => {
      cb(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfile = async () => {
    const data = {
      id: Number.parseInt(sessionStorage.getItem('currentUser')),
      login: login,
    };
    await axios
      .post('http://localhost:3001/app/users/profile', data)
      .then((res) => {
        setAvatar(res.data.avatar);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = async (event: any) => {
    const file = event.target.files?.[0];
    setFile(file);
    const formData = new FormData();
    formData.append('user', sessionStorage.getItem('currentUser'));
    formData.append('file', file);
    await axios
      .post('http://localhost:3001/app/users/avatar', formData)
      .then((res) => {
        base64FileURL(file, (obj) => {
          setAvatar(obj);
          handleProfile();
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  return (
    <div>
      <h1>EDIT PROFILE</h1>
      <div>
        <input
          type="text"
          name="login"
          placeholder="Choose a new login"
          value={login || ''}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input type="file" name="file" onChange={handleChange} />
        <img
          src={`data:image/jpeg;base64,${avatar}`}
          alt=""
          style={{ height: '5%', width: '5%' }}
        />
        <button onClick={handleProfile}>Update profile</button>
      </div>
    </div>
  );
};
