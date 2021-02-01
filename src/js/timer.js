class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.targetDate = targetDate;

        this.daysRef = document.querySelector(`${selector} [data-value=days]`);
        this.hoursRef = document.querySelector(`${selector} [data-value=hours]`);
        this.minsRef = document.querySelector(`${selector} [data-value=mins]`);
        this.secsRef = document.querySelector(`${selector} [data-value=secs]`);
    }

    updateTimer() {
        let interval = 1000;

        let deltaTime = Date.now() - this.targetDate;

        setInterval(() => {
            deltaTime -= 1000

            const days = this.pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
            const hours = this.pad(Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const mins = this.pad(Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)));
            const secs = this.pad(Math.floor((deltaTime % (1000 * 60)) / 1000));

            this.daysRef.textContent = days;
            this.hoursRef.textContent = hours;
            this.minsRef.textContent = mins;
            this.secsRef.textContent = secs;
        }, interval);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2019'),
}).updateTimer();