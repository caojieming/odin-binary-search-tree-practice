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
        return this.findNode(this.root, value);
    }
    findNode(currNode, value) {
        // base case, reached a null
        if(currNode === null) {
            return null;
        }
        else {
            // value equals currNode, found node
            if(value === currNode.value) {
                return currNode;
            }
            // value is less than currNode, go left
            else if(value < currNode.value) {
                return this.findNode(currNode.left, value);
            }
            // value is greater than currNode, go right
            else {
                return this.findNode(currNode.right, value);
            }
        }
    }


    levelOrderForEach(callback) {
        // 2d array, first index is the layer/level of node in the BST (starting at 0 for the root), second index is from left to right order within the level
        const levelList = [];

        // directly generates bfs list in levelList
        this.bfs(this.root, 0, levelList);

        // flatten levelList into 1d array, then apply callback function to all nodes
        const levelOrder = levelList.flat();
        levelOrder.forEach((e) => callback(e));
    }
    bfs(currNode, currLevel, levelList) {
        // base case, stop/do nothing
        if(currNode === null) {
            return;
        }
        else {
            // starting a new level, so create a new list
            if(currLevel >= levelList.length) {
                levelList.push([]);
            }
            // add currNode to levelList
            levelList[currLevel].push(currNode);
            // traverse the next level
            this.bfs(currNode.left, currLevel + 1, levelList);
            this.bfs(currNode.right, currLevel + 1, levelList);
        }
    }


    inOrderForEach(callback) {
        this.dfsInOrder(this.root, callback);
    }
    dfsInOrder(currNode, callback) {
        // base case, stop/do nothing
        if(currNode === null) {
            return;
        }
        else {
            this.dfsInOrder(currNode.left, callback);
            callback(currNode);
            this.dfsInOrder(currNode.right, callback);
        }
    }


    preOrderForEach(callback) {
        this.dfsPreOrder(this.root, callback);
    }
    dfsPreOrder(currNode, callback) {
        // base case, stop/do nothing
        if(currNode === null) {
            return;
        }
        else {
            callback(currNode);
            this.dfsPreOrder(currNode.left, callback);
            this.dfsPreOrder(currNode.right, callback);
        }
    }


    postOrderForEach(callback) {
        this.dfsPostOrder(this.root, callback);
    }
    dfsPostOrder(currNode, callback) {
        // base case, stop/do nothing
        if(currNode === null) {
            return;
        }
        else {
            this.dfsPostOrder(currNode.left, callback);
            this.dfsPostOrder(currNode.right, callback);
            callback(currNode);
        }
    }


    height(value) {
        // height is initially -inf so that incrementing it does nothing, and will stay doing nothing until the value has been found, at which point height is set to 0 and increments normally
        return this.findHeight(this.root, value, Number.NEGATIVE_INFINITY);
    }
    findHeight(currNode, value, height) {
        // base case, reached a null/leaf
        if(currNode === null) {
            // if height is negative (infinity), that means the value was never found, so return a null
            if(height < 0) {
                return null;
            }
            return height;
        }
        else {
            // value equals currNode, found node, set height to 0 so it can start incrementing normally
            if(value === currNode.value) {
                return Math.max(this.findHeight(currNode.left, value, 0), this.findHeight(currNode.right, value, 0));
            }
            // value is less than currNode, go left
            else if(value < currNode.value) {
                return this.findHeight(currNode.left, value, height + 1);
            }
            // value is greater than currNode, go right
            else {
                return this.findHeight(currNode.right, value, height + 1);
            }
        }
    }


    depth(value) {
        return this.findDepth(this.root, value, 0);
    }
    findDepth(currNode, value, depth) {
        // base case, reached a null/leaf without finding value
        if(currNode === null) {
            return null;
        }
        else {
            // value equals currNode, found node
            if(value === currNode.value) {
                return depth;
            }
            // value is less than currNode, go left
            else if(value < currNode.value) {
                return this.findDepth(currNode.left, value, depth + 1);
            }
            // value is greater than currNode, go right
            else {
                return this.findDepth(currNode.right, value, depth + 1);
            }
        }
    }


    isBalanced() {
        return this.checkBalance(this.root);
    }
    checkBalance(currNode) {
        // base case, null is technically balanced
        if(currNode === null) {
            return true;
        }
        else {
            // leaf, balanced by default
            if(currNode.left === null && currNode.right === null) {
                return true;
            }
            // left branch only, true if its height <= 1
            else if(currNode.right === null) {
                const leftNode = currNode.left;
                return this.findHeight(leftNode, leftNode.value, 0) <= 1;
            }
            // right branch only, true if its height <= 1
            else if(currNode.left === null) {
                const rightNode = currNode.right;
                return this.findHeight(rightNode, rightNode.value, 0) <= 1;
            }
            // 2 branches, true if the 2 branch heights have a difference <= 1
            else {
                const leftNode = currNode.left;
                const rightNode = currNode.right;

                // check current node's branches are balanced
                const leftHeight = this.findHeight(leftNode, leftNode.value, 0);
                const rightHeight = this.findHeight(rightNode, rightNode.value, 0);
                const balanced = Math.abs(leftHeight - rightHeight) <= 1;

                console.log(currNode.value);
                console.log(leftHeight);
                console.log(rightHeight);
                console.log();

                // recurse through rest of tree to check if rest of nodes are balanced
                const leftCheckBal = this.checkBalance(currNode.left);
                const rightCheckBal = this.checkBalance(currNode.right);

                return balanced && leftCheckBal && rightCheckBal;
            }
        }
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
