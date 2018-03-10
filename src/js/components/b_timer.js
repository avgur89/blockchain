import moment from 'moment';

class Timer {
    constructor() {
        this.init();
    }

    init() {
        this.initTimer();
    }

    initTimer() {
        let $clock = $('.countdown'),
            $days = $clock.find('.countdown__days'),
            $hours = $clock.find('.countdown__hours'),
            $minutes = $clock.find('.countdown__minutes'),
            $seconds = $clock.find('.countdown__seconds'),
            eventTime = moment('10-01-2018 12:00:00', 'DD-MM-YYYY HH:mm:ss').unix(),
            currentTime = moment().unix(),
            diffTime = eventTime - currentTime,
            duration = moment.duration(diffTime * 1000, 'milliseconds'),
            interval = 1000;

        // if time to countdown
        if (diffTime > 0) {

            // Show clock
            // $clock.show();

            let $d = $('<div class="countdown__number" ></div>').prependTo($days),
                $h = $('<div class="countdown__number" ></div>').prependTo($hours),
                $m = $('<div class="countdown__number" ></div>').prependTo($minutes),
                $s = $('<div class="countdown__number" ></div>').prependTo($seconds);

            setInterval(function() {
                duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');

                let d = moment.duration(duration).asDays().toFixed(),
                    h = moment.duration(duration).hours(),
                    m = moment.duration(duration).minutes(),
                    s = moment.duration(duration).seconds();

                d = $.trim(d).length === 1 ? '0' + d : d;
                h = $.trim(h).length === 1 ? '0' + h : h;
                m = $.trim(m).length === 1 ? '0' + m : m;
                s = $.trim(s).length === 1 ? '0' + s : s;

                // show how many hours, minutes and seconds are left
                $d.text(d);
                $h.text(h);
                $m.text(m);
                $s.text(s);

            }, interval);
        }
    }
}

export default new Timer();
