import ModuleBase from './ModuleBase'
import { PLATFORM_MESSAGE } from '../constants'

class PlatformModule extends ModuleBase {
    #isGameReadyMessageSent = false

    get id() {
        return this._platformBridge.platformId
    }

    get sdk() {
        return this._platformBridge.platformSdk
    }

    get language() {
        return this._platformBridge.platformLanguage
    }

    get payload() {
        return this._platformBridge.platformPayload
    }

    get tld() {
        return this._platformBridge.platformTld
    }

    sendMessage(message) {
        if (message === PLATFORM_MESSAGE.GAME_READY) {
            if (this.#isGameReadyMessageSent) {
                return Promise.reject()
            }

            this.#isGameReadyMessageSent = true
        }

        return this._platformBridge.sendMessage(message)
    }

    getServerTime() {
        return this._platformBridge.getServerTime()
    }
}

export default PlatformModule
