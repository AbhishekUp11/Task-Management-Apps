import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Forgot = () => {
  const [answer, setAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const dataParams = {email, answer, newPassword};

    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, dataParams);
      if(res.data.success){
        toast.success(res.data.message)
        navigate("/login");
      }else{
        toast.error(res.data.message)
      }
    }catch(err){
      toast.error('Something went wrong')
    }
  };

  return (
    <>
     <form className="register-form" onSubmit={handleForm}>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Answer</label>
          <input
            className="form-control"
            type="number"
            value={answer}
            placeholder="What is your father's age"
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset
        </button>
      </form>
    </>
  )
}

export default Forgot;
