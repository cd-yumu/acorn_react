// 우리가 만든 css 파일 import 하기
// import 된 css 는 모든 Component 에서 공통적으로 사용할 수 있다.
import "./index.css"
import "bootstrap/dist/css/bootstrap.css"
import "./components/Play.jsx"
import Play from "./components/Play.jsx";
import Study from "./components/Study.jsx";
import Game from "./components/Game.jsx";

function App(){

    return (
        <div className="container">
            <h1>인덱스 페이지</h1>
            <Play></Play>
            <Study></Study>
            <Game/>
        </div>
    )
}

export default App;