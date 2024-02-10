// 카테고리 추가 함수
function addCategory(parentCategory) {
    var categoryName = prompt("Enter category name:");
    if (categoryName) {
      var categoryList;
      if (parentCategory) {
        categoryList = parentCategory.querySelector("ul");
      } else {
        categoryList = document.getElementById("category-list");
      }
  
      var li = document.createElement("li");
      li.className = "category";
      li.textContent = categoryName;

      // Add Subcategory 버튼
      var addSubCategoryButton = document.createElement("button");
      addSubCategoryButton.textContent = "+";
      addSubCategoryButton.onclick = function() {
        addCategory(li);
      };
      li.appendChild(addSubCategoryButton);
        
      // Delete 버튼 (최상위 카테고리에만 표시)
      if (!parentCategory) {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.onclick = function() {
          li.remove();
        };
        li.appendChild(deleteButton);
      }
  
      // Delete Subcategory 버튼 (하위 카테고리에만 표시)
      if (parentCategory) {
        var deleteSubCategoryButton = document.createElement("button");
        deleteSubCategoryButton.textContent = "🗑️";
        deleteSubCategoryButton.onclick = function() {
          var subcategories = li.querySelectorAll(".category");
          if (subcategories.length > 0) {
            var confirmDelete = confirm("This category has subcategories. Deleting it will also delete its subcategories. Are you sure?");
            if (confirmDelete) {
              subcategories.forEach(function(subcategory) {
                subcategory.remove();
              });
              li.remove();
            }
          } else {
            li.remove();
          }
        };
        li.appendChild(deleteSubCategoryButton);
      }
  
      // 하위 카테고리 목록 추가
      var subCategoryList = document.createElement("ul");
      li.appendChild(subCategoryList);
  
      categoryList.appendChild(li);
    }
  }
  
  // 게시글 작성 폼 렌더링 함수
  function renderPostForm(categoryName) {
    // 오른쪽 화면에 게시글 작성 폼을 렌더링하는 코드 작성
    document.getElementById("post-form").innerHTML = `
      <h2>Post (${categoryName})</h2>
      <form id="post-form">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title"><br>
        <label for="content">Content:</label><br>
        <textarea id="content" name="content" rows="4" cols="50"></textarea><br>
      </form>
    `;
  }
  
  // 추가 버튼에 클릭 이벤트 리스너 추가
  var addButton = document.getElementById("add-category-btn");
  addButton.addEventListener("click", function() {
    addCategory(null);
  });
  
  // 카테고리 목록에 대한 이벤트 위임
  document.getElementById("category-list").addEventListener("click", function(event) {
    var target = event.target;
    if (target.tagName === "LI") {
      renderPostForm(target.textContent.trim());
    }
  });
