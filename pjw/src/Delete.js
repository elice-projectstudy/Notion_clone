document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pageDelete')) {

        // 데이터 삭제
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const targetListId = e.target.closest('.listTitle').parentNode.dataset.listId;      
        const filteredNotes = savedNotes.filter(note => !note.key.includes(targetListId));
        localStorage.setItem('notes', JSON.stringify(filteredNotes));

        // html 삭제
        const targetElement = e.target.closest('.listTitle').parentNode;
        targetElement.remove();
    }
})