document.addEventListener('click', (e) => {
    const listTitle = e.target.closest('.listTitle');
    if (listTitle) {
        // 현재 페이지 표시
        nowPage(listTitle);

        const targetId = listTitle.parentNode.dataset.listId;
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const titleInput = document.querySelector('.titleInput');
        const contentInput = document.querySelector('.contentInput');

        // 데이터 로드
        const data = loadData(targetId, savedNotes);
        titleInput.value = data.title;
        contentInput.value = data.content;
        
        // 제목 저장
        titleInput.addEventListener('keyup', function() {
            saveData(targetId, this.value, contentInput.value, savedNotes);

            // 선택한 리스트 제목 변경
            changeTitle(this.value);
        });

        // 내용 저장
        contentInput.addEventListener('keyup', function() {
            saveData(targetId, titleInput.value, this.value, savedNotes);
        });
    }
});


export function nowPage(listTitle) {
    const previousNowElement = document.querySelector('.listTitle.now');
    if (previousNowElement) {
        previousNowElement.classList.remove('now');
    }

    listTitle.classList.add('now');
}


export function loadData(targetId, savedNotes) {
    const check = savedNotes.findIndex(note => note.key === targetId);
    let data = { title: '', content: '' };

    // targetId가 이미 저장되어 있다면 로드
    if (check !== -1) {
        data.title = savedNotes[check].title;
        data.content = savedNotes[check].content;
    } 

    return data;
}


function saveData(targetId, title, content, savedNotes) {
    const check = savedNotes.findIndex(note => note.key === targetId);

    if (check !== -1) {
        savedNotes[check] = { key: targetId, title: title, content: content };
    } 
    else {
        savedNotes.push({ key: targetId, title: title, content: content });
    }

    localStorage.setItem('notes', JSON.stringify(savedNotes));
}


function changeTitle(title) {
    const nowList = document.querySelector('.now');
    const changeEl = nowList.querySelector('.listText');
    changeEl.innerHTML = title;
}

