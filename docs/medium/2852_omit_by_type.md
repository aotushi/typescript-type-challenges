---
sidebar_label: OmitByType
sidebar_position: 2852
tags: []
title: '使用typescript实现OmitByType'
---

# OmitByType

## 介绍

export const questionNumber = '2852';

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

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string, count: number }>>,
  Expect<Equal<OmitByType<Model, string>, { count: number, isReadonly: boolean, isEnable: boolean }>>,
  Expect<Equal<OmitByType<Model, number>, { name: string, isReadonly: boolean, isEnable: boolean }>>,
]
// - case
```
从类型T中, 筛选属性类型不能赋值为'U'的属性集合.

  ```ts
  type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { name: string; count: number }
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

type OmitByType<T, U> = any

// @errors: 2344 2314
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


type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
}

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
