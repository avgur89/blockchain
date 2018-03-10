import { TweenMax } from 'gsap';
import ScrollMagic from 'ScrollMagic';
import 'animation.gsap';
import SplitText from '../modules/dep/SplitText';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import {css, Resp} from '../modules/dev/_helpers';

class ScrollTrigerAnim {
  constructor() {
    this.$section = $('[data-section-caption]');
    this.$nav = $('.header__nav');
    this.$ul = $('.header__nav > ul');
    this.$nextSection = $('.screen__next-section');
    this.$getTop = $('.get-top');
    this.$table =$('table');
    this.items = [];
    this.itemsOffsetTop = [];
    this.$anchor = {};
    this.count = 0;

    if (this.$section.length && !Resp.isMobile) this.init();
  }

  init() {
    this.initTableData();
    this.initTexAnim();
  }

  initTableData() {
    this.$table.each((index, el) => {
      let $el = $(el);

      $el.find('tr').attr('data-text-anim', true);
    });
  }

  initTexAnim() {
    let controller = new ScrollMagic.Controller(),
        mainTitle = document.getElementsByClassName('title'),
        $mainTitle = $('.title'),
        $textTarget = $('[data-text-anim]'),
        textTarget = document.querySelectorAll('[data-text-anim]'),
        textCount = $textTarget.length,
        mainTitleCount = $mainTitle.length;

    TweenLite.set($mainTitle, {perspective: 500});

    // Title anim:
    for (let i = 0; i < mainTitleCount; i++) {
      let mySplitText = new SplitText(mainTitle[i], {type:"words", paused: true}),
          splitTextTimeline = new TimelineLite();

      mySplitText.split({type:"chars, words, lines"});
      splitTextTimeline.staggerFrom(mySplitText.chars, 0.5, { css: {
        opacity: 0,
        rotationY: -90,
        transformOrigin: "0% 50%"
      }, ease: Circ.easeIn }, 0.05);

      new ScrollMagic.Scene({
        triggerElement: mainTitle[i],
        triggerHook: 'onEnter',
        offset: 100,
        reverse: false
      }).setTween(splitTextTimeline)
        .addTo(controller);
    }

    for (let i = 0; i < textCount; i++) {
      let target = textTarget[i],
          animDelay = target.getAttribute('data-delay');

      if (animDelay === null) {
        animDelay = .5
      } else {
        animDelay = animDelay / 5
      }

      let tween = TweenMax.from(target, 1, {
        y: 40,
        opacity: 0,
        ease: Circ.easeOut
      }).delay(animDelay);

      new ScrollMagic.Scene({
        triggerElement: target,
        triggerHook: 'onEnter',
        reverse: false
      }).setTween(tween)
        .addTo(controller);
    }
  }
}

export default new ScrollTrigerAnim();
