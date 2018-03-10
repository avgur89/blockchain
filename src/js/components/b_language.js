import { css, $body } from '../modules/dev/_helpers';

class Language {
  constructor() {
    this.$dropdown = $('.language');
    this.$title = this.$dropdown.find('.language__title');

    if (this.$dropdown.length) this.init();
  }

  init() {
    this.initDropdownToggle();
    this.initDropdownChange();
  }

  initDropdownToggle() {
    let $title = $('.language__title'),
        $list = $('.language ul');

    $body.on('click tap', function (e) {

      if ($(e.target).closest($title).length) {
        $title.toggleClass(css.active);
        $list.slideToggle();
      } else {
        $title.removeClass(css.active);
        $list.slideUp();
      }
    });
  }

  initDropdownChange() {
    let $item = this.$dropdown.find('.language__item'),
        $text = this.$dropdown.find('span');

    $item.on('click tap', function () {
      let $this = $(this);

      $item.removeClass(css.active);
      $this.addClass(css.active);
      $text.text($this.text());
    });
  }
}

export default new Language();
