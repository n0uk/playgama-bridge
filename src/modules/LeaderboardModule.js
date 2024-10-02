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
