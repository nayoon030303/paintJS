const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

//pixel을 다루는 윈도우의 크기
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; //색성
ctx.lineWidth = 2.5; //선 두께

let painting = false;

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    //path is a line
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
       ctx.lineTo(x,y); 
       ctx.stroke(); //stroke 선을 그린다
    }
}

function stopPainting(){
    painting = false;
}

function onMouseDown(event){
    painting = true;
}

function hadleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle=color;
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
}
Array.from(colors).forEach(color=>{
    color.addEventListener("click",hadleColorClick);
});