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

    apply(Graph){
        firstObject=Graph.findLabel(this.leftSide);
        affectedEdges=[];
        //Usunięcie krawędzi powiązanych z wierzchołkiem lewej strony produkcji
        for(var i=0;i<Graph.edges.length;i++){
            if(Graph.edges[i].from==firstObject.id || Graph.edges[i].to==firstObject.id){
                affectedEdges.push(Graph.edges.splice(i,1));
                i--;
            }
        }

        //Przejście z lewej strony produkcji do prawej
        firstObject.label=this.rightSideNodes[0].label;
        var rightBeginning=Graph.nodes.length;
        for(var i=1;i<this.rightSideNodes.length;i++){
            Graph.nodes.push({id:rightBeginning+i-1,label:this.rightSideNodes[i].label});
        }
        for(var i=0;i<this.rightSideEdges.length;i++){
            if(this.rightSideEdges[i].from==this.rightSideNodes[0].id){
                Graph.edges.push({from:firstObject.id,to:rightBeginning+this.findDelta(this.rightSideEdges[i].to)});
            }else if(this.rightSideEdges[i].to==this.rightSideNodes[0].id){
                Graph.edges.push({from:rightBeginning+this.findDelta(this.rightSideEdges[i].from),to:firstObject.id});
            }else{
                Graph.edges.push({from:rightBeginning+this.findDelta(this.rightSideEdges[i].from),to:rightBeginning+this.findDelta(this.rightSideEdges[i].to)})
            }
        }

        //Ponowne dołączenie krawędzi
        for(var i=0;i<affectedEdges.length;i++){
            var affectedNode;
            if(affectedEdges[i].from==firstObject.id){
                affectedNode=affectedEdges[i].to;
            }else{
                affectedNode=affectedEdges[i].from;
            }

            var searchedLabel=this.transformation[affectedNode.label];
            if(searchedLabel==firstObject.label){
                Graph.edges.push({from:firstObject.id,to:affectedNode});
            }else if(searchedLabel!="-"){
                for(var j=rightBeginning;j<Graph.nodes.length;j++){
                    if(Graph.nodes[j].label==searchedLabel){
                        Graph.edges.push({from:Graph.nodes[j].id,to:affectedNode});
                        break;
                    }
                }
            }
        } 
        
    }
}