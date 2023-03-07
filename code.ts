figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type ==="actionGenerate"){
function generateHTMLCSS() {
  const nodes = figma.currentPage.selection;
  if (nodes.length !== 1 || nodes[0].type !== "FRAME") {
    figma.ui.postMessage({ error: "Please select a single Frame." });
    return;
  }

  const node = nodes[0] as FrameNode;
  const layers = node.children;

  const css = `
    .frame {
      position: relative;
      width: ${node.width}px;
      height: ${node.height}px;
    }
  `;

  let html = `<div class="frame">`;

  for (const layer of layers) {
    const { x, y, width, height } = layer;
    const position = `top: ${y}px; left: ${x}px;`;
    const style = `position: absolute; width: ${width}px; height: ${height}px; ${position}`;

    if (layer.type === "RECTANGLE") {
      
      //const { fills, strokes } = layer;
      //const backgroundColor = fills[0].color;
      //const borderColor = strokes[0].color;
      //const borderWidth = strokes[0].thickness;
      let bColor
      let color = layer.fills[0].color
      const {x, y, height, width} = node;
      let opacity = layer.fills[0].opacity;
      let bOpacity;
      let bSize = node.strokeWeight;
      if(node.strokes.length>0){
          
          bOpacity = node.strokes[0].opacity
          bColor = node.strokes[0].color
          
      
      }
      function strokecol(data){
          let exp = (data == bColor ? {bOpacity} : {opacity})
          const[finalOpacity] = Object.values(exp)
          const strokeColor ={
              r : Math.ceil(data.r*255),
              g : Math.ceil(data.g*255),
              b : Math.ceil(data.b*255),
              a : finalOpacity
      }
          let [r,g,b,a] = Object.values(strokeColor)
          let rgba = `${r},${g},${b},${a}`
      return (rgba)
      }

      html += `<div style="${style} background-color: ${color}; border: ${bSize}px solid ${bColor};"></div>`;
    } else if (layer.type === "TEXT") {
      const { characters, style: { fontName, fontSize, lineHeightPx } } = layer;

      html += `<div style="${style} font-family: ${fontName.family}; font-size: ${fontSize}px; line-height: ${lineHeightPx}px;">${characters}</div>`;
    }
  }

  html += `</div>`;
  console.log(html, css)


  }}}

