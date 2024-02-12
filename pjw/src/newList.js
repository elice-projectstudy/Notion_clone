import { Lists } from "./loadList.js";

// 페이지 추가 버튼
const plusPageBtn = document.querySelector('.plusPage');

plusPageBtn.addEventListener('click', plusPage);

function plusPage() {
    // 새 페이지 리스트 생성
    const pageList = document.querySelector('.pageList');
    pageList.innerHTML += `<div class="newList">
                                <div class="listTitle clickable">
                                    <div class="leftSide">
                                        <div class="toggle clickable">></div>
                                        <div class="listText">제목 없음</div>
                                    </div>
                                    <div class="rightSide">
                                        <div class="plusSubPage clickable">+</div>
                                        <div class="pageDelete clickable">–</div>
                                    </div>
                                </div>
                            </div>`;
    
    const newList = pageList.lastElementChild;
    const id = `list-${Lists.length}`;

    // 리스트의 ID를 데이터 속성으로 추가
    newList.dataset.listId = id;

    Lists.push({
        id: id,
        element: newList,
        subLists: []
    });
}
