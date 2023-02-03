# Binary Search Tree

Binary search tree data structure constructor with basic manipulation algorithms

## Methods:

-   `.insert(value)` - inserts new node into tree
-   `.delete(value)` - deletes specified node from tree
-   `.find(value)` - returns node with specified value
-   `.levelOrder(fn)` - returns array in breadth-first order. if passed a function, will execute function with each element as argument in breadth-first sequence
-   `.inorder(fn)` - returns in-ordered array. if passed a function, will execute function with each element as argument in-order sequence
-   `.preorder(fn)` - returns pre-ordered array. if passed a function, will execute function with each element as argument in pre-order sequence
-   `.postorder(fn)` - returns post-ordered array. if passed a function, will execute function with each element as argument in pre-order sequence
-   `.height(value)` - returns height for specified node
-   `.depth(value)` - returns depth of specified node
-   `.isBalanced` - returns boolean for balance of tree
-   `.rebalance()` - rebalances tree
