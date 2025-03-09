---
sidebar_label: Readonly2
sidebar_position: 8
tags: [readonly, object-keys]
title: '使用typescript实现对象部分属性只读'
---

# Readonly2

## 介绍

export const questionNumber = '8';

```twoslash include helper
/* _____________ Helper Types _____________ */
type Expect<T extends true> = T;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

type MergeInsertions<T> =
  T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T

type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>
// - type
```

```twoslash include test
/* _____________ Test Cases _____________ */
type cases = [
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

// - case
```

实现`MyReadonly2<T,K>`, 其接收两个类型参数`T`和`K`

`K`指定`T`属性集合中应该设置为只读. 当`K`没有提供, 应该让所有属性只读,就像通常的`Readonly<T>`

例如

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
```

<span className="badge-links">
  <a className="view" target="\_blank" href={`https://tsch.js.org/${questionNumber}`}>
    View on GitHub
  </a>
</span>

## start point

```ts twoslash
// @include: helper
// ---cut---
/* _____________ Your Code Here _____________ */

type MyReadonly2<T, K> = any

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

## my solutions

<details>

<summary>Spoiler warning // Click to reveal answer</summary>

```ts twoslash
// @include: helper

// @include: test

/* _____________ Answer Here _____________ */
/// ---cut---

//方案1

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in keyof T as P extends K ? P : never]: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}


```

```ts twoslash
//方案2 方案1的变种

type Pick2<T, K extends keyof T> = {
  readonly [P in keyof T as P extends K ? P : never]: T[P]
}

type Omit2<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

type MyReadonly2<T, K extends keyof T = keyof T> = Pick2<T, K> & Omit2<T, K>

```


```ts twoslash
//方案3  most popular

type MyReadonly2<T, K extends keyof T = keyof T > = Omit<T,K> &
  Readonly<Pick<T,K>>

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
