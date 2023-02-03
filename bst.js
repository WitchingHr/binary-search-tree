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

        // If left is empty
        if (position.left === null) {

          // Add node
          position.left = Node(value);
          return;
        }

        // Else Go left
        this.insert(value, position.left);
        return;
      }

      // If greater than root
      if (value > position.data) {

        // If right is empty
        if (position.right === null) {
          // Add node
          position.right = Node(value);
          return;
        }

        // Else Go right
        this.insert(value, position.right);
        return;
      }
    },

    delete: function(value, position = this.root) {
      // Base case
      if (position === null) return position;

      // If value is less than root
      if (value < position.data) {

        // Go left
        position.left = this.delete(value, position.left);

      // If value is greater than root
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

        // Set root to smallest
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

        // Go left
        return this.find(value, position.left);

      } else if (value > position.data) {

        // Go right
        return this.find(value, position.right);
      }
    },

    levelOrder: function(fn) {
      // Initialize queue
      const queue = [];
      queue.push(this.root);

      // Recursion
      function getArray(array = []) {
        // Base case
        if (queue.length === 0) return array;

        // Populate array
        const [ position ] = queue;
        array.push(position.data);

        // Enqueue children
        if (position.left !== null) {
          queue.push(position.left);
        }
        if (position.right !== null) {
          queue.push(position.right);
        }

        // Dequeue
        queue.shift();

        return getArray(array);
      }

      // Get array
      const breadthFirst = getArray();

      // Execute passed function for each element with element as argument
      if (fn) {
        breadthFirst.forEach(element => {
          fn(element);
        });
      }

      return breadthFirst;
    },

    inorder: function(fn) {
      // Recursion
      const getArray = (position = this.root, array = []) => {
        // Go left
        if (position.left) {
          getArray(position.left, array);
        }

        // Push root
        array.push(position.data);

        // Go right
        if (position.right) {
          getArray(position.right, array);
        }

        return array;
      }

      // Get array
      const inorderArray = getArray();

      // Execute passed function for each element with element as argument
      if (fn) {
        array.forEach(element => {
          fn(element);
        });
      }

      return inorderArray;
    },

    preorder: function(fn) {
      // Recursion
      const getArray = (position = this.root, array = []) => {
        // Push root
        array.push(position.data);

        // Go left
        if (position.left) {
          getArray(position.left, array);
        }

        // Go right
        if (position.right) {
          getArray(position.right, array);
        }

        return array;
      }

      // Get array
      const preorderArray = getArray();

      // Execute passed function for each element with element as argument
      if (fn) {
        preorderArray.forEach(element => {
          fn(element);
        });
      }

      return preorderArray;
    },

    postorder: function(fn) {
      // Recursion
      const getArray = (position = this.root, array = []) => {
        // Go left
        if (position.left) {
          getArray(position.left, array);
        }

        // Go right
        if (position.right) {
          getArray(position.right, array);
        }

        // Push root
        array.push(position.data);

        return array;
      }

      // Get array
      const postorderArray = getArray();

      // Execute passed function for each element with element as argument
      if (fn) {
        postorderArray.forEach(element => {
          fn(element);
        });
      }

      return postorderArray;
    },

    height: function(value, position, height = 0, most = 0) {
      // Find node, or set to root
      position = position || this.find(value);

      // Check left
      if (position.left) {

        // When going down
        height += 1;

        // Go left
        most = this.height(value, position.left, height, most);

        // When coming back up
        height -= 1;
      }
      
      // Check right
      if (position.right) {

        // When going down
        height += 1;
        
        // Go right
        most = this.height(value, position.right, height, most);

        // When coming back up
        height -= 1;
      }

      // Compare, set most
      if (height > most) most = height;

      return most;
    },

    depth: function(value, position = this.root, depth = 0) {
      // Base case
      if (value === position.data) return depth;

      // If less than root
      if (value < position.data) {

        // Set depth
        depth += 1;

        // Go left
        return this.depth(value, position.left, depth);
      }

      // If greather than root
      if (value > position.data) {

        // Set depth
        depth += 1;

        // Go right
        return this.depth(value, position.right, depth);
      }

      return "Node doesn't exist";
    },

    isBalanced: function() {
      // Get height of subtrees
      const left = this.height(null, this.root.left);
      const right = this.height(null, this.root.right);

      // Compare
      const result = Math.abs(left - right);
      return (result === 1 || result === 0) ? true : false;
    },

    rebalance: function() {
      // Get array
      const array = this.inorder();

      // Build new tree, set as root
      this.root = BuildTree(array);
    },

    print: function(node = this.root, prefix = '', isLeft = true) {
      // Black magic
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

// const array = [3, 2, 1, 4, 5];
// const tree = Tree(array);
// tree.print();
