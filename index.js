// ⚡️ Import Styles
import './style.scss';
import feather from 'feather-icons';
import { passwordStrength } from 'check-password-strength';

// ⚡️ Render Skeleton
document.querySelector('#app').innerHTML = `
<div class='app-container'>
  <div class='password-strength'>
    <h3 class='title'>Password Strength Check</h3>
    <div class='password-strength__field'>
      <input type='password' data-input='' placeholder='Type password'>
      <button class='password-strength__ico hide' data-ico=''>
        ${feather.icons.eye.toSvg()}
      </button>
    </div>
    <div class='password-strength__info hide' data-levels=''>
      <ul class='password-strength__levels'>
        ${Array.from({ length: 4 }).map(() => `<li class='password-strength__level'></li>`).join('')}
      </ul>
      <p>Your password is <span data-message></span></p>
    </div>
  </div>

  <a class='app-author' href='https://github.com/nagoev-alim' target='_blank'>${feather.icons.github.toSvg()}</a>
</div>
`;

// ⚡️Create class
class App {
  constructor() {
    this.DOM = {
      input: document.querySelector('[data-input]'),
      message: document.querySelector('[data-message]'),
      levels: document.querySelector('[data-levels]'),
      btnIco: document.querySelector('[data-ico]'),
    };

    this.DOM.input.addEventListener('input', this.inputHandler);
    this.DOM.btnIco.addEventListener('click', this.togglePassword);
  }

  /**
   * @function inputHandler - Input change handler
   * @param target
   */
  inputHandler = ({ target }) => {
    if (target.value.length === 0) {
      this.DOM.levels.classList.add('hide');
      this.DOM.btnIco.classList.add('hide');
    } else {
      const { value: checkType } = passwordStrength(target.value);
      this.DOM.message.textContent = checkType.toLowerCase();
      this.DOM.levels.className = `password-strength__info ${checkType.toLowerCase().split(' ').join('-')}`;
      this.DOM.btnIco.classList.remove('hide');
    }
  };
  /**
   * @function togglePassword - Toggle password type
   * @param target
   */
  togglePassword = ({ target }) => {
    target.classList.toggle('toggle');
    target.innerHTML = target.classList.contains('toggle') ? feather.icons['eye-off'].toSvg() : feather.icons.eye.toSvg();
    this.DOM.input.type = target.classList.contains('toggle') ? 'text' : 'password';
  };
}

// ⚡️Class instance
new App();
