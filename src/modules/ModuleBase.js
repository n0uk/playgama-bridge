class ModuleBase {
    _platformBridge

    constructor(platformBridge) {
        this._platformBridge = platformBridge
    }

    initialize() {
        return Promise.resolve()
    }
}

export default ModuleBase
