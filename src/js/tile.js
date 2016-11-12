"use strict"

import SVG from "svg.js"


class Tile {

	constructor(canvas, [x, y] = [0,100]) {
		const t = canvas.polygon("0,66 66,0 264,0 264,132 198,198 0,198")
		try {
			this.tile = t.toPath(true)
			this.tile.move(x, y-66)
		} catch (err) {
			console.warn(err)
		}

		this._listeners = []

		const length = this.tile.node.getTotalLength()
		const style = `stroke-dasharray:${length};stroke-dashoffset:${length};`

		this.tile
			.style(style)
			.fill('none')
			.stroke({ width: 0 })
			.addClass("tile")
	}

	drawTile() {
		const tile = this.tile
		const handler = () => {
			this.fire("drawed")
			tile.off("transitionend", handler)
		}

		tile.on("transitionend", handler)

		tile
			.stroke({ width: 1 })
			.style("stroke-dashoffset", 0)

		return tile
	}

	on(eventname, f) {
		if(!f) console.error(`No handler provided for ${this.constructor.name}.on`)
		this._listeners.push([eventname, f])
	}

	once(eventname, f) {
		const forget = () => {
			this.off(eventname, f)
			this.off(eventname, forget)
		}

		this.on(eventname, f)
		this.on(eventname, forget)

		/*const handlerWrapper = (...args) => {
			f(...args)
			this.off(eventname, handlerWrapper)
		}

		this.on(eventname, handlerWrapper)*/
	}

	off(eventname, f = true) {
		this._listeners = this._listeners.map(handler => {
			const found = eventname === handler[0]

			if(f === true && found) return null
			if(found && f === handler[1]) return null

			return handler
		}).filter(Boolean)
	}

	fire(eventname, ...args) {
		this._listeners
			.filter(x => x[0] === eventname)
			.forEach(handler => {
				handler[1](...args)
			})
	}
}

export default Tile