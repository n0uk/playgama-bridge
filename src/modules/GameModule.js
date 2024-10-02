import EventLite from 'event-lite'
import ModuleBase from './ModuleBase'
import { EVENT_NAME } from '../constants'

class GameModule extends ModuleBase {
    get visibilityState() {
        return this._platformBridge.visibilityState
    }

    constructor(platformBridge) {
        super(platformBridge)

        this._platformBridge.on(
            EVENT_NAME.VISIBILITY_STATE_CHANGED,
            (state) => this.emit(EVENT_NAME.VISIBILITY_STATE_CHANGED, state),
        )
    }
}

EventLite.mixin(GameModule.prototype)
export default GameModule
