"use strict"

import SVG from "svg.js"

class Tile {
	
	constructor(canvas, position = "0,100") {
		//this.tile = canvas.path(/*"M" + position +*/'M441.92,272.44H221.31V144.56l63.34-63.46H505.31V209Z')
		const t = canvas.polygon("221.08 191.79 0.46 191.79 0.46 63.92 63.8 0.46 284.46 0.46 284.46 128.37 221.08 191.79")
		try {
			this.tile = t.toPath(true)
			this.tile.move(...position.split(","))
		} catch (err) {
			console.warn(err)
		}
		/*position = position.split(",")
		const correction = {
			x: position[0] - 441.92,
			y: position[1] - 272.44
		}
		console.log(correction)*/
		const length = this.tile.node.getTotalLength()
		const style = `stroke-dasharray:${length};stroke-dashoffset:${length};`
		//console.log(style)
		this.tile
			.style(style)
			.fill('none')
			.stroke({ width: 0 })
			.addClass("tile")
	}

	drawTile() {
		return this.tile
			.stroke({ width: 1 })
			.style("stroke-dashoffset", 0)
	}
}

export default Tile