class Graph {

    constructor(DOTstring) {
        var parsedData = vis.parseDOTNetwork(DOTstring);
        this.nodes = parsedData.nodes
        this.edges = parsedData.edges
        console.log(parsedData)
        this.stats = new Stats(this.nodes, this.edges)
    }
    
}