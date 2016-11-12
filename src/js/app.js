"use strict"

import SVG from "svg.js"
import Tile from "./tile.js"

function delay(f, time, ...args) {
	return setTimeout(f, time, ...args)
}

function main() {
	const canvas = SVG("canvas")

	SVG.on(window, 'resize', () => { canvas.spof() })

	let counter = 0
	canvas.on("click", (event) => {
		const tile = new Tile(canvas, event.pageX + "," + event.pageY)
		tile.once("drawed", console.log.bind(null, `Hej Jon ${++counter}`))
		delay(tile.drawTile.bind(tile), 1000)
	})
}

main()