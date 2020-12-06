class Stats {
    nodes;
    edges;
    nodesNumber = 0;
    edgesNumber = 0;
    componentsNumber = 0
    avgDegree = 0
    avgDegreeOfLabel = {}
    avgNodesInComponentNumber = 0
    labels = []
    labelStats = {}
    connectedGraphs = {}
    subGraphsNumber=0
    constructor(nodes, edges) {
        this.nodes = nodes
        this.edges = edges
        this.update()
    }
    dfs(nodeId, dict) {
        this.edges.forEach(edge => {
            if (dict[nodeId] == undefined) {
                dict[nodeId] = nodeId
            }
            if (nodeId == edge.from && dict[edge.to] == undefined) {
                dict[edge.to] = dict[nodeId]
                this.dfs(edge.to, dict)
            }
            if (nodeId == edge.to && dict[edge.from] == undefined) {
                dict[edge.from] = dict[nodeId]
                this.dfs(edge.from, dict)
            }

        });
    }
    update() {
        this.nodesNumber = this.nodes.length
        this.edgesNumber = this.edges.length
        this.avgDegree = 2 * this.edgesNumber / this.nodesNumber
        this.labelStats = {}
        this.nodes.forEach(node => {
            if (this.labels.indexOf(node.label) == -1) {
                this.labels.push(node.label)
                this.labelStats[node.label] = { nodesNumber: 0, edgesNumber: 0 }
            }
            this.labelStats[node.label].nodesNumber++
        });
        this.edges.forEach(edge => {
            this.labelStats[edge.to].edgesNumber++
            this.labelStats[edge.from].edgesNumber++
        })

        let s = document.getElementById("statistics")
        s.innerText = ""
        s.innerText += "Liczba wierzchołków: " + this.nodesNumber + "\n";
        s.innerText += "Liczba krawędzi: " + this.edgesNumber + "\n"
        s.innerText += "Średni stopień wierzchołka: " + this.avgDegree + "\n"
        this.labels.forEach(label => {
            s.innerText += "Średni stopień wierzchołka o etykiecie " + label + ": " + this.labelStats[label].edgesNumber / this.labelStats[label].nodesNumber + "\n"
        })
        this.connectedGraphs = {}

        this.nodes.forEach(node => {
            if (this.connectedGraphs[node.id] == undefined) {
                this.connectedGraphs[node.id] = node.id
            }
            this.dfs(node.id, this.connectedGraphs)
        });
        let temp = []
        Object.keys(this.connectedGraphs).forEach(key => {
            if (temp.indexOf(this.connectedGraphs[key]) == -1) {
                temp.push(this.connectedGraphs[key])
            }
        });
        this.subGraphsNumber=temp.length
        s.innerText += "Liczba grafów spójnych:" + this.subGraphsNumber + "\n";
        console.log(this)
    }
}