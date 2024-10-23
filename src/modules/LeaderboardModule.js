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

class LeaderboardModule extends ModuleBase {
    get isSupported() {
        return this._platformBridge.isLeaderboardSupported
    }

    get isNativePopupSupported() {
        return this._platformBridge.isLeaderboardNativePopupSupported
    }

    get isMultipleBoardsSupported() {
        return this._platformBridge.isLeaderboardMultipleBoardsSupported
    }

    get isSetScoreSupported() {
        return this._platformBridge.isLeaderboardSetScoreSupported
    }

    get isGetScoreSupported() {
        return this._platformBridge.isLeaderboardGetScoreSupported
    }

    get isGetEntriesSupported() {
        return this._platformBridge.isLeaderboardGetEntriesSupported
    }

    setScore(options) {
        if (options) {
            const platformDependedOptions = options[this._platformBridge.platformId]
            if (platformDependedOptions) {
                return this.setScore(platformDependedOptions)
            }
        }

        return this._platformBridge.setLeaderboardScore(options)
    }

    getScore(options) {
        if (options) {
            const platformDependedOptions = options[this._platformBridge.platformId]
            if (platformDependedOptions) {
                return this.getScore(platformDependedOptions)
            }
        }

        return this._platformBridge.getLeaderboardScore(options)
    }

    getEntries(options) {
        if (options) {
            const platformDependedOptions = options[this._platformBridge.platformId]
            if (platformDependedOptions) {
                return this.getEntries(platformDependedOptions)
            }
        }

        return this._platformBridge.getLeaderboardEntries(options)
    }

    showNativePopup(options) {
        if (options) {
            const platformDependedOptions = options[this._platformBridge.platformId]
            if (platformDependedOptions) {
                return this.showNativePopup(platformDependedOptions)
            }
        }

        return this._platformBridge.showLeaderboardNativePopup(options)
    }
}

export default LeaderboardModule
