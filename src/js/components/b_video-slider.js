import {css} from '../modules/dev/_helpers';

class VideoSlider {
    constructor() {
        this.$videoSrc = $('.how__video');
        this.$video = document.querySelector('.how__video video');
        this.$img = $('.how__img-wrap > .how__img');
        this.$bgImg = $('.how__video > .how__img');
        this.$text = $('.how__descr-wrap');
        this.$textInner = $('.how__descr');
        this.$timeline = $('.timeline_video');
        this.src = this.$videoSrc.data('video-src'); // extract data
        this.$timelineItem = {};
        this.startIndex = 0;
        this.count = this.src.video.length;
        this.init();
    }

    init() {
        this.setParametrs();
        this.sliderAutoplay();
        this.timelineTriger();
    }

    setParametrs() {
        if (this.src.video[this.startIndex] != null) {
            $(this.$video).attr('src', this.src.video[this.startIndex]).attr('data-video-src', this.src.video[this.startIndex]).attr('data-popup-target', 'video').addClass('video-popup-js');
            this.$bgImg.hide();
        } else {
            this.$bgImg.show();
            this.$bgImg.attr('src', this.src.bgImg[this.startIndex]).addClass(css.active);
        }

        this.$img.attr('src', this.src.img[this.startIndex]);

        for (let i = 0; i < this.count; i++) {

            if (this.src.text[i] === undefined) this.src.text[i] = '';

            if (i === 0) {
                this.$text.append('<div data-delay="0" data-text-anim class = "how__descr is-active">' + this.src.text[i] + '</div>');
                this.$timeline.append('<a class="timeline__item is-active" href="#!"><button class="play-btn play-btn_small"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 120 120" xml:space="preserve"><defs><clipPath id="dodecagon-btn-clippath"><path d="M120,60l-8,30l-22,22l-30,8l-30-8L8,90L0,60l8-30L30,8l30-8l30,8l22,22L120,60z"></path> </clipPath></defs><g clip-path="url(#dodecagon-btn-clippath)"><path class="dodecagon" d="M120,60l-8,30l-22,22l-30,8l-30-8L8,90L0,60l8-30L30,8l30-8l30,8l22,22L120,60z"></path> </g></svg></button><span class="timeline__text"><span>0' + (i + 1) + '</span></span></a>');
            } else {
                this.$text.append('<div class = "how__descr">' + this.src.text[i] + '</div>');
                this.$timeline.append('<a class="timeline__item" href="#!"><button class="play-btn play-btn_small"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 120 120" xml:space="preserve"><defs><clipPath id="dodecagon-btn-clippath"><path d="M120,60l-8,30l-22,22l-30,8l-30-8L8,90L0,60l8-30L30,8l30-8l30,8l22,22L120,60z"></path> </clipPath></defs><g clip-path="url(#dodecagon-btn-clippath)"><path class="dodecagon" d="M120,60l-8,30l-22,22l-30,8l-30-8L8,90L0,60l8-30L30,8l30-8l30,8l22,22L120,60z"></path> </g></svg></button><span class="timeline__text"><span>0' + (i + 1) + '</span></span></a>');
            }
        }

        this.$timelineItem = $('.timeline_video .timeline__item');
    }

    sliderAutoplay() {
        this.$video.addEventListener('ended', () => {
            this.startIndex = this.startIndex + 1;
        if (this.startIndex > this.count - 1) this.startIndex = 0;

        this.getNextSlide(this.startIndex);
    });
    }

    timelineTriger() {
        this.$timelineItem.each((index, el) => {
            let $el = $(el),
            elIndex = $el.index();

        $el.on('click tap', () => {
            this.startIndex = elIndex;
        this.getNextSlide(elIndex);
        $('.how__descr-wrap').animate({height: "auto"}, 500);
    });
    });
    }

    getNextSlide(index) {
        let $video = $(this.$video),
            $text = $('.how__descr');

        if (this.src.video[index]) {
            $video.hide();
            $video.attr('src', this.src.video[index]).attr('data-video-src', this.src.video[index]).fadeIn(600);
            this.$bgImg.hide();
        } else {
            this.$bgImg.hide();
            //this.$bgImg.attr('src', this.src.bgImg[this.startIndex]).fadeIn(1000);
            this.$bgImg.attr('src', this.src.bgImg[index]).fadeIn(1200);
        }
        $text.removeClass(css.active).eq(index).addClass(css.active);
        this.$img.hide();
        this.$img.attr('src', this.src.img[index]).fadeIn(1200);
        this.$timelineItem.removeClass(css.active);
        this.$timelineItem.eq(index).addClass(css.active);

        // setTimeout(() => {
        //     $video.removeClass(css.active);
        //     this.$img.removeClass(css.active);
        //     this.$bgImg.fadeOut(400);
        // }, 600);
    }
}

export default new VideoSlider();