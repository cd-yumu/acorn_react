import React from 'react';
/*
    특정 componenet 에만 적용될 외부 css 파일을 만들 때는 xxx.module.css 형태로 만들어야한다.
    import 된 myCss 는 object 이다.
    - object 의 구조
    {클래스명: "변경된 클래스명", ... }

*/
import myCss from './css/study.module.css';

function Study(props) {
    // myCss 는 object 이다.
    console.log(myCss);

    return (
        <div>
            <h2 className={myCss['my-color']}>Study Page.</h2>
            <p className={myCss['my-color'] +" "+ myCss['bg-yellow']}>p1</p>
            <p className={`${myCss['my-color']} ${myCss['bg-yellow']}`}>p2</p>
        </div>
    );
}

export default Study;