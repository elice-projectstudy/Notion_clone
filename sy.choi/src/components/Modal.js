import { push } from '../utils/router';

export default function Modal({ $target, onChangeSearchText }) {
  const $modal = document.createElement('div');
  $modal.id = 'modal';

  this.state = { isOpen: false, autoDocuments: [] };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $modal.innerHTML = `
    <input id="searchInput" type="text" placeholder = "여기에 찾을 문서를 입력하세요" autocomplete="off" / >
    <ul sylte="margin-top: 12px;"></ul>
  `;

  this.render = () => {
    $modal.style = `${this.state.isOpen ? '' : 'display:none'}`;

    $target.appendChild($modal);
  };
  this.render();

  this.toggleOpenModal = () =>
    this.state.isOpen ? this.closeModal() : this.openModal();

  this.openModal = () => this.setState({ ...this.state, isOpen: true });
  this.closeModal = () => this.setState({ ...this.state, isOpen: false });

  const $autoDocumentLists = $modal.querySelector('ul');

  const $input = $modal.querySelector('#searchInput');
  $input.addEventListener('input', () => {
    const nextAutoDocuments = onChangeSearchText($input.value);
    this.setAutoDocuments(nextAutoDocuments);
  });

  this.setAutoDocuments = (nextAutoDocuments = []) => {
    const reget = /(?! - ID: )\d+/g;
    this.state.autoDocuments = nextAutoDocuments;
    $autoDocumentLists.innerHTML = `
        ${this.state.autoDocuments
          .map((title) => {
            const matchId = title.match(regex);

            return `<li id="auto-completion-link" data-documentid='${matchId}'>${title}</li>`;
          })
          .join('')}
      `;
  };
  $modal.addEventListener('mouseleave', this.closeModal);

  $modal.querySelector('ul').addEventListener('click', (e) => {
    this.closeModal();

    const { documentid } = e.target.dataset;
    if (documentid !== 'null') {
      push(`/documents/${documentid}`);
    }
  });
}
