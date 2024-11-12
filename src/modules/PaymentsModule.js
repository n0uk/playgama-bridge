/*
 * This file is part of Playgama Bridge.
 *
 * Playgama Bridge is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * Playgama Bridge is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Playgama Bridge. If not, see <https://www.gnu.org/licenses/>.
 */

import ModuleBase from './ModuleBase'

class PaymentsModule extends ModuleBase {
    get isSupported() {
        return this._platformBridge.isPaymentsSupported
    }

    get isCatalogSupported() {
        return this._platformBridge.isCatalogSupported
    }

    get isPurchaseListSupported() {
        return this._platformBridge.isPurchaseListSupported
    }

    get isPurchaseConsumingSupported() {
        return this._platformBridge.isPurchaseConsumingSupported
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
