import { TweenMax } from 'gsap';
import {Resp} from '../modules/dev/_helpers';

class ScreenBtn {
  constructor() {
    this.$btn = $('.screen__container .play-btn');

    this.init();
  }

  init() {
    if (!Resp.isMobile) this.initHover();
  }

  initHover() {
    this.$btn.each((index, el) => {
      let $this = $(el);

      $this.on('mouseenter', () => {
        getAnim(el);
      });

      $this.on('mouseleave', () => {
        TweenMax.killTweensOf(".svg-part", ".triangle", ".svg-lines");
        TweenMax.to(".svg-part", 1.2,{
            rotation: 0,
            scale: 1,
            transformOrigin: "50% 50%"
          }, .1);

        TweenMax.to(".svg-lines", 1.2,{
          rotation: 0,
          transformOrigin: "50% 50%"
        }, .1);

        TweenMax.to(".triangle", 1.2,{
          scale: 1,
          transformOrigin: "50% 50%"
        }, .1);
      });
    });

    function getAnim(el) {
      TweenMax.set(el,{transformOrigin:"50% 50% 0"});

      TweenMax.to(".svg-part", 2,{
        startAt: {
          rotation: 360,
          scale: .5,
          transformOrigin: "50% 50%"
        },
        rotation: 0,
        scale: 1,
        yoyo: true,
        ease:Power4.easeOut,
        // repeat: -1
      }, 2);

      TweenMax.to(".triangle", 2, {
        startAt: {
          scale: 2,
          transformOrigin: "50% 50%",
          ease: Expo.easeIn
        },
        scale: 1,
      }, .1);

      TweenMax.to(".svg-lines", .3,{
        startAt: {
          rotation: 360,
          transformOrigin: "50% 50%"
        },
        yoyo: true,
        rotation: 0,
        ease: Power0.easeNone,
        // repeat: -1
      }, 2);
    }
  }
}

export default new ScreenBtn();
