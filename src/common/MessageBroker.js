export default class MessageBroker {
    send(message, target = '*') {
        if (window.parent) {
            window.parent.postMessage(message, target)
        }
    }

    addListener(callback) {
        window.addEventListener('message', callback)
    }

    removeListener(callback) {
        window.removeEventListener('message', callback)
    }
}
