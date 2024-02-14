import { Lists } from "./loadList.js";

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('plusSubPage')) {
        // 타겟리스트 찾기
        const targetList = e.target.closest('.newList');
        plusSubPage(targetList, 'SubPageList');
    }
});

function plusSubPage(targetList, className) {
    // 하위리스트 생성
    targetList.innerHTML += `<div class="${className}">
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
    
    const newSubList = targetList.lastElementChild;
    const parentListId = targetList.dataset.listId;
    const parentList = Lists.find(list => list.id === parentListId);
    const id = `${parentListId}/sublist-${parentList.subLists.length + 1}`;
    
    newSubList.dataset.listId = id;

    parentList.subLists.push({
        id: id,
        element: newSubList
    }); 
}
