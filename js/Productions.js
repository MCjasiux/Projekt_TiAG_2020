class Productions {
    constructor(productionString) {
        this.productionList = [];
       // let fullString = productionString
        productionString = productionString.replaceAll("\n", "")
        let leftHands = productionString.match(/LHS.*?}/g)
        let rightHands = productionString.match(/RHS.*?}/g)
        // console.log(leftHands)
        // console.log(rightHands)
        for (let i = 0; i < leftHands.length; i++) {
            const elementLeft = leftHands[i];
            const elementRight = rightHands[i];
            // console.log(elementLeft)
            var parsedRightHand = vis.parseDOTNetwork(elementRight);
            let productionObj = {
                name: i + 1,
                leftSide: elementLeft.match(/\".*?"/)[0].slice(1, 2),   //tylko do literowych etykiet
                rightSideNodes: parsedRightHand.nodes,
                rightSideEdges: parsedRightHand.edges

            }
            this.productionList[i] = productionObj
        }
        console.log(this.productionList)

    }
}