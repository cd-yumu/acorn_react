// components/list.jsx

import {v4 as uuid} from "uuid"

// props 에는 names, onDelete 가 전달된다. 
// {names: [], onDelete: ()=>{}}
function List(props) {  // Object 의 구조 분해 할당을 적용할 수 있다.
    return (
        <>
            <h2>목록 입니다</h2>
            <ul>
                {props.names.map((item, index) => 
                    <li key={uuid()}>{item} <button onClick={()=>{
                        // 부모가 전달해준 함수를 호출하면서 삭제할 index 를 전달한다.
                        props.onDelete(index)
                    }}>x</button></li>
                )}
            </ul>
        </>
    )
}

export default List;