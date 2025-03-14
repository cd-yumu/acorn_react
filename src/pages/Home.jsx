// src/pages/Home.jsx

import axios from 'axios';
import React from 'react';

function Home(props) {
    return (
        <div>
            <h1>Index Page.</h1>
            <button onClick={()=>{
                axios.get("/ping")
                .then(res => alert(res.data))
                .catch(err => alert("응답하지 않음"));
            }}>Ping 요청</button>
        </div>
    );
}

export default Home;