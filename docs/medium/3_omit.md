---
sidebar_label: Omit
sidebar_position: 3
tags: [union, build-in]
title: '使用typescript实现内置的omit'
---

# Omit

## 介绍

export const questionNumber = '3';

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
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}
// - case
```


实现内置的`Omit<T,K>`而不需要使用它.

通过从`T`中移除`K`属性来构建一个类型

For example

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
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
type MyOmit<T, K> = any

// @errors: 2344
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

/* _____________ Answer Here _____________ */
/// ---cut---

// 方法1
type MyOmit<T,K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
```


```ts twoslash
//方法2
/**
 * 方法2会在第三个测试中失败, 在 keyof T 被传递给 Exclude2 的时候。在这个阶段，TypeScript 只是处理了属性名的字符串，而不是保留了完整的属性描述符。
 */
type Exclude2<T,K extends T> = T extends K ? never : T;

type MyOmit2<T,K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}

```

```ts twoslash
//方案2的正确版本

type Exclude3<T, K> = T extends K ? never : T;

type MyOmit3<T, K extends T> = {
  [P in keyof T as Exclude3<P, K>]: T[P]
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
