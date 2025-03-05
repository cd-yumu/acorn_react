import { useEffect, useState } from "react";

function App(){

    // 글 목록을 상태값으로 관리하기 위해 (초기값은 빈 배열)
    const [posts, setPosts] = useState([]);

    // 글 목록 데이터를 받아오는 함수 
    const refresh = ()=>{
        // GET 방식 /posts 요청하기기
        fetch("/v1/posts")
        .then(res=>res.json())
        .then(data=>{
            // 서버로부터 받아온 배열로 상태값을 변경
            /*
                state 를 변경하는 함수를 호출하면 App 함수가 다시  (무한 요청중)
                useState([]) 함수가 리턴해주는 배열의 0 번 방에는 새로운 posts 배열이 들어있다.
            */
            setPosts(data);
        })
        .catch(error=>{
            console.log(error);
        });
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
                // json 확인용
                //console.log(json);

                // fetch() 함수를 이용해서 페이지 전환 없이 post 방식 요청하면서 json 문자열 전송하기
                fetch(url, {
                    method:"POST", 
                    headers:{"Content-Type":"application/json"},
                    body:json
                })
                .then(res=>res.json())
                .then(data=>{
                    // data 는 서버에서 응답한 json 문자열이 object   로 변경되어서 전달된다.
                    console.log(data);
                    refresh();
                })
                .catch(error=>{
                    console.log(error);
                })
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
                                fetch("/v1/posts/"+item.id, {
                                    method:"PUT",  // id 를 제외한 전체 수정 시 사용 (PUT)
                                    headers:{"Content-Type":"application/json"},
                                    body:JSON.stringify(obj)    // object 를 json 문자열로 변경
                                })
                                .then(res=>res.json())
                                .then(data=>{
                                    console.log(data);
                                    refresh();
                                });
                            }}>수정</button></td>
                            <td><button onClick={()=>{
                                fetch("/v1/posts/"+item.id,{
                                    method:"DELETE"
                                })
                                .then(res=>res.json())
                                .then(data=>{
                                    // data 는 삭제한 post 이다.
                                    alert(data.author + " 님이 작성한 글을 삭제했습니다.");
                                });
                                refresh();
                            }}>X</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default App;