import { state } from "./main.js";

export function deleteNotion(target) {
  const listItem = target.closest(".listItem");
  const id = parseInt(listItem.getAttribute("data-id"));

  state.notionContents = state.notionContents.filter(
    (notionContent) => notionContent.id !== id
  );
  listItem.remove();
}
