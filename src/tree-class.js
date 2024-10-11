class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = this.removeDuplicates(this.sortArray(array));
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
  }

  sortArray = (array) => {
    return array.sort((a, b) => a - b);
  };

  removeDuplicates = (array) => {
    return [...new Set(array)];
  };

  getSuccessor = (curr) => {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  };

  delNode = (root, x) => {
    if (root === null) {
      return root;
    }

    // If key to be searched is in a subtree
    if (root.key > x) {
      root.left = this.delNode(root.left, x);
    } else if (root.key < x) {
      root.right = this.delNode(root.right, x);
    } else {
      // If root matches with the given key

      // Cases when root has 0 children or
      // only right child
      if (root.left === null) return root.right;

      // When root has only left child
      if (root.right === null) return root.left;

      // When both children are present
      let succ = this.getSuccessor(root);
      root.key = succ.key;
      root.right = this.delNode(root.right, succ.key);
    }
    return root;
  };

  find = (root, key) => {
    // Base Cases: root is null or key is
    // present at root
    if (root === null || root.key === key) return root;

    // Key is greater than root's key
    if (root.key < key) return this.find(root.right, key);

    // Key is smaller than root's key
    return this.find(root.left, key);
  };

  insert = (root, key) => {
    if (root == null) {
      return new Node(key);
    }

    if (root.key === key) {
      return root;
    }
    if (key < root.key) {
      root.left = this.insert(root.left, key);
    } else if (key > root.key) {
      root.right = this.insert(root.right, key);
    }
    return root;
  };

  levelOrder(callback) {
    if (!this.root) return;

    const queue = [this.root]; // Start with the root in the queue

    while (queue.length > 0) {
      const currentNode = queue.shift(); // Dequeue the front node
      callback(currentNode); // Call the callback on the current node

      // Enqueue the left and right children if they exist
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }
  inOrderTraversal(root = this.root) {
    if (root !== null) {
      this.inOrderTraversal(root.left);
      console.log(root.data);
      this.inOrderTraversal(root.right);
    }
  }

  PreOrder(node) {
    if (node == null) return;

    console.log(node.data + " ");

    this.PreOrder(node.left);
    this.PreOrder(node.right);
  }

  PostOrder(node) {
    if (node === null) {
      return;
    }

    // Traverse left subtree
    this.PostOrder(node.left);

    // Traverse right subtree
    this.PostOrder(node.right);

    // Visit Node
    console.log(node.data);
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    const heightDiff = Math.abs(leftHeight - rightHeight);
    if (heightDiff > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  inOrderToArray(node, array = []) {
    if (node !== null) {
      this.inOrderToArray(node.left, array);
      array.push(node.data);
      this.inOrderToArray(node.right, array);
    }
    return array;
  }

  rebalance() {
    const sortedArray = this.inOrderToArray(this.root);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }
  depth(node, root = this.root, currentDepth = 0) {
    if (root === null) {
      return -1; // Node not found in the tree
    }
    if (root === node) {
      return currentDepth;
    }

    const leftDepth = this.depth(node, root.left, currentDepth + 1);
    if (leftDepth !== -1) {
      return leftDepth;
    }

    return this.depth(node, root.right, currentDepth + 1);
  }

  buildTree = (arr, start, end) => {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);
    return root;
  };
}
// Helper function to generate an array of random numbers
function generateRandomArray(size, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

// Instantiate a Tree with an array of random numbers
const randomArray = generateRandomArray(10); // Adjust size as needed
console.log("Random Array:", randomArray);

let myTree = new Tree(randomArray);

// Confirm that the tree is balanced
console.log("Is the tree balanced?", myTree.isBalanced());

// Print elements in different traversal orders
console.log("Level Order:");
myTree.levelOrder((node) => console.log(node.data));

console.log("Pre-order:");
myTree.PreOrder(myTree.root);

console.log("Post-order:");
myTree.PostOrder(myTree.root);

console.log("In-order:");
myTree.inOrderTraversal(myTree.root);

// Unbalance the tree by adding several numbers > 100
myTree.insert(myTree.root, 110);
myTree.insert(myTree.root, 120);
myTree.insert(myTree.root, 130);
myTree.insert(myTree.root, 140);
myTree.insert(myTree.root, 150);

console.log("Added elements > 100 to unbalance the tree.");

// Confirm that the tree is now unbalanced
console.log("Is the tree balanced?", myTree.isBalanced());

// Rebalance the tree
console.log("Rebalancing the tree...");
myTree.rebalance();

// Confirm that the tree is balanced again
console.log("Is the tree balanced?", myTree.isBalanced());

// Print elements in different traversal orders again after rebalancing
console.log("Level Order:");
myTree.levelOrder((node) => console.log(node.data));

console.log("Pre-order:");
myTree.PreOrder(myTree.root);

console.log("Post-order:");
myTree.PostOrder(myTree.root);

console.log("In-order:");
myTree.inOrderTraversal(myTree.root);
