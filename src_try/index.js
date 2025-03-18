import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // App.js 를 import 해서 App 이라는 이름으로 사용하기기
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { RouterProvider } from 'react-router-dom';
import router from './router';

// redux store 에서 관리될 state 의 초기값
const initState = {
  userInfo: null,
  loginModal: {
    title:"",
    show:false
  }
}

const reducer = (state=initState, action)=>{
  let newState;
  if(action.type === "USER_INFO"){
    newState = {
      ...state,
      userInfo : action.payload
    }
  } else if(action.type === "LOGIN_MODAL"){
    newState = {
      ...state,
      loginModal : action.payload
    }
  } else{
    newState=state;
  }
  return newState;
}

const store = createStore(reducer)

// id 가 root 인 div 안을 App.js 에서 리턴해준 component 로 채우기기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
