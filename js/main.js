
function create() {
  var container = document.getElementById("mynetwork");
  var options = {};
  var graph1 = new Graph(document.getElementById("textareaGraph").value);
  var productions= new Productions(document.getElementById("textareaProductions").value,document.getElementById("textareaTransformations").value);
  var network = new vis.Network(container, graph1, options);
}

function produce(){

}