class Stats {
    nodesNumber = 0;
    edgesNumber = 0;
    componentsNumber = 0
    avgDegree = 0
    avgDegreeV = 0
    avgNodesInComponentNumber = 0
    constructor(nodes, edges) {
        this.nodesNumber = nodes.length
        this.edgesNumber = edges.length
        this.componentsNumber = 0
        this.avgDegree = 0
        this.avgDegreeV = 0
        this.avgNodesInComponentNumber = 0
    }
}