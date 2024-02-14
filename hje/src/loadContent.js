import { state } from "./main.js";

const titleInput = document.getElementById("title");
const contentTextArea = document.getElementById("content");

export function loadContent(target) {
  const listItem = target.parentElement.parentElement;
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
