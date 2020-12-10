graphHistory = []
let stats
let productions
let colors = {
  "A": "#ff3300",
  "B": "#009933",
  "C": "#3333ff",
  "a": "#ffcc99",
  "b": "#99ff99",
  "c": "#99ccff"
}
function create() {
  graphHistory = [];
  var container = document.getElementById("mynetwork");
  var options = {};
  var constructionString = document.getElementById("textareaGraph").value;
  constructionString = constructionString.replaceAll("\n", "");
  var graph1 = new Graph(constructionString.match(/G\_0.*?}/g)[0]);
  graph1.color(colors)
  productions = new Productions(document.getElementById("textareaGraph").value, document.getElementById("textareaTransformations").value);
  var network = new vis.Network(container, graph1, options);
  let series = document.getElementById("textareaProductionSeries").value.split(",")
  let sel = document.createElement("select")
  let panel = document.getElementById("controlPanel")
  panel.innerHTML = ""
  panel.appendChild(sel)
  option0 = document.createElement("option")
  option0.innerText = 0
  option0.value = 0
  sel.appendChild(option0)

  sel.addEventListener("change", () => {
    let currentGraph = graphHistory[sel.value]
    network = new vis.Network(container, currentGraph, options)
    console.log(currentGraph)
    stats = new Stats(currentGraph.nodes, currentGraph.edges)
    stats.update()
    stats.write()
  })

  graphHistory.push(JSON.parse(JSON.stringify(graph1)))
  for (let i = 0; i < series.length; i++) {
    const prodNumber = parseInt(series[i]) - 1;
    let currentProduction = productions.productionList[prodNumber]
    currentProduction.apply(graph1)
    graph1.color(colors)
    if (i == series.length - 1) {
      graphHistory.push(graph1)
    } else graphHistory.push(JSON.parse(JSON.stringify(graph1)))
    let o = document.createElement("option")
    o.innerText = i + 1
    o.value = i + 1//parseInt(element)
    sel.appendChild(o)

  }
  let firstStats = new Stats(graphHistory[0].nodes, graphHistory[0].edges)
  firstStats.update()
  firstStats.write()
  console.log(graphHistory)
}
