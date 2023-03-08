figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type ==="actionGenerate"){
function generateHTMLCSS() {
  const nodes = figma.currentPage.selection;
  if (nodes.length !== 1 || nodes[0].type !== "FRAME") {
    figma.closePlugin ("Please select a single Frame.");
    return;
  }
  //Global variables//
  const node = nodes[0];
  const layers = node.children;
  let fColor = node.fills[0].color;
  let fOpacity = node.opacity;
  let frameColor;
  let frameStrokeColor;
  let fSOpacity;
  let fSColor;
  let fSSize = node.strokeWeight;
  let rgba;
  /////////////////
  let bOpacity;
  let opacity;
  let color;
  let bColor;
  let bSize;
  let align;
  let bordColor;
  let borderAlign;
  let strokeHtml = " ";
  let fillHtml;
  let frameStrokeHtml = "";
  let backColor;
  let names;
  let html = `<div class="frame">`;
  let layer;
  let transform;

// Function to convert the color//

  function strokecol(data){
    let finalOpacity;
    if (data === bColor){
      finalOpacity = bOpacity;
    }
    else if (data === color){
      finalOpacity = opacity;
    }
    else if (data === fColor){
      finalOpacity = fOpacity;
    }
    else if (data === fSColor){
      finalOpacity = fSOpacity;
    }
    //const[finalOpacity] = Object.values(exp)
    const strokeColor ={
        r : Math.ceil(data.r*255),
        g : Math.ceil(data.g*255),
        b : Math.ceil(data.b*255),
        a : finalOpacity
}
    let [r,g,b,a] = Object.values(strokeColor)
     rgba = r+","+g+","+b+","+a;
return (rgba)
}

if(node.strokes.length>0){
          
  fSOpacity = node.strokes[0].opacity;
  fSColor = node.strokes[0].color;
  frameStrokeColor = strokecol(fSColor)
  frameStrokeHtml =`\nborder:${fSSize}px solid rgba(${frameStrokeColor});`
  
     
}
frameColor = strokecol(fColor)

//Stroke size and position//

function strokeal(){
  let bAlign;
  if(align == "INSIDE"){

    bAlign = `box-sizing: border-box;\nborder: ${bSize}px solid`
    
  } 
  //if(align == "OUTSIDE"){
//
  //}
  //if(align =="CENTER"){
  //  bAlign = `border: ${bSize}px solid`
  //}
  //else{}
  return bAlign;
}

const css = `
\n.frame {
  background-color: rgba(${frameColor});${frameStrokeHtml}
  position: relative;
  width: ${node.width}px;
  height: ${node.height}px;
}
`;



  for (layer of layers) {
    let { x, y, width, height } = layer;
    const position = `\ntop: ${y}px; \nleft: ${x}px;`;
    const style = `\nposition: absolute;\nwidth: ${width}px;\nheight: ${height}px; ${position}`;
    //console.log(layer.type)

    if (layer.type === "RECTANGLE") {

      names = layer.name;

      if (layer.fills.length > 0) {

        color = layer.fills[0].color;
        opacity = layer.fills[0].opacity;
        backColor = strokecol(color)
        fillHtml = `rgba(${backColor});`;
        

      }

      if(layer.strokes.length>0){
          
        bOpacity = layer.strokes[0].opacity
        bColor = layer.strokes[0].color
        bSize = layer.strokeWeight;
        align = layer.strokeAlign;
        bordColor = strokecol(bColor)
        borderAlign = strokeal()
        strokeHtml = `\n${borderAlign} rgba(${bordColor});`;
    }


      html += `\n\n<div name=${names}; style="\n${style} \nbackground-color: ${fillHtml} ${strokeHtml}"></div>`;


      strokeHtml = "";
      borderAlign = "";
      bordColor = "";
      align = "";
      bSize = "";
      bColor = "";
      bOpacity = "";
      fillHtml = "";
      backColor = "";
      color = "";
      opacity = "";
      fillHtml = "";
      names= "";

    } 
    
    else if (layer.type === "TEXT") {

      
      //console.log(layer)
      const { characters, fontName, fontSize, lineHeight,fontWeight } = layer;

      if (layer.fills.length > 0) {

        color = layer.fills[0].color;
        opacity = layer.fills[0].opacity;
        backColor = strokecol(color)
        fillHtml = `color: rgba(${backColor});`;
        

      }

      if(layer.strokes.length>0){
          
        bOpacity = layer.strokes[0].opacity
        bColor = layer.strokes[0].color
        bSize = layer.strokeWeight;
        align = layer.strokeAlign;
        bordColor = strokecol(bColor)
        borderAlign = strokeal()
        strokeHtml = `\n${borderAlign} rgba(${bordColor});`;

    }
//
      html += `\n\n<p style="${style} \nfont-family: ${fontName.family};\nfont-style: ${fontName.style}; \nfont-weight: ${fontWeight}; \nfont-size: ${fontSize}px; \nline-height: ${lineHeight.value}px; \n${fillHtml} ${strokeHtml}">${characters}</p>`;

      strokeHtml = "";
      borderAlign = "";
      bordColor = "";
      align = "";
      bSize = "";
      bColor = "";
      bOpacity = "";
      fillHtml = "";
      backColor = "";
      color = "";
      opacity = "";
      fillHtml = "";
      
    }

    else if(layer.type == "LINE"){
      //console.log(layer)
      bOpacity = layer.strokes[0].opacity
      bColor = layer.strokes[0].color
      bSize = layer.strokeWeight;
      align = layer.strokeAlign;
      bordColor = strokecol(bColor);
      borderAlign = strokeal();
      transform = Math.floor(Math.abs(layer.rotation));
      strokeHtml = `rgba(${bordColor});`;

      html += `\n\n<div style="${style} \nbackground-color: ${strokeHtml}\nheight: ${bSize}px;\ntransform: rotate(${transform}deg);"></div>`;

      strokeHtml = "";
      borderAlign = "";
      bordColor = "";
      align = "";
      bSize = "";
      bColor = "";
      bOpacity = "";
      fillHtml = "";
      backColor = "";
      color = "";
      opacity = "";
      fillHtml = "";
    }


  }
 

  html += `</div>`;
  console.log(html, css)


  } generateHTMLCSS()
  }}

  
