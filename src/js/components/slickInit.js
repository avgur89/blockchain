import {css, Resp} from '../modules/dev/_helpers';
import 'slick-carousel';

class SlickInit {
  constructor() {
    this.$sliderNews = $('.news__slider');
    this.$sliderTeam = $('.team__slider');

    this.init();
  }

  init() {
    if (this.$sliderNews.length) this.initNewsSlider();
    if (this.$sliderTeam.length) this.initTeamSlider();
  }

  initNewsSlider() {
    const $slides = $(this.$sliderNews),
          $prevArrow = $('.news__prev'),
          $nextArrow = $('.news__next'),
          $items = $slides.find('.news__item');

    if (Resp.isDesk && $items.length < 4) {
      $prevArrow.hide();
      $nextArrow.hide();
      return;
    }

    if (Resp.isTablet && $items.length < 3) {
      $prevArrow.hide();
      $nextArrow.hide();
      return;
    }

    $slides.slick({
      infinite: false,
      autoplay: false,
      dots: false,
      cssEase: 'linear',
      slidesToShow: 3,
      slidesToScroll: 3,
      prevArrow: $prevArrow,
      nextArrow: $nextArrow,
      responsive: [
        {
          breakpoint: 1260,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ],
    });
  }

  initTeamSlider() {
    this.$sliderTeam.each((index, el) => {
      let $slides = $(el),
          $items = $slides.find('.team__item'),
          $prevArrow = $slides.siblings('.team__prev'),
          $nextArrow = $slides.siblings('.team__next');

      $slides.closest('.container').removeClass('less');

      if (Resp.isDesk && $items.length < 9 || Resp.isTablet && $items.length < 2 || Resp.isTablet && $items.length === 4 || Resp.isMobile && $items.length < 2) {
        $prevArrow.hide();
        $nextArrow.hide();
        return;
      }

      if (Resp.isTablet && $items.length === 2) {
        $prevArrow.hide();
        $nextArrow.hide();
      }

      if (Resp.isTablet && $items.length < 4) {
        $slides.slick({
          rows: 1,
          infinite: false,
          autoplay: false,
          dots: false,
          cssEase: 'linear',
          slidesToShow: 2,
          slidesToScroll: 1,
          prevArrow: $prevArrow,
          nextArrow: $nextArrow,
        });

        $slides.closest('.team').addClass('less');

        return;
      }

      $slides.slick({
        rows: 2,
        infinite: false,
        autoplay: false,
        dots: false,
        cssEase: 'linear',
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: $prevArrow,
        nextArrow: $nextArrow,
        responsive: [
          {
            breakpoint: 1260,
            settings: {
              rows: 2,
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 768,
            settings: {
              rows: 1,
              speed: 500,
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ],
      });
    });
  }
}

export default new SlickInit();