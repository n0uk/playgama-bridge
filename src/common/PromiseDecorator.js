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

class PromiseDecorator {
    #promise

    #resolve

    #reject

    get promise() {
        return this.#promise
    }

    constructor() {
        this.#promise = new Promise((resolve, reject) => {
            this.#resolve = resolve
            this.#reject = reject
        })
    }

    resolve(data) {
        this.#resolve(data)
    }

    reject(error) {
        this.#reject(error)
    }
}

export default PromiseDecorator
