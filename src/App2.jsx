// App2.jsx

import { useState } from "react";

function App(){

    const [names,setNames] = useState(["김구라", "해골", "원숭이"]);

    // 숫자를 상태값으로 관리 할 때 새로운 숫자를 넣어주고
    // 문자를 상태값으로 관리 할 때 새로운 문자를 넣어주고
    // 배열 및 오브젝트 역시 상태값을 변화시킬 때 새로운 배열 및 오브젝트를 넣어주면된다.
    const handleAdd = ()=>{
        setNames([...names, "주뎅이"])
    }
    
    return(
        <div className="container">
            <h1>배열을 state 로 관리해 보기</h1>
            <button onClick={handleAdd}>추가</button>
            <ul>
                {names.map(item=> <li>{item}</li>)}
            </ul>
        </div>
    )
}

export default App;