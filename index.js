function fibs(n) {
  const answer = [0, 1];
  let x = 0;
  let y = 1;
  let z;

  for (let i = 2; i < n; i++) {
    z = x + y;
    x = y;
    y = z;
    answer.push(z);
  }

  return answer;
}

function fibby(n) {
  if (n === 0 || n === 1) {
    return 0;
  } else if (n === 2) {
    return 1;
  } else {
    return fibby(n - 1) + fibby(n - 2);
  }
}

function fibbidido(x) {
  const arr = [0, 1];
  for (let i = 2; i < x; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr;
}

function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const fibs = fibonacci(n - 1);
  fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
  return fibs;
}

// --------------------------------------------------------------------------------------------------------------------

function mergie(x) {
  if (x.length === 1) {
    return x;
  }

  const left = mergie(x.slice(0, x.length / 2));
  const right = mergie(x.slice(x.length / 2));
  const merged = [...left, ...right].sort((a, b) => a - b);

  return merged;
}

function mergynomical(x) {
  if (x.length === 1) {
    return x;
  }

  const left = mergynomical(x.slice(0, x.length / 2));
  const right = mergynomical(x.slice(x.length / 2));
  const merged = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }

  return [...merged, ...left, ...right];
}

// --------------------------------------------------------------------------------------------------------------------

// const Node = (value, nextNode = null) => {
//   return { value, nextNode };
// };

