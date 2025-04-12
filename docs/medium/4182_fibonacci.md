---
sidebar_label: Fibonacci $
sidebar_position: 4182
tags: []
title: '使用typescript实现Fibonacci'
---

# Fibonacci

## 介绍

export const questionNumber = '4182';

```twoslash include helper
/* _____________ Helper Types _____________ */
type Expect<T extends true> = T;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;


// - type
```

```twoslash include test
/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
// - case
```
  实现斐波那契序列. 接收数值T, 返回它相关的斐波那契数列(https://en.wikipedia.org/wiki/Fibonacci_number).

  序列:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  ```ts
  type Fibonacci<T extends number> = any
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```


<span className="badge-links">
  <a className="view" target="\_blank" href={`https://tsch.js.org/${questionNumber}`}>
    View on GitHub
  </a>
</span>

## 起点

```ts twoslash
// @include: helper
// ---cut---
/* _____________ Your Code Here _____________ */

type Fibonacci<T extends number> = any

// @errors: 2344 2314 2315
// @include: test
```

<span className="badge-links">
  <a
    className="challenge"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/play`}
  >
    take the challenge
  </a>
</span>

## 解决方案

<details>

<summary>Spoiler warning // Click to reveal answer</summary>

```ts twoslash
// @include: helper

// @include: test
// @errors: 2344 2589 2314
/* _____________ Answer Here _____________ */
/// ---cut---

// most popular

type Fibonacci<T extends number> = any

```



</details>

<span className="badge-links">
  <a
    className="share"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/answer`}
  >
    share your answer
  </a>
  <a
    className="solution"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/solutions`}
  >
    view more solutions
  </a>
</span>
