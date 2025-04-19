---
sidebar_label: Checkrepeatedchars
sidebar_position: 8987
tags: []
title: '使用typescript实现checkrepeatedchars'
---

# CheckRepeatedchars

## 介绍

export const questionNumber = '9142';

```twoslash include helper
/* _____________ Helper Types _____________ */
type Expect<T extends true> = T;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;


// - type
```

判断一个string类型中是否有相同的字符

```twoslash include test
/* _____________ Test Cases _____________ */
type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]

// - case
```
  

  ```ts
type CheckRepeatedChars<T extends string> = any
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

type CheckRepeatedChars<T extends string> = any

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
// @errors: 2344 2589 2314 1005
/* _____________ Answer Here _____________ */
/// ---cut---

// most popular

type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer E}` 
  ? E extends `${string}${F}${string}`
    ? true
    : CheckRepeatedChars<E>
  : false

```

```ts twoslash
// my
type strToUnion<T extends string> = T extends `${infer F}${infer R}`  ? F | strToUnion<R> : never


type CheckRepeatedChars<T extends string> = T extends `${infer F}${infer R}` ? F extends strToUnion<R> ? true : CheckRepeatedChars<R> : false

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
