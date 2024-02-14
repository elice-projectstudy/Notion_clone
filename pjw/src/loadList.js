import { loadData } from "./saveData.js";

export let Lists = [];
const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

// 저장된 페이지 로드
document.addEventListener('DOMContentLoaded', () => {

    // 시작페이지 설정
    if (savedNotes === '[]' || !savedNotes.find(note => note.key === 'list-0')) {
        savedNotes.push({ key: 'list-0', title: '시작하기', 
                        content: "* '+ 페이지 추가': 새 페이지\n\n* '+': 하위 페이지 추가\n\n* '-': 페이지 삭제\n\n* '>': 페이지 숨김" });
        localStorage.setItem('notes', JSON.stringify(savedNotes));
    }

    loadList(savedNotes);

    const startPage = document.querySelector(`[data-list-id="list-0"]`).firstElementChild;
    startPage.classList.add('now');

    const titleInput = document.querySelector('.titleInput');
    const contentInput = document.querySelector('.contentInput');

    const data = loadData('list-0', savedNotes);
    titleInput.value = data.title;
    contentInput.value = data.content;
    
});


function loadList(savedNotes) {
    const pageList = document.querySelector('.pageList');

    // 페이지 리스트 불러오기
    savedNotes.forEach((note) => {
        // 하위페이지가 아닌 것들
        if (!note.key.includes('sublist')) {
            pageList.innerHTML += `<div class="newList" data-list-id="${note.key}">
                                        <div class="listTitle clickable">
                                            <div class="leftSide">
                                                <div class="toggle clickable">></div>
                                                <div class="listText">${note.title}</div>
                                            </div>
                                            <div class="rightSide">
                                                <div class="plusSubPage clickable">+</div>
                                                <div class="pageDelete clickable">–</div>
                                            </div>
                                        </div>
                                    </div>`;
                               
            Lists.push({
                id: note.key,
                element: pageList.lastElementChild,
                subLists: []
            });
        } 
        
        // 하위페이지 리스트
        else {
            const targetList = document.querySelector(`[data-list-id="${note.key.substring(0, 6)}"]`);
            targetList.innerHTML += `<div class="SubPageList" data-list-id="${note.key}">
                                        <div class="listTitle clickable">
                                            <div class="leftSide">
                                                <div class="toggle clickable">></div>
                                                <div class="listText">${note.title}</div>
                                            </div>
                                            <div class="rightSide">
                                                <div class="plusSubPage clickable">+</div>
                                                <div class="pageDelete clickable">–</div>
                                            </div>
                                        </div>
                                    </div>`;

            const parentListId = targetList.dataset.listId;
            const parentList = Lists.find(list => list.id === parentListId);

            parentList.subLists.push({
                id: note.key,
                element: targetList.lastElementChild
            }); 
        }
    });
}

