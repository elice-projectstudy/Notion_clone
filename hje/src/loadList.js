import { state } from "./main.js";

// 로컬 스토리지에서 노션 목록 불러오기
export function loadContentsFromLocalStorage() {
  const notionContentsJson = localStorage.getItem("notionContents");
  return notionContentsJson ? JSON.parse(notionContentsJson) : [];
}

// 노션 목록을 렌더링하는 함수
export function renderNotionList() {
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
