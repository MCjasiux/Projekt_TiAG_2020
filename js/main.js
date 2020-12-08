graphHistory = []
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
  sel.addEventListener("change", () => {
    network = new vis.Network(container, graphHistory[sel.value], options)
  })
  for (let i = 0; i < series.length; i++) {
    const prodNumber = parseInt(series[i])-1;
    productions.productionList[prodNumber].apply(graph1)
    graphHistory.push(JSON.parse(JSON.stringify(graph1)))
    let o = document.createElement("option")
    o.innerText = i + 1
    o.value = i + 1//parseInt(element)
    sel.appendChild(o)

  }
}
