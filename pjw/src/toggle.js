document.addEventListener('click', (e) => {
    if (e.target.classList.contains('toggle')) {
        // 타겟리스트 찾기
        const targetList = e.target.closest('.listTitle');
        toggleBtn(targetList);
    }
});

function toggleBtn(targetList) {
    // 형제 요소들 가져오기
    const siblings = Array.from(targetList.parentElement.children);

    // 현재 상태 확인
    const isVisible = !siblings.some(sibling => sibling.classList.contains('hidden'));

    // 형제 요소들에 hidden 클래스 추가/제거
    siblings.forEach(sibling => {
        if (sibling !== targetList) { // 타겟리스트는 제외
            if (isVisible) {
                sibling.classList.add('hidden');
            } else {
                sibling.classList.remove('hidden');
            }
        }
    });
}