import {css} from '../modules/dev/_helpers';

class Form {
  constructor() {
    this.$form = $('form');
    this.$input = this.$form.find('.form-input');
    this.$textarea = this.$form.find('.form-textarea');

    this.init();
  }

  init() {
    this.checkFill();
  }

  checkFill() {
    this.$input.each(function () {
      checkInput($(this));
    });
    this.$input.blur(function () {
      checkInput($(this));
    });

    function checkInput(el) {
      if (el.val() !== '') {
        el.addClass(css.active);
      } else {
        el.removeClass(css.active);
      }
    }
  }
}

export default new Form();
