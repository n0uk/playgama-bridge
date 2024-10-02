import EventLite from 'event-lite'

export const EVENT_NAME = {
    STATE_CHANGED: 'state_changed',
    TIME_LEFT_CHANGED: 'time_left_changed',
}

export const STATE = {
    CREATED: 'created',
    STARTED: 'started',
    STOPPED: 'stopped',
    COMPLETED: 'completed',
}

class Timer {
    get state() {
        return this.#state
    }

    #time = 0

    #timeLeft = 0

    #state = STATE.CREATED

    #intervalId = 0

    constructor(time) {
        this.#time = time
    }

    start() {
        if (this.#state === STATE.CREATED || this.#state === STATE.COMPLETED) {
            this.#timeLeft = this.#time
            this.#setState(STATE.STARTED)
            this.#intervalId = setInterval(() => {
                this.#timeLeft -= 1
                this.emit(EVENT_NAME.TIME_LEFT_CHANGED, this.#timeLeft)

                if (this.#timeLeft <= 0) {
                    this.#clear()
                    this.#setState(STATE.COMPLETED)
                }
            }, 1000)
        }
    }

    stop() {
        this.#clear()
        this.#setState(STATE.STOPPED)
    }

    #setState(value) {
        this.#state = value
        this.emit(EVENT_NAME.STATE_CHANGED, this.#state)
    }

    #clear() {
        this.#timeLeft = 0
        clearInterval(this.#intervalId)
    }
}

EventLite.mixin(Timer.prototype)
export default Timer
