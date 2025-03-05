//App2.jsx

/*
    fetch() 함수 대신에 axios 사용해 보기 
    (앞으로 이것만 쓰게 될 일이 많을 것것)
*/

import axios from "axios";
import { useEffect, useState } from "react";

function App(){

    // 글 목록을 상태값으로 관리하기 위해 (초기값은 빈 배열)
    const [posts, setPosts] = useState([]);

    // 글 목록 데이터를 받아오는 함수 
    const refresh = ()=>{
        axios.get("/v1/posts")
        .then(res=>{
            // res object 의 data 라는 방에 서버가 응답한 데이터가 들어있다.
            setPosts(res.data);
        })
        .catch(err=>console.log(err));
    }
    // 사실 이곳은 model 및 ui 가 변결될 때마다 호출되는 부분이기 때문에 적절하지 않다.
    //refresh();
    useEffect(()=>{
        refresh();
    },[]);
    /*
        useEffect(함수, 배열열)
        
        배열을 비워두면 App 컴포넌트가 초기화 되는 시점에 최초 1번만 호출된다
        비워두지 않으면... 즉 어떤 state 값을 넣어주면 해당 state 가 변경될 때마다 호출횓나.
    */


    return (
        <div className="container">
            <h1>새 글 작성 폼</h1>
            <form action="/v1/posts" onSubmit={(e)=>{
                e.preventDefault(); // 폼 전송 막기
                
                // 요청 url
                const url = e.target.action;
                // FormData 객체
                const formData = new FormData(e.target);

                // 폼에 입력한 내용을 바탕으로 json 을 만들어낸다. 어떻게?
                // 폼에 입력한 내용을 object 변환
                const obj = Object.fromEntries(formData);
                // object 에 있는 내용을 이용해서 JSON 문자열 만들어내기
                const json = JSON.stringify(obj);

                // fetch() 함수를 이용해서 페이지 전환 없이 post 방식 요청하면서 json 문자열 전송하기
                axios.post("/v1/posts",obj)
                /*
                    - post(요청경로,object)
                    - object 에 담긴 내용이 자동으로 json 문자열로 변경되어서 서버에 전달된다다
                */
                .then(res =>{
                    // res 는 object 인데 응답에 관련된 여러가지 정보가 들어있다.
                    console.log(res);
                    // 서버가 응답한 json 문자열이 object 혹은 array 로 변환되어서 res.data 라는 방에 들어 있다.
                    console.log(res.data);
                    refresh();
                })
                .catch(error=>{
                    console.log(error);
                });
            }}>
                <input type="text" name="title" placeholder="제목 입력..."/>
                <input type="text" name="author" placeholder="작성자 입력..."/>
                <button type="submit">저장</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(item => 
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td><button onClick={()=>{
                                // 수정할 제목을 입력 받는다.
                                const title = prompt(item.id + " 번글의 수정할 제목 입력");
                                // 수정할 정보를 이용해서 object 를 만든다.
                                const obj = {
                                    title: title,
                                    author: item.author
                                };
                                // fetch 함수를 이용해 PUT 방식으로 변경 정보를 json으로 요청한다.
                                axios.put("/v1/posts/"+item.id,obj)
                                .then(res=>{
                                    console.log(res.data);
                                    refresh();
                                })
                                .catch(err=>{
                                    console.log(err);
                                })
                            }}>수정</button></td>
                            <td><button onClick={()=>{
                                axios.delete("/v1/posts/"+item.id)
                                .then(res=>{
                                    alert(res.data.id + " 번 글을 삭제했습니다.");
                                    refresh();
                                })
                                .catch(err=>console.log(err));
                            }}>X</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default App;