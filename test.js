console.log("creating tree");
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
console.log();


console.log("pretty printing tree");
prettyPrint(tree.root);
console.log();


console.log("inserting 55");
tree.insert(55);
prettyPrint(tree.root);
console.log();


console.log("deleting 55 (leaf), 67 (higher rooted, splitting branch), and 8 (the root)");
tree.deleteItem(55);
prettyPrint(tree.root);
tree.deleteItem(67);
prettyPrint(tree.root);
tree.deleteItem(8);
prettyPrint(tree.root);
console.log();


console.log("finding node with value 324");
console.log(tree.find(324));
console.log();


console.log("levelOrderForEach((e) => console.log(e.value)), order should be: 9 4 324 1 5 23 6345 3 7");
tree.levelOrderForEach((e) => console.log(e.value));
console.log();


console.log("inOrderForEach((e) => console.log(e.value)), order should be ascending numerical order");
tree.inOrderForEach((e) => console.log(e.value));
console.log();


console.log("preOrderForEach((e) => console.log(e.value)), order should be: 9 4 1 3 5 7 324 23 6345");
tree.preOrderForEach((e) => console.log(e.value));
console.log();


console.log("postOrderForEach((e) => console.log(e.value)), order should be: 3 1 7 5 4 23 6345 324 9");
tree.postOrderForEach((e) => console.log(e.value));
console.log();


console.log("height() for 9, 4, 5, 7, 11: should return 3, 2, 1, 0, null");
console.log(tree.height(9));
console.log(tree.height(4));
console.log(tree.height(5));
console.log(tree.height(7));
console.log(tree.height(11));
console.log();


console.log("depth() for 9, 4, 5, 7, 11: should return 0, 1, 2, 3, null");
console.log(tree.depth(9));
console.log(tree.depth(4));
console.log(tree.depth(5));
console.log(tree.depth(7));
console.log(tree.depth(11));
console.log();


prettyPrint(tree.root);
console.log("isBalanced(): true");
console.log(tree.isBalanced());
console.log("add a 9999 and 99999 to unbalance tree");
tree.insert(9999);
tree.insert(99999);
prettyPrint(tree.root);
console.log("isBalanced(): false");
console.log(tree.isBalanced());
console.log();
