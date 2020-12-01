function create() {
  var container = document.getElementById("mynetwork");
  var options = {};
  var graph1 = new Graph(document.getElementById("textareaGraph").value)
  var network = new vis.Network(container, graph1, options);
}
