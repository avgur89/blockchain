import Popup from 'vintage-popup';
import PerfectScrollbar from 'perfect-scrollbar';

class InitPopup {
  constructor() {
    this.$popupSrc = $('.video-popup-js');
    this.$popupSign = $('.sign-popup-js');
    this.$popupThanks = $('.thanks-popup-js');
    this.$popupNews = $('.news-popup-js');
    this.$popupPeople = $('.people-popup-js');
    this.$closeBtn = $('.popup .close-video-btn');
    this.$popupVideo = $('.popup_video video');
    this.video = document.getElementsByClassName('popup__video')[0];

    this.init();
  }

  init() {
    this.initPopups();
    this.initVideoPopup();
    this.initClosePopup();

    $('.news__item').on('click tap', () => {
      console.log('dsfsd');
    })
  }

  initPopups() {
    Popup.expose($);
    let perfectScrollbar = document.getElementsByClassName('ps-init');

    this.$popupSrc.popup();
    this.$popupThanks.popup();
    this.$popupSign.popup();
    this.$popupNews.popup({
      beforeOpen: function () {
        console.log('sss');
        for (let i = 0; i < perfectScrollbar.length; i++) {
          new PerfectScrollbar(perfectScrollbar[i]);
        }
      }
    });
    this.$popupPeople.popup({
      beforeOpen: function () {
        for (let i = 0; i < perfectScrollbar.length; i++) {
          new PerfectScrollbar(perfectScrollbar[i]);
        }
      }
    });
  }

  initVideoPopup() {
    this.$popupSrc.each((index, el) => {
      let $this = $(el),
          src = () => $this.attr('data-video-src');

      $this.on('click tap', () => {
        this.$popupVideo.attr('src', src());
        this.video.play();
      });
    });
  }

  initClosePopup() {
    this.$closeBtn.on('click tap', () => {
      this.video.pause();
      this.$popupVideo.attr('src', '');
    });
  }
}

export default new InitPopup();
