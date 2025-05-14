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

const Node = (value, nextNode = null) => {
  return { value, nextNode };
};

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

  // const loadFactor = 0.75;

  // let capacity = 16;

  const hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % 16; // capacity = 16;
  };

  const set = (key, value) => {
    const index = hash(key);
    const currentNode = buckets[index];
    if (currentNode && currentNode[0] === key) {
      currentNode[1] = value;
    } else {
      buckets[index] = [key, value];
    }
  };

  const get = (key) => {
    const index = hash(key);
    if (has(key)) {
      return buckets[index][1];
    }
    return null;
  };

  const has = (key) => {
    const index = hash(key);
    const found = buckets[index];
    return !!(found && found[0] === key);
  };

  const remove = (key) => {
    const index = hash(key);
    if (has(key)) {
      delete buckets[index];
      return true;
    }
    return false;
  };

  const length = () => buckets.filter((node) => node).length;

  const clear = () => {
    buckets = [];
  };

  const keys = () => buckets.filter((node) => node).map((node) => node[0]);

  const values = () => buckets.filter((node) => node).map((node) => node[1]);

  const entries = () => buckets.filter((node) => node);

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
