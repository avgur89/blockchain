import objectFitImages from 'object-fit-images';
import objectFitVideos from 'object-fit-videos';
import Layzr from 'layzr.js'
import { $window, $body, Resp } from '../modules/dev/_helpers';
import './b_video-slider';
import './form';
import './slickInit';
import './popup';
import './svg-hover';
import './b_accordion';
import './b_language';
import './b_dodecagon';
import 'jquery-dotdotdot';
import './b_navigation';
import './scrollTrigerAnim';
import './initScreenBtnAnim';
import './b_timer';

/**
 * Website's common scripts.
 *
 * @module Common
 */

export class Common {
  /**
   * Initialize common scripts.
   */
  init() {
    Common.setScreenFullHeight(); // set first screen height (for iPad, iPhone)
    Common.checkHover(); // check this device hovers support
    Common.checkPartners(); // check items length

    // Fix object-fir-image vs layzr.js for IE11:
    if (window.navigator.userAgent.indexOf('Trident/') > 0) {
      let $images = $('[srcset]');

      $images.each((index, el) => {
        let $el = $images.eq(index);

        $el.attr('src', $el.attr('srcset'));
      });
    }

    objectFitImages();
    objectFitVideos();
    Layzr(); // Img lazy-loadig init:
  }

  /**
   * Check logo items quantity.
   */
  static checkPartners() {
    const blueItems = $('.logo_blue').find('.logo__item').length;
    const pressItems = $('.logo_press').find('.logo__item').length;

    if (Resp.isDesk && blueItems < 5) {
      $('.logo_blue').find('.container').addClass('is-active');
    }

    if (Resp.isDesk && pressItems < 5) {
      $('.logo_press').find('.container').addClass('is-active');
    }
  }

  /**
   * Hover detect.
   */
  static checkHover() {
    if (!Resp.isTouch) $body.addClass('no-touch');
  }
  /**
   * Set first screen height.
   */
  static setScreenFullHeight() {
    let screen = document.getElementsByClassName("screen")[0];

    getFullHeight();
    $window.on("resize", () => {
      getFullHeight();
    });

    function getFullHeight() {
      screen.style.setProperty("height", document.documentElement.clientHeight + "px", "");
      screen.style.setProperty("min-height", document.documentElement.clientHeight + "px", "");
    }

  }
}

/** Export initialized common scripts by default */
export default new Common().init();
