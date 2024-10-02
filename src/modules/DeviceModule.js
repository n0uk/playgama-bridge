import ModuleBase from './ModuleBase'

class DeviceModule extends ModuleBase {
    get type() {
        return this._platformBridge.deviceType
    }
}

export default DeviceModule
