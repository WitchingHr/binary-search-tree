# Binary Search Tree

Binary search tree data structure constructor with basic manipulation algorithms

## Methods:

-   `.insert(value)`  _inserts new node into tree_
-   `.delete(value)`  _deletes specified node from tree_
-   `.find(value)`  _returns node with specified value_
-   `.levelOrder(fn)`  _returns array in breadth-first order. if passed a function, will execute function with each element as argument in breadth-first sequence_
-   `.inorder(fn)`  _returns in-ordered array. if passed a function, will execute function with each element as argument in-order sequence_
-   `.preorder(fn)`  _returns pre-ordered array. if passed a function, will execute function with each element as argument in pre-order sequence_
-   `.postorder(fn)`  _returns post-ordered array. if passed a function, will execute function with each element as argument in pre-order sequence_
-   `.height(value)`  _returns height for specified node_
-   `.depth(value)` _returns depth of specified node_
-   `.isBalanced`  _returns boolean for balance of tree_
-   `.rebalance()`  _rebalances tree_
