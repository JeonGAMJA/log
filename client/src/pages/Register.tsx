import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

const fetchSignup = async (signupFormData) => {
  try {
    const response = await axios.post('/user/register', signupFormData);
    return response.data;
  } catch (error) {
    throw new Error('회원가입 요청 중 오류가 발생햇습니다');
  }
};

const Register = () => {
  const [signupFormData, setSignupFormData] = useState({
    email: '',
    password: '',
    nickname: '',
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: fetchSignup,
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(signupFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <span>만나서 반가워요 :)</span>
      <span>아래의 가입양식에 정보를 입력해주세요</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nickname"
          value={signupFormData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
        />
        <input
          type="email"
          name="email"
          value={signupFormData.email}
          onChange={handleChange}
          placeholder="이메일"
          required
        />
        <input
          type="password"
          name="password"
          value={signupFormData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />

        <button type="submit">입력완료</button>
      </form>
      <Link to="/login">
        <span>이미 계정이 있으신가요?</span>
      </Link>
    </div>
  );
};

export default Register;
