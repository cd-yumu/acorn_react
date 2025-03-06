// Child.jsx

function Child(){
    return (
        <div>
            <h2>Child Component.</h2>
            <button onClick={(e)=>{
                e.target.innerText="버튼을 눌렀네...";
            }}>눌러보셈</button>
        </div>
    )
}

export default Child;