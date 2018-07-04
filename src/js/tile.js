"use strict"

import SVG from "svg.js"

function φ(a) {
	return (1 + Math.sqrt(5))/2 * a
}

let ab = false

class Tile {

	constructor(canvas, [x, y] = [0,100]) {
		const goldenPolygon = [
			φ(0), φ(1)
		, φ(1), φ(0)
		,	φ(6), φ(0)
		, φ(6), φ(3)
		, φ(5), φ(4)
		, φ(0), φ(4)
		].map(x => x * 31)

//canvas.polygon("0,66 66,0 264,0 264,132 198,198 0,198")
		const t = ab ?
			canvas.polygon("221.08 191.79 0.46 191.79 0.46 63.92 63.8 0.46 284.46 0.46 284.46 128.37")
		:	canvas.polygon(goldenPolygon.join(" "))
		if(ab) console.log("Anton")
		else console.log("Jon")
		ab = !ab

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