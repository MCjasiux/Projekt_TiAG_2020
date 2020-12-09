class Production {
    constructor(productionObj){
        this.name=productionObj.name;
        this.leftSide=productionObj.leftSide;
        this.rightSideNodes=productionObj.rightSideNodes
        this.rightSideEdges=productionObj.rightSideEdges
        this.transformation=productionObj.transformation
    }
    findDelta(id){
        for(var i=1;i<this.rightSideNodes.length;i++){
            if(id==this.rightSideNodes[i].id){
                return i-1;
            }
        }
        return -1;
    }

    apply(graph){
        //console.log(this.name);
        //console.log(this.rightSideNodes);
        //console.log(this.rightSideEdges);
        //console.log(this.transformation); 
        var firstObject=graph.findLabel(this.leftSide);
        if(firstObject==-1) return;
        var affectedEdges=[];
        //Usunięcie krawędzi powiązanych z wierzchołkiem lewej strony produkcji
        for(var i=0;i<graph.edges.length;i++){
            if(graph.edges[i].from==firstObject.id || graph.edges[i].to==firstObject.id){
                affectedEdges.push(graph.edges.splice(i,1)[0]);
                i--;
            }
        }

        //Przejście z lewej strony produkcji do prawej
        firstObject.label=this.rightSideNodes[0].label;
        var rightBeginning=graph.nodes.length;
        for(var i=1;i<this.rightSideNodes.length;i++){
            graph.nodes.push({id:rightBeginning+i-1,label:this.rightSideNodes[i].label});
        }
        for(var i=0;i<this.rightSideEdges.length;i++){
            if(this.rightSideEdges[i].from==this.rightSideNodes[0].id){
                graph.edges.push({from:firstObject.id,to:rightBeginning+this.findDelta(this.rightSideEdges[i].to)});
            }else if(this.rightSideEdges[i].to==this.rightSideNodes[0].id){
                graph.edges.push({from:rightBeginning+this.findDelta(this.rightSideEdges[i].from),to:firstObject.id});
            }else{
                graph.edges.push({from:rightBeginning+this.findDelta(this.rightSideEdges[i].from),to:rightBeginning+this.findDelta(this.rightSideEdges[i].to)})
            }
        }

        //Ponowne dołączenie krawędzi
        //console.log(affectedEdges);
        for(var i=0;i<affectedEdges.length;i++){
            var affectedNode;
            if(affectedEdges[i].from==firstObject.id){
                affectedNode=affectedEdges[i].to;
            }else{
                affectedNode=affectedEdges[i].from;
            }
            //console.log(firstObject);
            //console.log(affectedEdges);
            //console.log(affectedNode);
            var searchedLabel=this.transformation[graph.findById(affectedNode).label];
            if(searchedLabel==firstObject.label){
                graph.edges.push({from:firstObject.id,to:affectedNode});
            }else if(searchedLabel!="-"){
                for(var j=rightBeginning;j<graph.nodes.length;j++){
                    if(graph.nodes[j].label==searchedLabel){
                        graph.edges.push({from:graph.nodes[j].id,to:affectedNode});
                        break;
                    }
                }
            }
        }
        
        //console.log(graph);
        
    }
}