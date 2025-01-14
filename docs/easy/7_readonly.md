---
sidebar_label: 'ReadOnly'
sidebar_position: 7
tags: ['built-in', 'readonly', 'object-keys']
title: '使用typescript实现readlonly'
---

# ReadOnly

## 介绍

export const questionNumber = '7';

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
type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}
// - case

```
  不要使用内置的`Readonly<T>`，自己实现一个。

  泛型 `Readonly<T>` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会是只读 (readonly) 的。

  也就是不可以再对该对象的属性赋值。

  例如：

```ts
interface Todo {
  title: string;
  description: string;
}

type MyReadonly<T> = any;

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
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
type MyReadonly<T> = any;

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

// @errors: 2304 1005 1128

/* _____________ Answer Here _____________ */
/// ---cut---
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

//扩展 实现数组的readonly
type readOnlyArr<T extends any[]> = {
  readonly [K in keyof T]: T[K]
};
type ReadOnlyArr2<T extends any[]> = readonly [...T];
type ReadOnlyArr3<T> = T extends any[] ? readonly [...T] : T;

function toReadOnlyArr<T extends any[]>(arr: T): readonly [...T] {
  return arr
};

type DeepReadOnlyArr<T> = T extends any[] 
  ? readonly [...{[K in keyof T]: DeepReadOnlyArr<T[K]>}]
  : T;


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