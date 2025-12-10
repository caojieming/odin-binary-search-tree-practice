function createRandArray(length, range) {
    const array = [];
    for(let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * range));
    }
    return array;
}


console.log("creating array");
const arr = createRandArray(20, 100); // may contain dupes
console.log(arr);
console.log();

console.log("creating tree");
const bst = new Tree(arr);
prettyPrint(bst.root);
console.log();


console.log("isBalanced(): true (was just created)");
console.log(bst.isBalanced());
console.log();


let temp = [];
console.log("all elements in level order:");
bst.levelOrderForEach((e) => temp.push(e.value));
console.log(temp);
temp = [];
console.log();

console.log("all elements in pre order:");
bst.preOrderForEach((e) => temp.push(e.value));
console.log(temp);
temp = [];
console.log();

console.log("all elements in post order:");
bst.postOrderForEach((e) => temp.push(e.value));
console.log(temp);
temp = [];
console.log();

console.log("all elements in order:");
bst.inOrderForEach((e) => temp.push(e.value));
console.log(temp);
temp = [];
console.log();


console.log("unbalancing tree with 999, 9999, 99999, 999999");
bst.insert(999);
bst.insert(9999);
bst.insert(99999);
bst.insert(999999);
prettyPrint(bst.root);
console.log();

console.log("checking isBalanced(): false");
console.log(bst.isBalanced());
console.log();


console.log("rebalancing tree, rebalance()");
bst.rebalance();
prettyPrint(bst.root);
console.log();

console.log("checking isBalanced(): true");
console.log(bst.isBalanced());
console.log();


console.log("all elements in level order:");
bst.levelOrderForEach((e) => temp.push(e.value));
console.log(temp);
temp = [];
console.log();

console.log("all elements in pre order:");
bst.preOrderForEach((e) => temp.push(e.value));
console.log(temp);
temp = [];
console.log();

console.log("all elements in post order:");
bst.postOrderForEach((e) => temp.push(e.value));
console.log(temp);
temp = [];
console.log();

console.log("all elements in order:");
bst.inOrderForEach((e) => temp.push(e.value));
console.log(temp);
temp = [];
console.log();


console.log("testing error throwing when callback is not a function");
bst.inOrderForEach(2);
console.log(temp);
temp = [];
console.log();
