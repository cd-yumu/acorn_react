// src/pages/PostDetail.jsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';

function PostDetail(props) {
    // "/posts/:num" 에서 num 에 해당되는 경로 파라미터 값 읽어오기
    const {num} = useParams();
    // 글 하나의 정보를 상태값으로 관리
    const [state, setState] = useState({});
    // 검색 키워드 관련 처리
    const [params, setParams] = useSearchParams();

    useEffect(()=>{
        const query = new URLSearchParams(params).toString();
        axios.get(`/posts/${num}${params.get("condition")?"?"+query:""}`)
        .then(res=>{
            // 글 하나의 정보를 상태값에 넣어주고
            setState(res.data);
        })
        .catch(err=>console.log(err))
    },[num]);

    return (
        <>
            <h1>Post View Page.</h1>
            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <td>{state.num}</td>
                    </tr>
                    <tr>
                        <th>Writer</th>
                        <td>{state.writer}</td>
                    </tr>
                    <tr>
                        <th>Title</th>
                        <td>{state.title}</td>
                    </tr>
                    <tr>
                        <th>Viewers</th>
                        <td>{state.viewCount}</td>
                    </tr>
                    <tr>
                        <th>Updated-Date</th>
                        <td>{state.updatedAt}</td>
                    </tr>
                    <tr>
                        <th>Created-Date</th>
                        <td>{state.createdAt}</td>
                    </tr>
                </thead>
            </Table>
            <div dangerousl ySetInnerHTML={{__html: state.content}}/>
        </>
    );
}

export default PostDetail;