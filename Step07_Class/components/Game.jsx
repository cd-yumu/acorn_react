// src/components/game.jsx
import React, { useState } from 'react';

import myCss from './css/study.module.css'

// classnames 를 import 해서 cn 이라는 이름으로 사용
// inport cn from 'classnames'

// 외부 css 를 바인딩해서 사용하게 도와주는 binder inport
import binder from 'classnames/bind'

// binder 를 이용해서 myCss 를 바이딩하여 cx 라는 이름의 함수로 사용
const cx = binder.bind(myCss);

function Game(props) {

    const [array, setArray] = useState(["my-color", "bg-yellow"]);
    const [isYellow, setYellow] = useState(false);
    const [style, setStyle] = useState({
        "my-color":false,
        "bg-yellow":false
    })

    const handleChange = (e)=>{
        // 변화된 checkbox 의 name 속성과 체크 여부 얻어내기
        const {name, checked} = e.target;   // e.target 을 구조 분해 할당
        setStyle({
            ...style,
            [name]:checked
        });     // 기존 값은 유지하되 변경 사항만 적용
    }

    return (
        <div>
            <h2 className={cx('my-color')}>Game Page.</h2>
            <p className={cx('my-color', 'bg-yellow')}>p1</p>
            <p className={cx(['my-color', 'bg-yellow'])}>p2</p>
            <p className={cx(array)}>p3</p>
            <p className={cx({'my-color':true, 'bg-yellow':true})}>p4</p>
            <p>
                bg-yellow <input type="checkbox" onChange={(e)=>{
                    // 현재 checkbox 의 상태를 isYellow 에 반영한다.
                    setYellow(e.target.checked);
                }}/>
                <p className={cx({'bg-yellow':isYellow})}>p5</p>
            </p>


            <p>my-color <input type="checkbox" name="my-color" onChange={handleChange}/></p>
            <p>bg-yellow <input type="checkbox" name='bg-yellow' onChange={handleChange}/></p>
            <p className={cx(style)}>p6</p>

            
            
        </div>
    );
}

export default Game;