import { push } from '../utils/router';
import Button from './Button';

export default function NestedDocuments({
  $target,
  onClickListItemAdd,
  onCLickListItemTitle,
}) {
  const $nestedDocuments = document.createElement('div');
  $nestedDocuments.id = 'document-list';
  $target.appendChild($nestedDocuments);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const setIsOpenDocuments = (documents) => {
    return (
      documents.length &&
      documents.map(({ id, title, documents }) => ({
        id,
        title,
        documents: setIsOpenDocuments(documents),
        isOpen: true,
      }))
    );
  };

  this.render = () => {
    const documentsWithStatus = setIsOpenDocuments(this.state);

    $nestedDocuments.innerHTML = `
    ${
      this.state.length > 0
        ? `<div class="document-list__title"><span></span></div>`
        : ''
    }
    ${getTreeMarkup(documentsWithStatus)}`;
  };

  const getTreeMarkup = (documents = []) => {
    return documents.length
      ? `<ul class="document-list__ul">
      ${documents
        .map(
          ({ id, title, documents, isActive, isOpen }) =>
            `<li class="document-list__item" data-id='${id}'>
            <div class="document-list__open-button" data-id='${id}'>
              ${documents.length ? (isOpen ? '📂' : '📁') : '🗒️'}
            </div>
            <span data-id='${id} class="${isActive ? 'active' : ''}">
              ${title}
            </span>
            <button class="document-list__add-button">+</button>
          </li>
          ${isOpen ? getTreeMarkup(documents) : ''}`
        )
        .join('')}
      </ul>`
      : '';
  };

  $nestedDocuments.addEventListener('click', async ({ target }) => {
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
