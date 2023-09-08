/** @format */

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    const insertNode = (node) => {
      if (val === node.val) return this;
      if (val < node.val) {
        if (!node.left) {
          node.left = newNode;
          return this;
        }
        return insertNode(node.left);
      } else {
        if (!node.right) {
          node.right = newNode;
          return this;
        }
        return insertNode(this.right);
      }
    };
    return insertNode(this.root);
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findNode = (node) => {
      if (!node) return undefined;
      if (val === node.val) return node;
      if (val < node.val) {
        return findNode(node.left);
      } else {
        return findNode(node.right);
      }
    };
    return findNode(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const visited = [];
    const traverse = (node) => {
      visited.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visited = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      visited.push(node.val);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visited = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      visited.push(node.val);
    };
    traverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = [];
    const queue = [];
    let current = this.root;
    queue.push(current);
    while (queue.length) {
      current = queue.shift();
      visited.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    const removeNode = (node, val) => {
      if (!node) return null;
      if (val === node.val) {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.val = minRight.val;
        node.right = removeNode(node.right, minRight.val);
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
      } else {
        node.right = removeNode(node.right, val);
      }

      return node;
    };

    this.root = removeNode(this.root, val);
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    const checkBalanced = (node) => {
      if (!node) return { balanced: true, height: 0 };

      const left = checkBalanced(node.left);
      const right = checkBalanced(node.right);

      const isSubtreeBalanced = left.balanced && right.balanced;
      const heightDiff = Math.abs(left.height - right.height);

      const balanced = isSubtreeBalanced && heightDiff <= 1;
      const height = Math.max(left.height, right.height) + 1;

      return { balanced, height };
    };

    const result = checkBalanced(this.root);
    return result.balanced;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }
    let current = this.root;
    let secondHighest = null;
    while (current) {
      if (!current.right && current.left) {
        return this.findMax(current.left).val;
      } else if (!current.right && !current.left) {
        return secondHighest.val;
      }

      secondHighest = current;
      current = current.right;
    }
  }
}

module.exports = BinarySearchTree;
