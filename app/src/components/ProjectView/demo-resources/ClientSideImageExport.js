/* global canvg */
import { GraphComponent, IGraph, Insets, Rect, Size, SvgExport, License } from 'yfiles'
import {graph, graphComponent} from '../ProjectView';

import { detectInternetExplorerVersion } from './Workarounds.js'
import license from '../../../assets/js/yfiles/license.json';
// Providing license information for the yfiles library
License.value = license;

/**
 * The detected IE version for x-browser compatibility.
 */
const ieVersion = detectInternetExplorerVersion()

/**
 * A class that provides PNG image export in the client's browser. The {@link SvgExport} exports an
 * SVG element of a {@link GraphComponent} which is subsequently converted to PNG.
 */
export default class ClientSideImageExport {
  constructor() {
    // The scaling of the exported image.
    this.scale = 1

    // The margins for the exported image.
    this.margins = new Insets(5)
  }

  /**
   * Exports the {@link IGraph} to a PNG image with the help of {@link SvgExport}.
   * @param {!IGraph} graph
   * @param {?Rect} exportRect
   * @returns {!Promise.<HTMLImageElement>}
   */
  async exportImage(graph, exportRect) {
    // Create a new graph component for exporting the original SVG content
    //const graphComponent = new GraphComponent()
    // ... and assign it the same graph.
    //graphComponent.graph = graph
    graphComponent.updateContentRect()

    // Determine the bounds of the exported area
    const targetRect = exportRect || graphComponent.contentRect

    // Create the exporter class
    const exporter = new SvgExport({
      worldBounds: targetRect,
      scale: this.scale,
      margins: this.margins
    })

    if (window.btoa != null) {
      // Do not use base 64 encoding if btoa is not available and do not inline images either.
      // Otherwise canvg will throw an exception.
      exporter.encodeImagesBase64 = true
      exporter.inlineSvgImages = true
    }

    // Export the component to svg
    const svgElement = await exporter.exportSvgAsync(graphComponent)

    return renderSvgToPng(
      svgElement,
      new Size(exporter.viewWidth, exporter.viewHeight),
      this.margins
    )
  }
}

/**
 * Converts the given SVG element to a PNG image.
 * @param {!SVGElement} svgElement
 * @param {!Size} size
 * @param {!Insets} margins
 * @returns {!Promise.<HTMLImageElement>}
 */
function renderSvgToPng(svgElement, size, margins) {
  const targetCanvas = document.createElement('canvas')
  const targetContext = targetCanvas.getContext('2d')

  const svgString = SvgExport.exportSvgString(svgElement)
  const svgUrl = SvgExport.encodeSvgDataUrl(svgString)

  if (window.btoa === undefined) {
    targetContext.fillText('This browser does not support SVG previews', 10, 50)
    // Use the canvg fall-back if the function btoa is not available
    return exportImageWithCanvg(svgElement)
  }

  return new Promise(resolve => {
    // The SVG image is now used as the source of an HTML image element,
    // which is then rendered onto a Canvas element.

    // An image that gets the export SVG in the Data URL format
    const svgImage = new Image()
    svgImage.onload = () => {
      targetContext.clearRect(0, 0, targetCanvas.width, targetCanvas.height)
      targetCanvas.width = size.width + (margins.left + margins.right)
      targetCanvas.height = size.height + (margins.top + margins.bottom)

      // IE 11 on Windows 7 needs a timeout here
      setTimeout(
        () => {
          try {
            targetContext.drawImage(svgImage, margins.left, margins.top)
            // When the svg image has been rendered to the Canvas,
            // the raster image can be exported from the Canvas.
            const pngImage = new Image()
            // The following 'toDataURL' function throws a security error in IE
            pngImage.src = targetCanvas.toDataURL('image/png')
            pngImage.onload = () => resolve(pngImage)
          } catch (error) {
            // Use the canvg fall-back when the above solution doesn't work
            resolve(exportImageWithCanvg(svgElement))
          }
        },
        ieVersion > -1 ? 100 : 0
      )
    }
    svgImage.src = svgUrl
  })
}

/**
 * Use canvg as fallback if the default approach is not available.
 * @param {!SVGElement} svgElement
 * @returns {!Promise.<HTMLImageElement>}
 */
async function exportImageWithCanvg(svgElement) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const serializedSvg = new XMLSerializer().serializeToString(svgElement)
  const canvgRenderer = await canvg.Canvg.from(ctx, serializedSvg)
  await canvgRenderer.render()

  return new Promise(resolve => {
    const image = new Image()
    image.src = canvas.toDataURL()
    image.onload = () => resolve(image)
  })
}
