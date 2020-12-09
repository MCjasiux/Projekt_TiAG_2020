graphHistory = []
let stats
function create() {
  var container = document.getElementById("mynetwork");
  var options = {};
  var graph1 = new Graph(document.getElementById("textareaGraph").value);
  graphHistory.push(JSON.parse(JSON.stringify(graph1)))
  var productions = new Productions(document.getElementById("textareaProductions").value, document.getElementById("textareaTransformations").value);
  var network = new vis.Network(container, graph1, options);
  let series = document.getElementById("textareaProductionSeries").value.split(",")
  let sel = document.createElement("select")
  let panel = document.getElementById("controlPanel")
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

  for (let i = 0; i < series.length; i++) {
    const prodNumber = parseInt(series[i]) - 1;
    let currentProduction = productions.productionList[prodNumber]
    currentProduction.apply(graph1)
    graphHistory.push(JSON.parse(JSON.stringify(graph1)))
    let o = document.createElement("option")
    o.innerText = i + 1
    o.value = i + 1//parseInt(element)
    sel.appendChild(o)

  }
  console.log(graphHistory)
}
