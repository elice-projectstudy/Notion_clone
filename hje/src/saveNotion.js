import { state } from "./main.js";

const titleInput = document.getElementById("title");
const contentTextArea = document.getElementById("content");

// Save 버튼 클릭 시 노션 저장 또는 업데이트
export function saveNotion() {
  if (state.currentNotionId !== null) {
    // 이미 있는 노션 업데이트
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
    // 새로운 노션 추가
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
  titleInput.value = "";
  contentTextArea.value = "";
  state.currentNotionId = null; // 업데이트 후 currentMemoId를 null로 설정하여 새로운 노션 추가
}

// 로컬 스토리지를 사용하여 노션 목록 저장
export function saveNotionToLocalStorage(notionContents) {
  localStorage.setItem("notionContents", JSON.stringify(notionContents));
}
