import { DocumentList, DocumentList } from './DocumentList/index';
import LogoHomeButton from './LogoHomeButton';

import { push } from '../utils/router';
import Button from './Button';
import Modal from './Modal';

export default function Navbar({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
  getIsOpenMap,
  onClickListItemFolderToggle,
  onClickViewAllFolderOpen,
  onFetchSetTrieSearchObject,
  onChangeSearchText,
}) {
  const $navBar = document.createElement('nav');
  $navBar.id = 'navigation';
  $navBar.className = 'open';
  $navBar.style = `position: fixed; height:100vh;`;

  const logo = new LogoHomeButton({
    $target: $navBar,
    onClick: () => push('/'),
  });

  const $topButtonGroup = document.createElement('div');
  $topButtonGroup.className = 'nav-top__button-group';

  const modal = new Modal({
    $target: $navBar,
    onChangeSearchText,
  });

  new Button({
    $target: $topButtonGroup,
    initialState: { text: '🔍 빠른 문서 검색' },
    onClick: modal.toggleOpenModal,
  });

  new Button({
    $target: $topButtonGroup,
    initialState: { text: '+ 새 문서 만들기' },
  });

  new Button({
    $target: $topButtonGroup,
    initialState: { text: '⚙️ 설정과 멤버' },
  });

  const $bottomButtonGroup = document.createElement('div');
  $bottomButtonGroup.className = 'nav-bottom__button-group';

  new Button({
    $target: $bottomButtonGroup,
    initialState: { text: '📂 모두 열고 보기' },
  });

  new Button({
    $target: $bottomButtonGroup,
    initialState: { text: '+ 새 문서 만들기' },
    onClick: onClickListItemAdd,
  });

  const documentList = new DocumentList({
    $target: $navBar,
    onClickListItemAdd,
    onClickListItemTitle,
    getIsOpenMap,
    onClickListItemFolderToggle,
    onFetchSetTrieSearchObject,
  });

  this.setState = (next) => {
    documentList.setState();
    this.render();
  };

  this.render = () => {
    $navBar.prepend($topButtonGroup);
    $navBar.appendChild($bottomButtonGroup);
    logo.render();
    $target.appendChild($navBar);
  };

  this.documentListFetch = () => documentList.fetch();
  this.documentListRender = () => documentList.render();
}
