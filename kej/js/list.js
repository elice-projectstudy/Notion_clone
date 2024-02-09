let boardStr = localStorage.getItem("boards");

// console.log(boardsStr);
if(boardStr === null){
    const listStr = JSON.stringify([]);
    localStorage.setItem("boards", listStr);
    boardStr = listStr;
}

const boardsObj = JSON.parse(boardsStr);
console.log(boardsObj);

// const template = () => {
//     return`
//     <tr>
//         <td>번호</td>
//         <td>글제목</td>
//         <td>작성자</td>
//         <td>등록일</td>
//         <td>조회수</td>
//     </tr>
//     `;
// };
// console.log(template());

const template = (index, objValue) => {
    return `
        <tr>
            <td>${index +1}</td>
            <td><a href="/board/view.html?index=${objValue.index}">${objValue.subject}</td>
            <td>${objValue.writer}</td>
            <td>${objValue.date}</td>
            <td>${objValue.views}</td>
        </tr>
    `;
};

const tbody = document.querySelector("tbody");

for (let i = 0; i < boardsObj.length; i++){
    console.log(template(i, boardsObj[i]));
}