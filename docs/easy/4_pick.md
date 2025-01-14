---
sidebar_label: 'Pick'
sidebar_position: 4
tags: [union, build-in]
title: '使用typescript实现Pick'
---

# Pick

## 介绍

export const questionNumber = '4';

```twoslash include helper
/* _____________ Helper Types _____________ */
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
// - type
```

```twoslash include test
/* _____________ Test Cases _____________ */
type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
    // @errors: 2344
  MyPick<Todo, 'title' | 'completed' | 'invalid'>
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}
// - case
```


不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

**从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**。

例如: 

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyPick<T, K> = any;

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
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
type MyPick<T, K> = any;

// @errors: 2344
// @include: test
```
<span className="badge-links">
  <a
    className="challenge"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/play`}
  >
    Take the Challenge
  </a>
</span>

## 解决方案

<details>

<summary>点击展开答案</summary>

```ts twoslash
// @include: helper

// @include: test

// @errors: 2344

/* _____________ Answer Here _____________ */
/// ---cut---
type MyPick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};
// 测试用例中的@ts-expect-error不会生效,所以会报错
type MyPick2<T,K> = {
  [P in keyof T as P extends K ? P : never]: T[P]
};
// 执行会报错, 和上面相同的原因
type MyPick3<T,K> = {
  [P in K & keyof T]: P extends T ? T[P] : never
};
```
</details>


<span className="badge-links">
  <a
    className="share"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/answer`}
  >
    Share your Solutions
  </a>
  <a
    className="solution"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/solutions`}
  >
    Checkout more Solutions
  </a>
</span>
