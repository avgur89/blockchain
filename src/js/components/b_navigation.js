import { $scrolledElements, Resp, css, $body } from '../modules/dev/_helpers';
import ScrollMagic from 'ScrollMagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';

class Navigation {
  constructor() {
    this.$section = $('[data-section-caption]');
    this.$nav = $('.header__nav');
    this.$ul = $('.header__nav > ul');
    this.$header = $('.header__container');
    this.$nextSection = $('.screen__next-section');
    this.$getTop = $('.get-top');
    this.$burger = () => $('.burger');
    this.$close = () => $('.menu__close');
    this.$menuLink = () => $('.menu__link');
    this.items = [];
    this.itemsOffsetTop = [];
    this.$anchor = {};
    this.count = 0;

    if (this.$section.length) this.init();
  }

  init() {
    this.getSectionOffsetTop();
    this.createNavMenu();
    this.initAnchorAnim();
    this.initScrollTrigger();
    this.logoScrollTop();
    this.mobMenuInit();
  }

  getSectionOffsetTop() {
    this.$section.each((index, el) => {
      let $this = $(el);

      this.items.push($this.data('section-caption'));
      this.itemsOffsetTop.push($this.offset().top);
    });
  }

  createNavMenu() {
    let i;

    this.count = this.items.length;

    for (i = 0; i < this.count; i++) {
      let href = '#anchor-' + i,
          title = this.items[i];

      this.$ul.append('<li><a class="menu__link '+ "menu__link_" + i + '" href=' + href + '><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="3" height="11" viewBox="0 0 3 11"><defs><path id="ygbfa" d="M1230 60h-3v-1h2v-9h-2v-1h3z"/></defs><g><g transform="translate(-1227 -49)"><use fill="currentColor" xlink:href="#ygbfa"/></g></g></svg><span>' + title + '</span></a><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="3" height="11" viewBox="0 0 3 11"><defs><path id="ygbfa" d="M1230 60h-3v-1h2v-9h-2v-1h3z"/></defs><g><g transform="translate(-1227 -49)"><use fill="currentColor" xlink:href="#ygbfa"/></g></g></svg></li>');
      this.$anchor = $('.menu__link');
    }
  }

  initAnchorAnim() {
    this.$anchor.on('click tap', function () {
      let $this = $(this);

      getNext($this, 450);
      return false;
    });

    this.$nextSection.on('click tap', function () {
      let $this = $(this);

      getNext($this, 600);
      return false;
    });

    function getNext($this, delay) {
      $scrolledElements.animate({
        scrollTop: $($this.attr('href')).offset().top
      }, delay);
    }
  }

  initScrollTrigger() {
    let controller = new ScrollMagic.Controller(),
        navHeight = this.$nav.height(),
        winHeight = window.innerHeight,
        bottomOffset = window.innerHeight - (this.$nav.offset().top + navHeight),
        navLinkHeight = navHeight / this.count,
        $whiteSection = $('.block-white'),
        $darkSection = $('.block-dark'),
        darkSectionCount = $darkSection.length,
        whiteSectionCount = $whiteSection.length,
        triggerElement = document.getElementsByClassName('block-dark'),
        i, j, k;

    for (i = 0; i < this.count; i++) {
      let id = '#anchor-' + i,
        targetClass = ".menu__link_" + i,
        offset = bottomOffset + ((this.count - i) * navLinkHeight),
        sectionHeight = this.$section.eq(i).height() - navLinkHeight;

      // Set active strate:
      new ScrollMagic.Scene({
        triggerElement: id,
        duration: sectionHeight,
        triggerHook: 'onEnter',
        offset: offset
      }).setClassToggle(targetClass, css.active)
      .addTo(controller);

      // Set hidden state at item cross first section:
      new ScrollMagic.Scene({
        triggerElement: '#anchor-0',
        triggerHook: 'onEnter',
        offset: offset,
      }).setClassToggle(targetClass, css.hide)
      .addTo(controller);

      // Set hidden state at item cross footer:
      new ScrollMagic.Scene({
        triggerElement: 'footer',
        triggerHook: 'onEnter',
        offset: offset - 20,
      }).setClassToggle(targetClass, css.overflow)
        .addTo(controller);

      // Detect menu-item in dark section:
      for (k = 0; k < darkSectionCount; k++) {
        let blackSectionDuration = $darkSection.eq(k).height();

        new ScrollMagic.Scene({
          triggerElement: triggerElement[k],
          triggerHook: 'onEnter',
          duration: blackSectionDuration,
          offset: offset,
        }).setClassToggle(targetClass, 'menu__link_invert')
        .addTo(controller);
      }
    }

    // Detect header at white blocks:
    for (j = 0; j < whiteSectionCount; j++) {
      let $language = $('.language'),
          triggerElement = document.getElementsByClassName('block-white'),
          offsetTop = $language.position().top + $language.height(),
          duration = $whiteSection.eq(j).height() + offsetTop,
          headerOffset = winHeight - offsetTop;

      new ScrollMagic.Scene({
        triggerElement: triggerElement[j],
        triggerHook: 'onEnter',
        duration: duration,
        offset: headerOffset,
      }).setClassToggle('body', 'header_dark')
        .addTo(controller);
    }
  }

  logoScrollTop() {
    this.$getTop.on('click tap', () => {
      $scrolledElements.animate({
        scrollTop: 0
      }, 800);
    });
  }

  mobMenuInit() {
    if (Resp.isMobile) {
      $body.append('<button class="burger"><?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="21px" viewBox="0 0 32 21" fill="currentColor"><g><g><path d="M17,0v1h15V0H17z M17,11h15v-1H17V11z M17,21h15v-1H17V21z M0,1h15V0H0V1z M0,11h15v-1H0V11z M0,21h15v-1H0V21z"/></g></g></svg></button>');

      this.$burger().on('click tap', () => {
        $body.addClass('is-overflow');
        this.$nav.addClass('is-open');
      });

      this.$nav.append('<button class="menu__close"><img src="static/img/close-menu.svg"></button>');

      this.$close().on('click tap', () => {
        $body.removeClass('is-overflow');
        this.$nav.removeClass('is-open');
      });

      this.$menuLink().on('click tap', () => {
        setTimeout(() => {
          $body.removeClass('is-overflow');
          this.$nav.removeClass('is-open');
        }, 400);
      });
    }
  }
}

export default new Navigation();
