// create an array with nodes
var nodes = new vis.DataSet([
  { id: 1, label: "X" },
  { id: 2, label: "a" },
  { id: 3, label: "b" },
  { id: 4, label: "c" },
  { id: 5, label: "d" },
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 1, to: 5 },
  //{ from: 3, to: 3 },
]);

// create a network
function create() {
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  var graph1 = new Graph(document.getElementById("textarea").value)
  var network = new vis.Network(container, graph1, options);
}
