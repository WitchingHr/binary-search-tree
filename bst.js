function Node(data, left, right) {
  return {
    data,
    left,
    right,
  };
}

function BuildTree(array, start = 0, end = array.length - 1) {
  // Base case
  if (start > end) return null;

  // Get root node
  const middle = Math.floor((start + end) / 2);
  const root = Node(array[middle]);

  // Recursion, Get left and right nodes
  root.left = BuildTree(array, start, middle - 1);
  root.right = BuildTree(array, middle + 1, end);

  return root;
}

function Tree(array) {
  // Sort array numerically
  const sorted = array.sort((a, b) => (a < b ? -1 : 1));

  // Remove duplicate numbers
  const noDupes = [...new Set(sorted)];

  return {
    root: BuildTree(noDupes),
  };
}

// Print tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const myArr = [64, 2, 6, 72, 34, 4, 6, 63, 6, 4, 13, 12];
const myTree = Tree(myArr);
prettyPrint(myTree.root);
