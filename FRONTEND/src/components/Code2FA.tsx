import axios from 'axios';
import { useState } from 'react';

export const Code2FA = ({ onSubmit }: { onSubmit: () => void }) => {
  const [code, setCode] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      code: formData.get('code'),
      login: localStorage.getItem('currentUser'),
    };
    axios
      .post('http://localhost:3001/app/auth/code', form, {
        headers: { Authorization: document.cookie },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      onSubmit();
  };

  return (
    <div>
      <h1>2FA</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="code"
            placeholder="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};
