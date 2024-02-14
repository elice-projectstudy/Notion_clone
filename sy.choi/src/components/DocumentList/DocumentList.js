import { request } from '../../utils/api';

export default function DocumentList({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
  onClickListItemFolderToggle,
  getIsOpenMap,
  isOpenAll = false,
  onFetchSetTrieSearchObject = () => {},
}) {
  const $documentList = document.createElement('div');
  $documentList.id = 'document-list';
  $target.appendChild($documentList);

  this.state = [];

  let isInit = true;

  this.setState = async (nextState) => {
    if (isInit) {
      await this.fetch();
      isInit = false;
    } else if (nextState) {
      this.state = nextState;
    }

    this.render();
    onFetchSetTrieSearchObject(this.state);
  };

  const setIsOpenDocuments = (documents) => {
    return (
      documents.length &&
      documents.map(({ id, title, documents }) => ({
        id,
        title,
        documents: setIsOpenDocuments(documents),
        isOpen: isOpenAll ? true : getIsOpenMap()[id] ? true : false,
      }))
    );
  };

  this.render = () => {
    const documentsWithStatus = setIsOpenDocuments(this.state);

    $documentList.innerHTML = `
    <div class="document-list__title">
      <span></span>
      <button class="document-list__add-button">+</button>
    </div>
    ${getTreeMarkUp(documentsWithStatus)}
    `;
  };

  const getTreeMarkUp = (documents = []) => {
    return documents.length
      ? `
    <ul class="document-list__ul">
      ${documents
        .map(
          ({ id, title, documents, isActive, isOpen }) => `
      <li class="document-list__item" data-id="${id}">
        <div class="document-list__open-button" data-id='${id}'>
          ${documents.length ? (isOpen ? '📂' : '📁') : '🗒️'}
        </div>
        <span data-id='${id}' class="${isActive ? 'active' : ''}'>
          ${title}
        </span>
        <button class="document-list__add-button">+</button>
      </li>
      ${isOpen ? getTreeMarkUp(documents) : ''}
      `
        )
        .join('')}
    </ul>
    `
      : '';
  };

  this.fetch = async () => {
    const documents = await request('/documents');
    this.setState(documents);
  };

  $documentList.addEventListener('click', async ({ target }) => {
    const { id } = target.dataset;
    switch (target.tagName) {
      case 'BUTTON':
        onClickListItemAdd(id);
        break;

      case 'LI':
        onCLickListItemTitle(id);
        break;

      case 'SPAN':
        onCLickListItemTitle(id);
        break;

      case 'DIV':
        onCLickListItemTitle(id);
        break;

      default:
        break;
    }
  });
}
