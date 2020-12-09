class Graph {
    stats
    constructor(DOTstring) {
        var parsedData = vis.parseDOTNetwork(DOTstring);
        this.nodes = parsedData.nodes
        this.edges = parsedData.edges
        //console.log(parsedData)
        //this.stats = new Stats(this.nodes, this.edges)
    }
    findLabel(label) {
        for(var i=0;i<this.nodes.length;i++){
            if (this.nodes[i].label==label) return this.nodes[i]
            
        }

        return -1
    }

}