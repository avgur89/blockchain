import { TimelineMax, TweenMax } from 'gsap';
import { css } from '../modules/dev/_helpers';

class Dodecagon {
  constructor() {
    this.svg = document.querySelector('.ico__svg-wrap svg');
    this.$item = $('.timeline_diagram .timeline__item');
    this.$info = $('.ico__info-item');
    this.steps = [];
    this.percents = [];

    this.init();
  }

  init() {
    this.initProgress();
    this.initSlider();
    this.initFirstStep();
  }

  initSlider() {
    this.$item.each((index, el) => {
      let $el = $(el);

      this.steps.push($el.attr('data-step'));
      this.percents.push($el.attr('data-percent'));

      $el.on('click tap', () => {
        if ($el.hasClass(css.active)) return false;

        this.$item.removeClass(css.active);
        this.$info.removeClass(css.active);
        this.setStep(this.steps[index]);
        this.setPercent(this.percents[index]);
        $el.addClass(css.active);
        this.$info.eq(index).addClass(css.active);
      });
    });
  }

  initFirstStep() {
    this.setStep(this.steps[0]);
    this.setPercent(this.percents[0]);
  }

  initProgress() {
    this.circle = this.svg.querySelector("circle");
    this.dodecagon = this.svg.querySelector(".dodecagon--solid");
    this.setOffset(this.circle);
    this.setOffset(this.dodecagon);

    TweenMax.set([this.circle, this.dodecagon], {
      rotation: -90.1,
      transformOrigin: "50% 50%"
    });

    this.svg.style.opacity = 1;
  }

  getCircleTotalLength() {
    let r = this.getAttribute('r');
    let circleLength = 2 * Math.PI * r;
    return circleLength;
  }

  setOffset(el) {
    if (el.tagName === 'circle') {
      el.getTotalLength = this.getCircleTotalLength.bind(el);
    }
    let total = el.totalLength = el.getTotalLength();
    el.style.strokeDasharray = total;
    el.style.strokeDashoffset = total;
  }

  drawStroke(el, percent) {
    let total = el.totalLength;
    el.style.opacity = 1;
    TweenMax.set(el, {
      clearProps: "opacity"
    });

    let percentOffset = Math.ceil(total - total / 100 * percent);
    percentOffset = percentOffset < 0 ? 0 : percentOffset;
    percentOffset = percentOffset > total ? total : percentOffset;

    TweenMax.to(el, .8, {
      strokeDashoffset: percentOffset,
      ease: Power2.easeInOut
    });
  }

  setPercent(percent) {
    this.drawStroke(this.circle, percent);
    return this;
  }

  setStep(step) {
    step = step >= 6 ? 6 : Math.abs(step);
    let percent = 100 / 6 * step;
    this.drawStroke(this.dodecagon, percent);
    return this;
  }
}

export default new Dodecagon();
