let boardStr = localStorage.getItem("boards");

// console.log(boardsStr);
if(boardStr === null){
    const listStr = JSON.stringify([]);
    localStorage.setItem("boards", listStr);
    boardStr = listStr;
}