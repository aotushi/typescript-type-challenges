---
sidebar_label: FlattenDepth $$
sidebar_position: 3243
tags: []
title: '使用typescript实现FlattenDepth'
---

# FlattenDepth

## 介绍

export const questionNumber = '3243';

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
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]
// - case
```
  递归摊平数组. 如果提供了深度, 应确保它是正数.

  ```ts
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
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

type FlattenDepth<T> = any

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

type FlattenDepth<T> = any

```

```ts twoslash
// my solution
//@errors: 2589

/**
 * 存在的问题: NumToArr由于19260817存在, 递归次数超过限制,产生ts报错.
 */

type NumToArr<N extends number = 1, U extends any[] = []> = N extends U['length']
  ? U
  : NumToArr<N, [...U, N]>;

type NumMinusOne<T extends any[]> = T['length'] extends 1
  ? 0
  : T extends [infer F, ...infer Rest]
    ? Rest['length']
    :  0;

type desct<T extends any[], U extends any[] = []> = T extends [infer F, ...infer Rest]
  ? desct<Rest, [
      ...U,
      ...(F extends any[] ? F : [F])
    ]>
  : U;


  type FlattenDepth<T extends any[], D extends number = 1, U extends any[] = T> = D extends 0 
  ? U 
  : FlattenDepth<desct<U>, NumMinusOne<NumToArr<D, []>>>;

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
