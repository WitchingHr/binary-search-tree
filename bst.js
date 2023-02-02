function Node(data, left = null, right = null) {
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

    insert: function(value, position = this.root) {
      // If node already exists
      if (value === position.data) return;

      // If less than root
      if (value < position.data) {
        if (position.left === null) {
          // Add node
          position.left = Node(value);
          return;
        }
        // Go left
        this.insert(value, position.left);
        return;
      }

      // If greater than root
      if (value > position.data) {
        if (position.right === null) {
          // Add node
          position.left = Node(value);
          return;
        }
        // Go right
        this.insert(value, position.right);
        return;
      }
    },

    delete: function(value, position = this.root) {
      // Base case
      if (position === null) return position;

      // If value doesn't equal root
      if (value < position.data) {
        // Go left
        position.left = this.delete(value, position.left);
      } else if (value > position.data) {
        // Go right
        position.right = this.delete(value, position.right);
      } 
      
      // If value equals root
      else {

        // If missing children, one or both
        if (position.left === null) {
          return position.right;
        } else if (position.right === null) {
          return position.left;
        }

        // If has both children
        let key = position.right.data;
        let root = position.right;

        // Find smallest node in right tree
        while (root.left !== null) {
          key = root.left.data;
          root = root.left;
        }

        // Set root data to smallest
        position.data = key;

        // Delete smallest, shift any children
        position.right = this.delete(key, position.right);
      }
      return position;
    },

    find: function(value, position = this.root) {
      // Base cases
      if (position === null) return "Node doesn't exist";
      if (value === position.data) return position;

      // Traverse tree
      if (value < position.data) {
        return this.find(value, position.left);
      } else if (value > position.data) {
        return this.find(value, position.right);
      }
    },

    levelOrder: function(fn) {
      const queue = [];
      queue.push(this.root);

      function populateArrays(array = []) {
        // Base case
        if (queue.length === 0) return array;

        const [ position ] = queue;
        array.push(position.data);

        // Queue children
        if (position.left !== null) {
          queue.push(position.left);
        }
        if (position.right !== null) {
          queue.push(position.right);
        }

        queue.shift();
        return populateArrays(array);
      }

      // Get breadth-first array
      const breadthFirst = populateArrays();

      // Execute passed function for each element with element as argument
      if (fn) {
        breadthFirst.forEach(element => {
          fn(element);
        });
      }

      return breadthFirst;
    },

    print: function(node = this.root, prefix = '', isLeft = true) {
      if (node.right !== null) {
        this.print(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
      }
      console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
      if (node.left !== null) {
        this.print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
    },

  };
}

// const myArr = [64, 2, 6, 72, 34, 4, 6, 63, 6, 4, 13, 12];
// const tree = Tree(myArr);
// tree.print();

// let sum = 0;
// function getSum(x) {
//   return sum += x;
// }
