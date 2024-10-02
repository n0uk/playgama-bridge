import ModuleBase from './ModuleBase'

class PlayerModule extends ModuleBase {
    get isAuthorizationSupported() {
        return this._platformBridge.isPlayerAuthorizationSupported
    }

    get isAuthorized() {
        return this._platformBridge.isPlayerAuthorized
    }

    get id() {
        return this._platformBridge.playerId
    }

    get name() {
        return this._platformBridge.playerName
    }

    get photos() {
        return this._platformBridge.playerPhotos
    }

    authorize(options) {
        if (options) {
            const platformDependedOptions = options[this._platformBridge.platformId]
            if (platformDependedOptions) {
                return this.authorize(platformDependedOptions)
            }
        }

        return this._platformBridge.authorizePlayer(options)
    }
}

export default PlayerModule
