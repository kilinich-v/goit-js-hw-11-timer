// прописать старт и стоп

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.targetDate = targetDate;
        this.selector = selector;

        this.template = `<div class="field" >
            <span class="value" data-value="days" >00</span>
                <span class="label">Days</span>
            </div >
            <div class="field">
                <span class="value" data-value="hours">00</span>
                <span class="label">Hours</span>
            </div>
            <div class="field">
                <span class="value" data-value="mins">00</span>
                <span class="label">Minutes</span>
            </div>
            <div class="field">
                <span class="value" data-value="secs">00</span>
                <span class="label">Seconds</span>
            </div>`;
        this.root = document.querySelector(this.selector);
        this.root.insertAdjacentHTML('beforeend', this.template);

        this.daysRef = this.root.querySelector('[data-value=days]');
        this.hoursRef = this.root.querySelector('[data-value=hours]');
        this.minsRef = this.root.querySelector('[data-value=mins]');
        this.secsRef = this.root.querySelector('[data-value=secs]');

        this.intervalId = null;
    }

    start() {
        if (this.intervalId) {
            return;
        }
        let deltaTime = Date.now() - this.targetDate;

        this.intervalId = setInterval(() => {
            if (deltaTime <= 0) {
                clearInterval(this.intervalId);
                return;
            }

            this.updateTimer(deltaTime -= 1000);
        }, 1000);
    }

    updateTimer(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        this.daysRef.textContent = days;
        this.hoursRef.textContent = hours;
        this.minsRef.textContent = mins;
        this.secsRef.textContent = secs;
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2019'),
});

timer.start();