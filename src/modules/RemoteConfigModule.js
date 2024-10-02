import ModuleBase from './ModuleBase'

class RemoteConfigModule extends ModuleBase {
    get isSupported() {
        return this._platformBridge.isRemoteConfigSupported
    }

    get(options) {
        if (options) {
            const platformDependedOptions = options[this._platformBridge.platformId]
            if (platformDependedOptions) {
                return this.get(platformDependedOptions)
            }
        }
        return this._platformBridge.getRemoteConfig(options)
    }
}

export default RemoteConfigModule
