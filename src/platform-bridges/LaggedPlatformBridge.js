/*
 * This file is part of Playgama Bridge.
 *
 * Playgama Bridge is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Playgama Bridge is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Playgama Bridge. If not, see <https://www.gnu.org/licenses/>.
 */

import PlatformBridgeBase from './PlatformBridgeBase'
import { addJavaScript, waitFor } from '../common/utils'
import {
    PLATFORM_ID,
    ACTION_NAME,
    STORAGE_TYPE,
    ERROR,
    INTERSTITIAL_STATE,
    REWARDED_STATE,
} from '../constants'

const SDK_URL = 'https://lagged.com/api/rev-share/lagged.js'

class LaggedPlatformBridge extends PlatformBridgeBase {
    // platform
    get platformId() {
        return PLATFORM_ID.LAGGED
    }

    initialize() {
        if (this._isInitialized) {
            return Promise.resolve()
        }

        let promiseDecorator = this._getPromiseDecorator(ACTION_NAME.INITIALIZE)
        if (!promiseDecorator) {
            promiseDecorator = this._createPromiseDecorator(ACTION_NAME.INITIALIZE)

            if (
                !this._options
                || !this._options.devId
                || !this._options.publisherId
            ) {
                this._rejectPromiseDecorator(
                    ACTION_NAME.INITIALIZE,
                    ERROR.LAGGED_GAME_PARAMS_NOT_FOUND,
                )
            } else {
                addJavaScript(SDK_URL).then(() => {
                    waitFor('LaggedAPI').then(() => {
                        this._platformSdk = window.LaggedAPI

                        this._platformSdk.init(this._options.devId, this._options.publisherId)

                        this._platformSdk.User.get((response) => {
                            const { id, name, avatar } = response?.user ?? {}

                            this._playerId = id
                            this._playerName = name
                            this._playerPhotos.push(avatar)
                        })

                        this._isInitialized = true
                        this._resolvePromiseDecorator(ACTION_NAME.INITIALIZE)
                    })
                })
            }
        }

        return promiseDecorator.promise
    }

    // storage
    isStorageSupported(storageType) {
        if (storageType === STORAGE_TYPE.PLATFORM_INTERNAL) {
            return false
        }

        return super.isStorageSupported(storageType)
    }

    isStorageAvailable(storageType) {
        if (storageType === STORAGE_TYPE.PLATFORM_INTERNAL) {
            return false
        }

        return super.isStorageAvailable(storageType)
    }

    // advertisement
    showInterstitial() {
        this._setInterstitialState(INTERSTITIAL_STATE.OPENED)

        this._platformSdk.APIAds.show(() => {
            this._setInterstitialState(INTERSTITIAL_STATE.CLOSED)
        })
    }

    showRewarded() {
        this._setRewardedState(REWARDED_STATE.OPENED)
        const canShowReward = (success, showAdFn) => {
            if (success) {
                showAdFn()
            } else {
                this._setRewardedState(REWARDED_STATE.FAILED)
            }
        }

        const rewardSuccess = (success) => {
            if (success) {
                this._setRewardedState(REWARDED_STATE.REWARDED)
                this._setRewardedState(REWARDED_STATE.CLOSED)
            } else {
                this._setRewardedState(REWARDED_STATE.FAILED)
            }
        }

        this._platformSdk.GEvents.reward(canShowReward, rewardSuccess)
    }
}

export default LaggedPlatformBridge
