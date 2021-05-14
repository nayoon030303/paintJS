const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode");
const save = document.querySelector("#jsSave");
const INITAL_COLOR = "#2c2c2c";
//pixel을 다루는 윈도우의 크기
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle = INITAL_COLOR; //색성
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5; //선 두께


let painting = false;
let fiiling = false;

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
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
}

function handleRangeChange(event){
    const range =event.target.value;
    ctx.lineWidth = range;
   
}

function handleModeClick(event){
    if(fiiling){
        fiiling = false;
        mode.innerText = "Fill";
    }else{
        fiiling = true;
        mode.innerText = "Paint";
        

    }
}

function handleCanvasClick(){
    
    if(fiiling){
        console.log(ctx.fillSyle);
        //ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function hancleCM(event){
    event.preventDefault(); //event무시
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[DRAW]";
    link.click();
    console.log(link);
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",hancleCM); //우클릭
}


Array.from(colors).forEach(color=>{
    color.addEventListener("click",hadleColorClick);
});

if(save){
    save.addEventListener("click",handleSaveClick);
}

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}