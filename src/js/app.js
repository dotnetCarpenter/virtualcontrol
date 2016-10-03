"use strict"

import SVG from "svg.js"
import Tile from "./tile.js"

const canvas = SVG("canvas")

function delay(f, time, ...args) {
	return setTimeout(f, time, ...args)
}

function main() {
	SVG.on(window, 'resize', () => { canvas.spof() })
	canvas.on("click", (event) => {
		const tile = new Tile(canvas, event.pageX + "," + event.pageY)
		delay(tile.drawTile.bind(tile), 1000)
	})
}

main()