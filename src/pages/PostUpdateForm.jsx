// src/pages/PostUpdateForm.jsx

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function PostUpdateForm(props) {

    // 경로 파라미터 /posts/:id/edit 값을 가지고 있는 object 얻기
    // {id:`수정할글번호`} 형식의 object 가 리턴된다. 따라서 수정할 글번호는 params.id 이다.
    const params = useParams();
    
    // 수정할 글을 상태값으로 관리한다.
    const [post, setPosts] = useState({});

    // 참조할 값을 저장해주는 hook
    let savedPost = useRef(null);    // savedPost 는 object 이고 current 라는 방에 저장된 값이 들어있다.
    // {current: null} 로 만들어진다.
    
    useEffect(()=>{
        // 컴포넌트가 활성화 되는 시점에 수정할 회원의 정보를 이용해서 수정할 회원의 정보를 로딩한다.
        axios.get(`/posts/${params.id}`)
        .then(res=>{
            setPosts(res.data)
            // useRef() 가 리턴한 object 의 current 에 초기 post 를 저장해둔다.
            savedPost.current = res.data;
        })
        .catch(err=>console.log(err));
    },[]);

    // title or author 입력란에 change Event 발생 시, 상태값을 변경하도록 한다.
    const handleChange = (e)=>{
        setPosts({
            ...post,
            [e.target.name]:e.target.value
        })
    };

    const navigate = useNavigate();

    return (
        <>
            <h1>Post Edit Form</h1>
            <div>
                <label htmlFor="id">글 번호</label>
                <input type="text" id="id" name="id" value={post.id} readOnly/>
            </div>
            <div>
                <label htmlFor="title">제목</label>
                <input type="text" id="title" name="title" onChange={handleChange} value={post.title}/>
            </div>
            <div>
                <label htmlFor="author">작성자</label>
                <input type="text" id="author" name="author" onChange={handleChange} value={post.author}/>
            </div>
            <button onClick={()=>{
                axios.put(`/posts/${post.id}`, post)
                .then(res=>{
                    alert(res.data.id + "번 글을 수정했습니다.")
                    navigate("/posts");
                })
                .catch(err=>console.log(err));
            }}>Save Edited</button>
            <button onClick={()=>{
                // useRef() 를 이용해서 저장해 두었던 초기 post 로 되돌린다.
                setPosts(savedPost.current);
            }}>Reset</button>
        </>
    )
}
export default PostUpdateForm;