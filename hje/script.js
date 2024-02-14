// 초기 상태
let state = {
  notionContents: [],
  currentNotionId: null,
};

// DOM 요소 참조
const titleInput = document.getElementById("title");
const contentTextArea = document.getElementById("content");
const notionList = document.getElementById("notionList");
const saveBtn = document.getElementById("saveBtn");

// Save 버튼 클릭 시 메모 저장 또는 업데이트
function saveNotion() {
  if (state.currentNotionId !== null) {
    // 이미 있는 메모 업데이트
    state.notionContents = state.notionContents.map((notionContent) =>
      notionContent.id === state.currentNotionId
        ? {
            id: notionContent.id,
            title: titleInput.value,
            content: contentTextArea.value,
          }
        : notionContent
    );
  } else {
    // 새로운 메모 추가
    const randomNum = Math.random();
    const newNotionContent = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title: titleInput.value,
      content: contentTextArea.value,
    };
    state.notionContents.push(newNotionContent);
    state.currentNotionId = newNotionContent.id;
  }

  saveNotionToLocalStorage(state.notionContents);
  renderNotionList();
  titleInput.value = "";
  contentTextArea.value = "";
  state.currentNotionId = null; // 업데이트 후 currentMemoId를 null로 설정하여 새로운 메모 추가
}

saveBtn.addEventListener("click", () => {
  saveNotion();
});

// 로컬 스토리지를 사용하여 메모 목록 저장
function saveNotionToLocalStorage(notionContents) {
  localStorage.setItem("notionContents", JSON.stringify(notionContents));
}

// 로컬 스토리지에서 메모 목록 불러오기
function loadContentsFromLocalStorage() {
  const notionContentsJson = localStorage.getItem("notionContents");
  return notionContentsJson ? JSON.parse(notionContentsJson) : [];
}

// 메모 목록을 렌더링하는 함수
function renderNotionList() {
  notionList.innerHTML = "";
  state.notionContents.forEach((notionContent) => {
    if (notionContent && notionContent.content) {
      const div = document.createElement("div");
      let textContent =
        notionContent.title.length > 20
          ? notionContent.title.substring(0, 20) + "..."
          : notionContent.title;
      div.classList.add("listItem");
      div.setAttribute("data-id", notionContent.id);

      div.innerHTML = `
        <div class="listIn">
          <i class="fas fa-chevron-right arrow"></i>
          <div class="title">${textContent}</div>
          <div class="btnArea">
            <i class="far fa-trash-alt delete"></i>
            <i class="far fa-plus-square subListAdd"></i>
          </div>
        </div>
      `;

      notionList.appendChild(div);
    }
  });
}

// 초기화 함수
function init() {
  state.notionContents = loadContentsFromLocalStorage();
  renderNotionList();
}

function arrowToggle(e) {
  const target = e.target;
  if (target.classList.contains("fa-chevron-right")) {
    target.classList.replace("fa-chevron-right", "fa-chevron-down");
    target.parentElement.parentElement.classList.remove("closed");
  } else {
    target.classList.replace("fa-chevron-down", "fa-chevron-right");
    target.parentElement.parentElement.classList.add("closed");
  }
}

// 클릭 시 선택된 메모 불러오기
notionList.addEventListener("click", (e) => {
  if (e.target.classList.contains("title")) {
    const listItem = e.target.parentElement.parentElement;
    const notionId = parseInt(listItem.dataset.id);
    const notionContent = state.notionContents.find(
      (notionContent) => notionContent.id === notionId
    );
    if (notionContent) {
      state.currentNotionId = notionContent.id;
      titleInput.value = notionContent.title;
      contentTextArea.value = notionContent.content;
    }
  }

  if (e.target.classList.contains("arrow")) {
    arrowToggle(e);
  }
});

// 메모삭제
notionList.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("delete")) {
    if (confirm("삭제하시겠습니까?")) {
      const listItem = target.closest(".listItem");
      const id = parseInt(listItem.getAttribute("data-id"));

      state.notionContents = state.notionContents.filter(
        (notionContent) => notionContent.id !== id
      );
      saveNotionToLocalStorage(state.notionContents);
      renderNotionList();
      listItem.remove();
    }
  }

  if (target.classList.contains("subListAdd")) {
    titleInput.value = "";
    contentTextArea.value = "";
    state.currentNotionId = null;
  }
});

init();
