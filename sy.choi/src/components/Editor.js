export default function Editor({
  $target,
  initialState = {
    id: null,
    title: '',
    content: '',
    documents: [],
    createdAt: '',
    updatedAt: '',
  },
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.style = 'display: flex; flex-direction:column';
  $editor.innerHTML = /*html*/ `
    <input class="editor-title' name="title" type="text />
    <div class="editor-content name="content" contentEditable="true" data-placeholder="여기에 내용을 입력해주세요" style=""></div>
  `;

  this.state = initialState;

  $target.appendChild($editor);

  let isInit = true;

  this.setState = (nextState) => {
    this.state = nextState;

    if (isInit) {
      this.render();
    }
    this.state.id !== +location.pathname.split('/')[2];
  };

  this.render = () => {
    const richContent =
      this.state.content &&
      this.state.content
        .split('<br>')
        .map((line, index, { length }) => {
          if (line.indexOf('# ') === 0) {
            return `<h1>${line.substring(2)}</h1>`;
          } else if (line.indexOf('## ') === 0) {
            return `<h2>${line.substring(3)}</h2>`;
          } else if (line.indexOf('### ') === 0) {
            return `<h3>${line.substring(4)}</h3>`;
          } else if (line.indexOf('#### ') === 0) {
            return `<h4>${line.substring(5)}</h4>`;
          } else if (line.indexOf('##### ') === 0) {
            return `<h5>${line.substring(6)}</h5>`;
          } else if (line.indexOf('###### ') === 0) {
            return `<h6>${line.substring(7)}</h6>`;
          } else {
            return `${line}${index === length - 1 ? `'<br>` : ''}`;
          }
        })
        .join('');

    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').innerHTML = richContent;
  };

  this.render();

  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };

    this.setState(nextState);
    onEditing(this.state, true);
  });

  const div = $editor.querySelector('.editor-content');

  div.onkeyup = (e) => {
    const a = document.activeElement;
    if (e.keyCode == 13) {
      if (a.lastChild && a.lastChild.nodeName != 'BR') {
        const br = document.createElement('br');
        br.id = 'br-next';
        a.appendChild(br);
      }
    }

    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };

    this.setState(nextState);
    onEditing(this.state);
  };

  div.onkeydown = (e) => {
    if (e.keyCode == 13) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const br = document.createElement('br');
      range.deleteContents();
      range.insertNode(br);
      range.setStartAfter(br);
      range.setEndAfter(br);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      return false;
    }
  };
}
