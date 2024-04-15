import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

const fetchLogin = async (loginInfo) => {
  try {
    const response = await axios.post('/user/login', loginInfo);
    return response.data;
  } catch (error) {
    throw new Error('로그인 요청 중 오류가 발생했습니다.');
  }
};

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      navigate('/mylog');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(loginInfo);
  };
  return (
    <div>
      <span>다시 만나서 반가워요! :)</span>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={loginInfo.email}
          type="email"
          placeholder="이메일"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          value={loginInfo.password}
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <button>나만의 Log에 접속하기</button>
      </form>
      <Link to="/signup">
        <span>혹시 회원이 아니신가요?</span>
      </Link>
      <button>google</button>
    </div>
  );
};

export default Login;
