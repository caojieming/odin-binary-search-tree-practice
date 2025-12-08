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
