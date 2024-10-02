import ModuleBase from './ModuleBase'

class PaymentsModule extends ModuleBase {
    get isSupported() {
        return this._platformBridge.isPaymentsSupported
    }

    purchase(options) {
        if (options) {
            const platformDependedOptions = options[this._platformBridge.platformId]
            if (platformDependedOptions) {
                return this.purchase(platformDependedOptions)
            }
        }

        return this._platformBridge.purchase(options)
    }

    getPurchases() {
        return this._platformBridge.getPaymentsPurchases()
    }

    getCatalog() {
        return this._platformBridge.getPaymentsCatalog()
    }

    consumePurchase(options) {
        if (options) {
            const platformDependedOptions = options[this._platformBridge.platformId]
            if (platformDependedOptions) {
                return this.consumePurchase(platformDependedOptions)
            }
        }

        return this._platformBridge.consumePurchase(options)
    }
}

export default PaymentsModule
