const category = document.querySelector(".category");
const listItem = document.querySelectorAll(".listItem");
const notionPage = document.querySelector(".notionPage");

// 새로운 list 생성
function addList(newTit) {
  const newItem = document.createElement("div");
  newItem.className = "listItem";
  newItem.innerHTML = `
    <div class="listIn">
      <i class="fas fa-chevron-right arrow"></i>
      <div class="title">${newTit}</div>
      <div class="btnArea">
        <i class="far fa-trash-alt delete"></i>
        <i class="far fa-plus-square subListAdd"></i>
      </div>
    </div>
    `;

  category.appendChild(newItem);
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

function subListAdd(e) {
  const target = e.target;
  const mainList = target.closest(".listItem");
  const subList = document.createElement("div");
  const subListItem = `
  <div class="listItem subListItem">
    <div class="listIn">
      <i class="fas fa-chevron-right arrow"></i>
      <div class="title">제목없음</div>
      <div class="btnArea">
        <i class="far fa-trash-alt delete"></i>
        <i class="far fa-plus-square subListAdd"></i>
      </div>
    </div>
  </div>
  `;
  subList.classList.add("subList");
  subList.innerHTML = subListItem;
  mainList.appendChild(subList);

  const arrow = subList.parentElement.querySelector(".arrow");
  arrow.classList.replace("fa-chevron-right", "fa-chevron-down");
  arrow.parentElement.parentElement.classList.remove("closed");
}

function notionView(categoryTitle) {
  const titleInput = notionPage.querySelector(".titleInput");
  if (titleInput) {
    titleInput.value = categoryTitle;
  } else {
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.name = "title";
    inputElement.value = categoryTitle;
    inputElement.className = "titleInput";
    inputElement.setAttribute("placeholder", "제목을 입력하세요.");
    notionPage.appendChild(inputElement);

    return inputElement; // input 요소를 반환합니다.
  }
}

category.addEventListener("click", (e) => {
  let target = e.target;
  if (target.classList.contains("delete")) {
    if (confirm("삭제하시겠습니까?")) {
      if (target.closest(".subList")) {
        target.closest(".subList").remove();
      } else {
        target.closest(".listItem").remove();
      }
    }
    if (!category.children.length > 0) {
      category.innerHTML = `
      <div class="listItem">
        <div class="listIn">
          <i class="fas fa-chevron-right arrow"></i>
          <div class="title">제목없음</div>
          <div class="btnArea">
            <i class="far fa-trash-alt delete"></i>
            <i class="far fa-plus-square subListAdd"></i>
          </div>
        </div>
      </div>
      `;
    }
    notionPage.querySelector(".titleInput").value = "";
  }

  // + 아이콘을 클릭했을 때 새로운 리스트 아이템 추가
  if (target.classList.contains("subListAdd")) {
    subListAdd(e);
  }

  if (target.classList.contains("arrow")) {
    arrowToggle(e);
  }

  if (target.classList.contains("title")) {
    // 이전에 생성된 input 요소가 있다면 삭제
    const existingInput = notionPage.querySelector(".titleInput");
    if (existingInput) {
      existingInput.remove();
    }

    // 선택된 title의 내용을 변경하기 위해 input 요소를 생성하고 추가
    const inputElement = notionView(target.textContent.trim());

    // 수정된 input 요소의 값을 선택된 title에 반영
    inputElement.addEventListener("input", () => {
      target.textContent = inputElement.value;
    });
  }
});
