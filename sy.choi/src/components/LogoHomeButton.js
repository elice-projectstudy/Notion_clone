export default function LogoHomeButton({ $target, onClick }) {
  const $logoHome = document.createElement('div');
  const $heading = document.createElement('h1');
  $logoHome.id = 'logo-home';
  $heading.textContent = 'Notion';

  this.render = () => {
    $logoHome.appendChild($heading);
    $target.prepend($logoHome);
  };

  $logoHome.addEventListener('click', onClick);
}
