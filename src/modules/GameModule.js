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

import EventLite from 'event-lite'
import ModuleBase from './ModuleBase'
import { EVENT_NAME } from '../constants'

class GameModule extends ModuleBase {
    get visibilityState() {
        return this._platformBridge.visibilityState
    }

    constructor(platformBridge) {
        super(platformBridge)

        this._platformBridge.on(
            EVENT_NAME.VISIBILITY_STATE_CHANGED,
            (state) => this.emit(EVENT_NAME.VISIBILITY_STATE_CHANGED, state),
        )
    }
}

EventLite.mixin(GameModule.prototype)
export default GameModule
