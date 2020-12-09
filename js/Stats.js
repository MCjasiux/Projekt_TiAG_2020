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
    labelTable = {}
    subGraphsNumber = 0
    constructor(nodes, edges) {
        this.nodes = nodes
        this.edges = edges
        this.update()
        this.write()
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
        this.labels = []
        this.labelStats = {}
        //console.log(this)
        this.nodes.forEach(node => {
            if (this.labels.indexOf(node.label) == -1) {
                this.labels.push(node.label)
                this.labelStats[node.label] = { nodesNumber: 0, edgesNumber: 0 }
            }

            this.labelStats[node.label].nodesNumber++
            if (this.labelTable[node.id] == undefined) {
                this.labelTable[node.id] = node.label
            }
        });
        this.edges.forEach(edge => {
            this.labelStats[this.labelTable[edge.from]].edgesNumber++
            this.labelStats[this.labelTable[edge.to]].edgesNumber++
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
        this.subGraphsNumber = temp.length
        // console.log(this)
    }
    write() {
        let s = document.getElementById("statistics")
        s.innerText = ""
        s.innerText += "Liczba wierzchołków: " + this.nodesNumber + "\n";
        s.innerText += "Liczba krawędzi: " + this.edgesNumber + "\n"
        s.innerText += "Średni stopień wierzchołka: " + this.avgDegree + "\n"
        this.labels.forEach(label => {
            s.innerText += "Średni stopień wierzchołka o etykiecie " + label + ": " + this.labelStats[label].edgesNumber / this.labelStats[label].nodesNumber + "\n"
        })
        s.innerText += "Liczba grafów spójnych:" + this.subGraphsNumber + "\n";

    }
}