// src/pages/Post.jsx

import axios from "axios";
import {v4 as uuid} from "uuid";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

function Post(props) {

    // "/posts?pageNum=x" 에서 pageNum 과 같은 query parameter 를 추출과 수정을 위한한 Hook
    const [params, setParams] = useSearchParams({pageNum:1});


    // 페이지 정보를 state 로 관리한다 
    const [pageInfo, setPageInfo] = useState({
        list:[]
    });

    const navigate = useNavigate();

    // 페이지(글 목록) 요청 함수
    const refresh = (pageNum) => {
        axios.get("/posts?pageNum=" + pageNum)
        .then(res=>{
            // 서버에서 응답한 data 는 res.data 에 들어있다.
            //console.log(res.data);
            // 상태값을 변경한다.
            setPageInfo(res.data);
            // 페이징 네비바 처리에 필요한 배열을 만들어서 
            const result = range(res.data.startPageNum, res.data.endPageNum);
            // 상태값을 변경한다.
            setPageArr(result);
        })
        .catch(err=>console.log(err));
    };

    // 컴포넌트가 활성화 되는 시점에 1 페이지 정보를 얻어온다
    useEffect(()=>{

        // refresh 의 매개변수를 무조건 1이 아닌 Params 에서 읽은 값으로 설정하도록 변경
        //refresh(1);

        // query 파라미터 값을 읽어와 본다
        let pageNum = params.get("pageNum");
        refresh(pageNum);

    },[params]);    // params 가 변경될 때 useEffect() 안에 있는 함수가 다시 호출되도록 한다.

    // navigate() 함수를 이용해서 페이지를 변경하는 함수
    const move = (pageNum) => {
        navigate(`/posts?pageNum=${pageNum}`);
    };



    // 페이징 숫자를 출력할 때 배열을 상태값으로 관리
    const [pageArr, setPageArr] = useState([]);
    // 페이징 UI 를 만들 때 사용할 배열을 리턴해주는 함수를 만들어 두고 활용용
    function range(start, end){
        const result = [];
        for(let i = start ; i <= end ; i++){
            result.push(i);
        }
        return result;
    }

    const displayStyle = {
        display: "none"
    }

    return (
        <>
            <h1>Post Page.</h1>
            <NavLink to="/posts/new">새 글 작성</NavLink>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>삭제</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.list.map(item => 
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td>
                                <NavLink to={`/posts/${item.id}/edit`}>수정</NavLink>
                            </td>
                            <td><button onClick={()=>{
                                axios.delete(`/posts/${item.id}`)
                                .then(res=>{
                                    alert(res.data.id + "번 글을 삭제했습니다.");
                                    // 현재 페이지 정보가 다시 출력되도록 한다.
                                    // refresh(pageInfo.pageNum);
                                    // refrech() 대신 아래와 같이 작업할 수도 있다.

                                    // pageInfo.list 에서 삭제된 글정보를 실제 삭제한 배열 얻어내서 상태값 변경
                                    setPageInfo({
                                        ...pageInfo,
                                        list:pageInfo.list.filter(item=>item.id !== res.data.id)
                                    });
                                })
                                .catch(err=>console.log(err));
                            }}>X</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ul className="pagination">
                <li className={`page-item ${pageInfo.startPageNum === 1 ? 'disabled':''}`}>
                    <a className="page-link" href="#" 
                    onClick={(e)=>{
                        e.preventDefault();
                        move(pageInfo.startPageNum-1);
                    }}>Prev</a>
                </li>
                {pageArr.map(num=>
                    <li className={`page-item ${pageInfo.pageNum === num?'active':''}`} key={uuid()}>
                        <a className="page-link" href="#" onClick={(e)=>{
                            e.preventDefault();// 링크의 기본 요청 기능을 막기
                            move(num);
                        }}>{num}</a>
                    </li>
                )}
                <li className={`page-item ${pageInfo.endPageNum < pageInfo.totalPageCount ? '':'disabled'}`}>
                    <a className="page-link" href="#" onClick={(e)=>{
                        e.preventDefault();
                        move(pageInfo.endPageNum+1);
                    }}>Next</a>
                </li>
            </ul>
        </>
    );
};

export default Post;

