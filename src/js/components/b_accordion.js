import { css } from '../modules/dev/_helpers';

class Accordion {
  constructor() {
    this.$accordion = $('.accordion');
    this.$faq = $('.faq__item');

    if (this.$accordion.length && this.$faq.length) this.init();
  }

  init() {
    this.initTabs();
    this.initTabChange();
    this.initAccordion();
  }

  initTabs() {
    this.$faq.eq(0).addClass(css.active);
    this.$accordion.eq(0).addClass(css.active);
  }

  initTabChange() {
    this.$faq.on('click tap', (e) => {
      let index = $(e.target).closest('.faq__item').index();

      this.$faq.removeClass(css.active);
      this.$faq.eq(index).addClass(css.active);
      this.$accordion.removeClass(css.active);
      this.$accordion.eq(index).addClass(css.active);
    });
  }

  initAccordion() {
    this.$accordion.each((index, el) => {
      let $el = $(el),
          $btn = $el.find('button'),
          $content = $el.find('.accordion__content');

      $btn.on('click tap', function () {
        let $this = $(this);

        if ($this.hasClass(css.active)) {
          $this.removeClass(css.active).next().slideUp(300);
          return false;
        }

        $content.slideUp();
        $btn.removeClass(css.active);
        $this.addClass(css.active).next().slideDown(300);
      });
    });
  }
}

export default new Accordion();
