class Graph {

    constructor(DOTstring) {
        var parsedData = vis.parseDOTNetwork(DOTstring);
        this.nodes = parsedData.nodes
        this.edges = parsedData.edges
        this.stats = new Stats(this.nodes, this.edges)
    }
}