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
    STORAGE_TYPE, ERROR,
} from '../constants'

const SDK_URL = 'https://cdn.y8.com/api/sdk.js'

class Y8PlatformBridge extends PlatformBridgeBase {
    // platform
    get platformId() {
        return PLATFORM_ID.Y8
    }

    // player
    get isPlayerAuthorizationSupported() {
        return true
    }

    initialize() {
        if (this._isInitialized) {
            return Promise.resolve()
        }

        let promiseDecorator = this._getPromiseDecorator(ACTION_NAME.INITIALIZE)
        if (!promiseDecorator) {
            promiseDecorator = this._createPromiseDecorator(ACTION_NAME.INITIALIZE)

            if (!this._options || !this._options.gameId) {
                this._rejectPromiseDecorator(ACTION_NAME.INITIALIZE, ERROR.Y8_GAME_ID_IS_UNDEFINED)
            } else {
                addJavaScript(SDK_URL).then(() => {
                    waitFor('ID').then(() => {
                        this._platformSdk = window.ID

                        this._platformSdk.Event.subscribe('id.init', (() => {
                            this._platformSdk.ads.init(this._options.gameId)
                            this._platformSdk.getLoginStatus((data) => {
                                this.#updatePlayerInfo(data)
                                this._isInitialized = true
                                this._resolvePromiseDecorator(ACTION_NAME.INITIALIZE)
                            })
                        }))

                        this._platformSdk.init({
                            appId: this._options.gameId,
                        })
                    })
                })
            }
        }

        return promiseDecorator.promise
    }

    // player
    authorizePlayer() {
        if (this._isPlayerAuthorized) {
            return Promise.resolve()
        }

        return new Promise(((resolve, reject) => {
            this._platformSdk.login((response) => {
                this.#updatePlayerInfo(response)
                if (response.status === 'ok') {
                    resolve()
                } else {
                    reject()
                }
            })
        }))
    }

    // storage
    isStorageSupported(storageType) {
        if (storageType === STORAGE_TYPE.PLATFORM_INTERNAL) {
            return true
        }

        return super.isStorageSupported(storageType)
    }

    isStorageAvailable(storageType) {
        if (storageType === STORAGE_TYPE.PLATFORM_INTERNAL) {
            return true
        }

        return super.isStorageAvailable(storageType)
    }

    getDataFromStorage(key, storageType, tryParseJson) {
        if (storageType === STORAGE_TYPE.PLATFORM_INTERNAL) {
            return new Promise((resolve, reject) => {
                /* if (Array.isArray(key)) {
                    const values = []
                    key.forEach((k) => {
                        let value = this._platformSdk.data.getItem(k)

                        if (tryParseJson) {
                            try {
                                value = JSON.parse(value)
                            } catch (e) {
                                // keep value string or null
                            }
                        }
                        values.push(value)
                    })

                    resolve(values)
                    return
                } */

                this._platformSdk.api('user_data/retrieve', 'POST', { key }, ((response) => {
                    if (response.jsondata) {
                        let value = response.jsondata

                        if (tryParseJson) {
                            try {
                                value = JSON.parse(response.jsondata)
                            } catch (e) {
                                // keep value string or null
                            }
                        }

                        resolve(value)
                    } else {
                        reject(response)
                    }
                }))
            })
        }

        return super.getDataFromStorage(key, storageType, tryParseJson)
    }

    setDataToStorage(key, value, storageType) {
        if (storageType === STORAGE_TYPE.PLATFORM_INTERNAL) {
            return new Promise((resolve, reject) => {
                let _value = value

                if (Array.isArray(key)) {
                    const promises = []

                    for (let i = 0; i < key.length; i++) {
                        let valueData = _value[i]

                        if (typeof _value[i] !== 'string') {
                            valueData = JSON.stringify(_value[i])
                        }

                        const promise = new Promise((resolvePromise, rejectPromise) => {
                            this._platformSdk.api('user_data/submit', 'POST', { key: key[i], value: valueData }, ((response) => {
                                if (response.status === 'ok') {
                                    resolvePromise()
                                } else {
                                    rejectPromise()
                                }
                            }))
                        })
                        promises.push(promise)
                    }

                    Promise.all(promises)
                        .then(() => resolve())
                        .catch(() => reject())

                    return
                }

                if (typeof _value !== 'string') {
                    _value = JSON.stringify(_value)
                }

                this._platformSdk.api('user_data/submit', 'POST', { key, value: _value }, ((response) => {
                    if (response.status === 'ok') {
                        resolve()
                    } else {
                        reject()
                    }
                }))
            })
        }

        return super.setDataToStorage(key, value, storageType)
    }

    deleteDataFromStorage(key, storageType) {
        if (storageType === STORAGE_TYPE.PLATFORM_INTERNAL) {
            return new Promise((resolve) => {
                /* if (Array.isArray(key)) {
                    key.forEach((k) => this._platformSdk.data.removeItem(k))
                    return Promise.resolve()
                } */

                this._platformSdk.api('user_data/remove', 'POST', { key }, (() => {
                    resolve()
                }))
            })
        }

        return super.deleteDataFromStorage(key, storageType)
    }

    // advertisement
    showInterstitial() {

    }

    showRewarded() {

    }

    #updatePlayerInfo(data) {
        if (data.status === 'ok') {
            this._isPlayerAuthorized = true
            this._defaultStorageType = STORAGE_TYPE.PLATFORM_INTERNAL

            const {
                pid, locale, nickname, first_name: firstName, last_name: lastName, avatars,
            } = data.authResponse.details

            if (pid) {
                this._playerId = pid
            }

            this._platformLanguage = locale

            this._playerName = [firstName, lastName].filter((x) => !!x).join(' ') || nickname

            this._playerPhotos = []

            const {
                thumb_url: photoSmall, medium_url: photoMedium, large_url: photoLarge,
            } = avatars

            if (photoSmall) {
                this._playerPhotos.push(photoSmall)
            }

            if (photoMedium) {
                this._playerPhotos.push(photoMedium)
            }

            if (photoLarge) {
                this._playerPhotos.push(photoLarge)
            }
        }
    }
}

export default Y8PlatformBridge
