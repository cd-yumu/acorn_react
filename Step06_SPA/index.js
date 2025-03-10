import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // App.js 를 import 해서 App 이라는 이름으로 사용하기기
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
// 폴더명 까지만 import 하면 default 로 index.jsx 가 import 된다.
import router from './router';
import axios from 'axios';

// axios 의 요청 경로 앞에 붙을 base url 설정 (Context Path)
//axios.defaults.baseURL = "/spring12"
// 사실 특정 요청은 버전이 다를 수 있기 때문에 여기에 v3 라고 버전을 붙이긴 애매하다.

// id 가 root 인 div 안을 App.js 에서 리턴해준 component 로 채우기기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
