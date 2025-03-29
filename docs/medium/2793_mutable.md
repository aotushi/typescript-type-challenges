---
sidebar_label: Mutable
sidebar_position: 2793
tags: []
title: '使用typescript实现Mutable'
---

# Mutable

## 介绍

export const questionNumber = '2793';

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

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

// - case
```
实现一个通用的类型 ```Mutable<T>```，使类型 `T` 的全部属性可变（非只读）。

  ```ts
  interface Todo {
    readonly title: string
    readonly description: string
    readonly completed: boolean
  }

  type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }
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

type Mutable<T> = any

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

// most popular

type Mutable<T> = {
  -readonly [K in keyof T]:T[K]
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
