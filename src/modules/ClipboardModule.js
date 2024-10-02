import ModuleBase from './ModuleBase'

class ClipboardModule extends ModuleBase {
    get isSupported() {
        return this._platformBridge.isClipboardSupported
    }

    read() {
        return this._platformBridge.clipboardRead()
    }

    write(text) {
        return this._platformBridge.clipboardWrite(text)
    }
}

export default ClipboardModule