const LinkedList1 = () => {
  const list = [];

  const append = (value) => {
    const newNode = Node(value);
    if (list.length) {
      list[list.length - 1].nextNode = newNode;
      list.push(newNode);
      return;
    }
    list.push(newNode);
  };

  const prepend = (value) => {
    list.unshift(Node(value, list[0]));
  };

  const size = () => list.length;

  const head = () => list[0];

  const tail = () => list[list.length - 1];

  const at = (index) => list.at(index);

  const pop = () => {
    list.pop();
    list[list.length - 1].nextNode = null;
  };

  const contains = (value) => !!list.filter((x) => x.value === value).length;

  const find = (value) => {
    const index = list.findIndex((x) => x.value === value);
    return index !== -1 ? index : null;
  };

  const toString = () => {
    let final = "";
    list.forEach((node, i) => {
      if (i === list.length - 1) {
        final += ` ( ${node.value} ) -> null`;
      } else {
        final += `( ${node.value} ) -> `;
      }
    });
    return final;
  };

  const insertAt = (value, index) => {
    list.splice(index, 0, Node(value, list[index]));
    if (list[index - 1]) {
      list[index - 1].nextNode = list[index];
    }
  };

  const removeAt = (index) => {
    list.splice(index, 1);
    if (list[index - 1]) {
      list[index - 1].nextNode = list[index] ?? null;
    }
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
};

const LinkedList = () => {
  let headNode = null;

  const append = (value) => {
    const newNode = Node(value);
    if (!headNode) {
      headNode = newNode;
      return;
    }
    let current = headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  };

  const prepend = (value) => {
    const newNode = Node(value);
    if (headNode) {
      newNode.nextNode = headNode;
    }
    headNode = newNode;
  };

  const size = () => {
    let n = 0;
    if (!headNode) {
      return n;
    }
    let current = headNode;
    while (current.nextNode) {
      n += 1;
      current = current.nextNode;
    }
    return n + 1;
  };

  const head = () => headNode;

  const tail = () => {
    if (!headNode) {
      return null;
    }
    let current = headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  };

  const at = (index) => {
    let target = 0;
    let current = headNode;
    while (target < index) {
      target += 1;
      current = current.nextNode;
    }
    return current;
  };

  const pop = () => {
    if (!headNode) {
      return;
    }
    let current = headNode;
    while (current) {
      if (!headNode.nextNode) {
        headNode = null;
        break;
      } else if (!current.nextNode.nextNode) {
        current.nextNode = null;
        break;
      }
      current = current.nextNode;
    }
  };

  const contains = (value) => {
    if (!headNode) {
      return false;
    }
    let current = headNode;
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  };

  const find = (value) => {
    let current = headNode;
    let i = 0;
    while (current) {
      if (current.value === value) {
        return i;
      }
      current = current.nextNode;
      i++;
    }
    return null;
  };

  const toString = () => {
    let result = "";
    let current = headNode;
    while (current) {
      result += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    return result + "null";
  };

  return {
    append,
    prepend,
    at,
    pop,
    head,
    tail,
    size,
    contains,
    find,
    toString,
  };
};

// ----------------------------------------------------------------------------------------------------------------------

const HashMap = () => {
  let buckets = [];

  const loadFactor = 0.75;

  let capacity = 16;

  const hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % capacity;
  };

  const set = (key, value) => {
    const index = hash(key);

    const node = buckets[index];

    if (node) {
      let current = node;
      while (current) {
        if (current.value[0] === key) {
          current.value[1] = value;
          break;
        } else if (current.nextNode) {
          current = current.nextNode;
        } else {
          current.nextNode = { value: [key, value], nextNode: null };
          break;
        }
      }
    } else {
      buckets[index] = { value: [key, value], nextNode: null };
    }

    const loadLimitReached = length() === capacity * loadFactor;
    if (loadLimitReached) {
      expandMap();
    }
  };

  const get = (key) => {
    const index = hash(key);
    const node = buckets[index];
    if (node) {
      let current = node;
      while (current) {
        if (current.value[0] === key) {
          return current.value[1];
        }
        current = current.nextNode;
      }
    }
    return null;
  };

  const has = (key) => {
    const index = hash(key);
    const node = buckets[index];
    if (node) {
      let current = node;
      while (current) {
        if (current.value[0] === key) {
          return true;
        }
        current = current.nextNode;
      }
    }
    return false;
  };

  const remove = (key) => {
    const index = hash(key);
    const node = buckets[index];
    if (node) {
      let current = node;
      while (current) {
        if (current.value[0] === key) {
          buckets[index] = current.nextNode;
          return true;
        } else if (current.nextNode && current.nextNode.value[0] === key) {
          current.nextNode = current.nextNode.nextNode;
          return true;
        }
        current = current.nextNode;
      }
    }
    return false;
  };

  const length = () => {
    let count = 0;
    buckets
      .filter((node) => !!node)
      .forEach((node) => {
        let current = node;
        while (current) {
          count += 1;
          current = current.nextNode;
        }
      });
    return count;
  };

  const clear = () => {
    buckets = [];
  };

  const keys = () => {
    const result = [];
    buckets
      .filter((node) => !!node)
      .forEach((node) => {
        let current = node;
        while (current) {
          result.push(current.value[0]);
          current = current.nextNode;
        }
      });
    return result;
  };

  const values = () => {
    const result = [];
    buckets
      .filter((node) => !!node)
      .forEach((node) => {
        let current = node;
        while (current) {
          result.push(current.value[1]);
          current = current.nextNode;
        }
      });
    return result;
  };

  const entries = () => {
    const result = [];
    buckets
      .filter((node) => !!node)
      .forEach((node) => {
        let current = node;
        while (current) {
          result.push(current.value);
          current = current.nextNode;
        }
      });
    return result;
  };

  const expandMap = () => {
    const previous = [...buckets];
    clear();
    capacity *= 2;
    previous
      .filter((node) => !!node)
      .forEach((node) => {
        let current = node;
        while (current) {
          set(current.value[0], current.value[1]);
          current = current.nextNode;
        }
      });
  };

  return {
    get,
    set,
    has,
    remove,
    clear,
    length,
    keys,
    values,
    entries,
  };
};

// -------------------------------------------------------------------------------------------------------------------------

const mergeSort = (arr) => {
  if (arr.length === 1) {
    return arr;
  }
  const mid = Math.round(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else if (left[0] > right[0]) {
      result.push(right.shift());
    } else {
      left.shift();
    }
  }
  return [...result, ...left, ...right];
};

const Node = (data) => {
  return {
    data,
    left: null,
    right: null,
  };
};

const BST = (arr) => {
  if (arr.length === 1) {
    return Node(arr[0]);
  }
  const mid = Math.floor(arr.length / 2) - (arr.length % 2 === 0 ? 1 : 0);
  const node = Node(arr[mid]);
  node.left = arr[mid - 1] ? BST(arr.slice(0, mid)) : null;
  node.right = BST(arr.slice(mid + 1));
  return node;
};

// const preOrder = (root) => {
//   if (!root) {
//     return;
//   }
//   console.log(root.data);
//   preOrder(root.left);
//   preOrder(root.right);
// };

const Tree = (inputArray) => {
  const buildTree = (arr) => BST(mergeSort(arr));

  let root = buildTree(inputArray);

  const insert = (value) => {
    let current = root;
    while (current) {
      if (current.data === value) {
        break;
      } else if (current.data < value) {
        if (current.right) {
          current = current.right;
        } else {
          current.right = Node(value);
          break;
        }
      } else {
        if (current.left) {
          current = current.left;
        } else {
          current.left = Node(value);
          break;
        }
      }
    }
  };

  const deleteItem = (value) => {
    root = deleteNode(root, value);
  };

  const getSuccessor = (curr) => {
    curr = curr.right;
    while (curr && curr.left) {
      curr = curr.left;
    }
    return curr;
  };

  const deleteNode = (root, value) => {
    if (!root) {
      return root;
    }
    if (root.data > value) {
      root.left = deleteNode(root.left, value);
    } else if (root.data < value) {
      root.right = deleteNode(root.right, value);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let succ = getSuccessor(root);
      root.data = succ.data;
      root.right = deleteNode(root.right, succ.data);
    }
    return root;
  };

  const find = (value) => {
    let current = root;
    while (current) {
      if (current.data === value) {
        return current;
      } else if (current.data > value) {
        current = current.left;
      } else if (current.data < value) {
        current = current.right;
      }
    }
    return null;
  };

  const levelOrder1 = (callback) => {
    const queue = [root];

    while (queue.length) {
      const node = queue[0];
      callback(node);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      queue.shift();
    }
  };

  const recurseLevelOrder = (callback, arr) => {
    if (!arr.length) {
      return;
    }
    const queue = [];
    arr.forEach((el) => {
      callback(el);
      if (el.left) {
        queue.push(el.left);
      }
      if (el.right) {
        queue.push(el.right);
      }
    });
    recurseLevelOrder(callback, queue);
  };

  const levelOrder2 = (callback) => {
    recurseLevelOrder(callback, [root]);
  };

  const recurseInOrder = (callback, root) => {
    if (!root) return;
    recurseInOrder(callback, root.left);
    callback(root);
    recurseInOrder(callback, root.right);
  };

  const inOrder = (callback) => {
    recurseInOrder(callback, root);
  };

  const recursePreOrder = (callback, root) => {
    if (!root) return;
    callback(root);
    recursePreOrder(callback, root.left);
    recursePreOrder(callback, root.right);
  };

  const preOrder = (callback) => {
    recursePreOrder(callback, root);
  };

  const recursePostOrder = (callback, root) => {
    if (!root) return;
    recursePostOrder(callback, root.left);
    recursePostOrder(callback, root.right);
    callback(root);
  };

  const postOrder = (callback) => {
    recursePostOrder(callback, root);
  };

  const recurseHeight = (root) => {
    let left = 0;
    let right = 0;

    if (root.left) {
      left = 1 + recurseHeight(root.left);
    }

    if (root.right) {
      right = 1 + recurseHeight(root.right);
    }

    if (right > left) return right;

    if (left > right) return left;

    return left;
  };

  const height = (value) => {
    let start = root;
    while (start) {
      if (start.data === value) {
        break;
      } else if (start.data < value) {
        start = start.right;
      } else if (start.data > value) {
        start = start.left;
      }
    }
    if (!start) {
      return null;
    }
    return recurseHeight(start);
  };

  const depth = (value) => {
    let current = root;
    let depth = 0;
    while (current) {
      if (current.data === value) {
        return depth;
      } else if (current.data < value) {
        current = current.right;
        depth += 1;
      } else if (current.data > value) {
        current = current.left;
        depth += 1;
      }
    }
    return null;
  };

  const recurseIsBalanced = (root) => {
    if (!root) {
      return true;
    }

    let left = 0;
    let right = 0;

    if (root.left) {
      left = 1 + recurseHeight(root.left);
    }

    if (root.right) {
      right = 1 + recurseHeight(root.right);
    }

    if (Math.abs(left - right) < 2) {
      return recurseIsBalanced(root.left) && recurseIsBalanced(root.right);
    }

    return false;
  };

  const isBalanced = () => recurseIsBalanced(root);

  const rebalance = () => {
    const current = [];
    inOrder((node) => {
      current.push(node.data);
    });
    root = buildTree(current);
  };

  return {
    insert,
    deleteItem,
    find,
    levelOrder1,
    levelOrder2,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

// ------------------------------------------------------------------------------------------------------------------------

const validRange = (x, y) => x >= 0 && x <= 7 && y >= 0 && y <= 7;

const isEqual = (src, target) => src[0] === target[0] && src[1] === target[1];

const getPossibleMoves = (current) => {
  const moves = [];
  const x = current[0];
  const y = current[1];

  if (validRange(x + 1, y + 2)) {
    moves.push([x + 1, y + 2]);
  }
  if (validRange(x + 1, y - 2)) {
    moves.push([x + 1, y - 2]);
  }
  if (validRange(x + 2, y + 1)) {
    moves.push([x + 2, y + 1]);
  }
  if (validRange(x + 2, y - 1)) {
    moves.push([x + 2, y - 1]);
  }
  if (validRange(x - 1, y + 2)) {
    moves.push([x - 1, y + 2]);
  }
  if (validRange(x - 1, y - 2)) {
    moves.push([x - 1, y - 2]);
  }
  if (validRange(x - 2, y + 1)) {
    moves.push([x - 2, y + 1]);
  }
  if (validRange(x - 2, y - 1)) {
    moves.push([x - 2, y - 1]);
  }
  return moves;
};

const knightMoves = (start, end) => {
  const q = [{ position: start, path: [start] }];

  const visited = new Set([`${start[0]},${start[1]}`]);

  while (q.length) {
    const { position, path } = q.shift();

    if (isEqual(position, end)) return path;

    for (const move of getPossibleMoves(position)) {
      const key = `${move[0]},${move[1]}`;
      if (!visited.has(key)) {
        visited.add(key);
        q.push({ position: move, path: [...path, move] });
      }
    }
  }
};
// the end
