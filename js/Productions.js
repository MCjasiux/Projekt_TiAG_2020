class Productions {
    constructor(productionString,transformationString) {
        this.productionList = [];
       // let fullString = productionString
        productionString = productionString.replaceAll("\n", "")
        transformationString = transformationString.replaceAll("\n", "")
        let leftHands = productionString.match(/LHS.*?}/g)
        let rightHands = productionString.match(/RHS.*?}/g)
        let transformations = JSON.parse(transformationString);
        console.log(transformations)
        // console.log(leftHands)
        // console.log(rightHands)
        for (let i = 0; i < leftHands.length; i++) {
            const elementLeft = leftHands[i];
            const elementRight = rightHands[i];
             console.log(elementLeft)
             console.log(transformations[i+1])
            var parsedRightHand = vis.parseDOTNetwork(elementRight);
            let productionObj = {
                name: i + 1,
                leftSide: elementLeft.match(/\".*?"/)[0].slice(1, 2),   //tylko do literowych etykiet
                rightSideNodes: parsedRightHand.nodes,
                rightSideEdges: parsedRightHand.edges,
                transformation: transformations[i+1]
            }
            this.productionList[i] = new Production(productionObj);
        }
        console.log(this.productionList)

    }

    
}