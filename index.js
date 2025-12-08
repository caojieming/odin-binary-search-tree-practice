class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }


    buildTree(array) {
        // first need to remove dupes
        // covert to set then back to array to remove dupes
        const noDupes = new Set(array);
        array = Array.from(noDupes);

        // then need to sort array (sort() sort alphabetically by default, so need to create a function for integer comparison)
        array.sort((a, b) => a - b);

        // now can create a bst
        return this.treeSort(array, 0, (array.length - 1));
    }
    treeSort(array, start, end) {
        // base case, start point has passed end point, so stop recursing
        if (start > end) {
            return null;
        }
        else {
            // get midpoint between start and end
            let mid = start + Math.floor((end - start) / 2);
            // create the node for the midpoint value
            let root = new Node(array[mid]);

            // split from midpoint into 2 more sorts, and attach them as left and right nodes of the midpoint
            root.left = this.treeSort(array, start, mid - 1);
            root.right = this.treeSort(array, mid + 1, end);

            // return current node
            return root;
        }
    }


    insert(value) {
        this.nodeInsert(this.root, value);
    }
    nodeInsert(currNode, value) {
        // base case, create new node (then for the previous layer, this new node is then set to right or left of the previous layer's currNode)
        if(currNode === null) {
            return new Node(value);
        }
        else {
            if(value < currNode.value) {
                currNode.left = this.nodeInsert(currNode.left, value);
            }
            else if(value > currNode.value) {
                currNode.right = this.nodeInsert(currNode.right, value);
            }

            // return the currNode, whether it's changed by the above statements or not (if the inserted value was a dupe, then this just returns the unchanged node)
            return currNode;
        }
    }


    deleteItem(value) {
        this.deleteNode(this.root, value);
    }
    deleteNode(currNode, value) {
        // base case, didn't find the node, so just return currNode (basically do nothing)
        if (currNode === null) {
            return currNode;
        }
        // value less than currNode, go left
        else if (value < currNode.value)
            currNode.left = this.deleteNode(currNode.left, value);
        // value greater than currNode, go right
        else if (value > currNode.value)
            currNode.right = this.deleteNode(currNode.right, value);
        // value equal, found the node to delete
        else {
            // currNode has 0 or 1 child, return that child (setting the parent node's child to currNode child)
            if (currNode.left === null) {
                return currNode.right;
            }
            if (currNode.right === null) {
                return currNode.left;
            }

            // currNode has 2 children, find a value within the tree that's close to the currNode's value
            const successor = this.getSuccessor(currNode);
            currNode.value = successor.value;
            // delete the successor by calling deleteNode() on it
            currNode.right = this.deleteNode(currNode.right, successor.value);
        }
        return currNode;
    }
    getSuccessor(currNode) {
        // go right once, then left until you reach a null (on the left), this is one way to get a number close to currNode
        currNode = currNode.right;
        while (currNode !== null && currNode.left !== null)
            currNode = currNode.left;
        return currNode;
    }


    find(value) {

    }


    levelOrderForEach(callback) {

    }


    inOrderForEach(callback) {

    }


    preOrderForEach(callback) {

    }


    postOrderForEach(callback) {

    }


    height(value) {

    }


    depth(value) {

    }


    isBalanced() {

    }


    rebalance() {

    }
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
