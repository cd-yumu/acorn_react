import axios from "axios";
import {v4 as uuid} from "uuid";    // key 값을 얻어내기 위한 함수 import
import { useEffect, useState } from "react";
/*
    npm install bootstrap 으로 설치하고
    아래와 같이 import 하면 전역에서 사용가능한 BootStrap CSS 가 로딩된다.
*/
import "bootstrap/dist/css/bootstrap.css"

function App(){

    // 페이지 정보를 state 로 관리한다 
    const [pageInfo, setPageInfo] = useState({
        list:[]
    });

    // 페이지(글 목록) 요청 함수
    const refresh = (pageNum) => {
        axios.get("/posts?pageNum=" + pageNum)
        .then(res=>{
            // 서버에서 응답한 data 는 res.data 에 들어있다.
            console.log(res.data);
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
        refresh(1);
    },[]);

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
        <div className="container">
            <h1>글 목록 입니다</h1>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.list.map(item => 
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ul className="pagination">
                <li className={`page-item ${pageInfo.startPageNum === 1 ? 'disabled':''}`}>
                    <a className="page-link" href="#" 
                    onClick={(e)=>{
                        e.preventDefault();
                        refresh(pageInfo.startPageNum-1);
                    }}>Prev</a>
                </li>
                {pageArr.map(num=>
                    <li className={`page-item ${pageInfo.pageNum === num?'active':''}`} key={uuid()}>
                        <a className="page-link" href="#" onClick={(e)=>{
                            e.preventDefault();// 링크의 기본 요청 기능을 막기
                            refresh(num);
                        }}>{num}</a>
                    </li>
                )}
                <li className={`page-item ${pageInfo.endPageNum < pageInfo.totalPageCount ? '':'disabled'}`}>
                    <a className="page-link" href="#" onClick={(e)=>{
                        e.preventDefault();
                        refresh(pageInfo.endPageNum+1);
                    }}>Next</a>
                </li>
            </ul>
        </div>
    )
}

export default App;