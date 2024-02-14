import { loadContentsFromLocalStorage, renderNotionList } from "./loadList.js";
import { saveNotion, saveNotionToLocalStorage } from "./saveNotion.js";
import { deleteNotion } from "./deleteNotion.js";
import { loadContent } from "./loadContent.js";

// 초기 상태
export let state = {
  notionContents: [],
  currentNotionId: null,
};

// DOM 요소 참조
const titleInput = document.getElementById("title");
const contentTextArea = document.getElementById("content");
const notionList = document.getElementById("notionList");

// 초기화 함수
function init() {
  state.notionContents = loadContentsFromLocalStorage();
  renderNotionList();
}

function arrowToggle(target) {
  const targetClass = target.classList;
  const targetparent = target.parentElement.parentElement;
  if (targetClass.contains("fa-chevron-right")) {
    targetClass.replace("fa-chevron-right", "fa-chevron-down");
    targetparent.classList.remove("closed");
  } else {
    targetClass.replace("fa-chevron-down", "fa-chevron-right");
    targetparent.classList.add("closed");
  }
}

// 노션삭제
notionList.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("delete")) {
    if (confirm("삭제하시겠습니까?")) {
      deleteNotion(target);
      saveNotionToLocalStorage(state.notionContents);
      renderNotionList();
    }
  }

  // 삭제 후 input 초기화
  if (target.classList.contains("subListAdd")) {
    titleInput.value = "";
    contentTextArea.value = "";
    state.currentNotionId = null;
  }
});

// 클릭 시 선택된 노션 불러오기
notionList.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("title")) {
    loadContent(target);
  }

  if (target.classList.contains("arrow")) {
    arrowToggle(target);
  }
});

// 저장버튼 클릭
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {
  saveNotion();
  renderNotionList();
});

init();
