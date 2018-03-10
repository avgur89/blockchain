import { css } from '../modules/dev/_helpers';

class HoverSVG {
  constructor() {
    this.$item = $('.diagram__item');

    this.init();
  }

  init() {
    this.initHover();
  }

  initHover() {
    let $svg = this.$item.find('.diagram__svg-part'),
        $text = this.$item.find('.diagram__text');

    $svg.each((index, el) => {
      let $this = $(el);

      $this.on('mouseenter', () => {
        $text.eq(index).addClass(css.active)
      });

      $this.on('mouseleave', () => {
        $text.removeClass(css.active)
      });
    });
  }
}

export default new HoverSVG();
