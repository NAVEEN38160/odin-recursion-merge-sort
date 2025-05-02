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
