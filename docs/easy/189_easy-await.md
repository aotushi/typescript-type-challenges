---
sidebar_label: 'Awaited'
sidebar_position: 189
tags: ['promise']
title: '使用typescript实现简单的await类型'
---

# Awaited

## 介绍

export const questionNumber = '189';

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
type X = Promise<string>;
type Y = Promise<{ field: number }>;

type cases = [
  Expect<Equal<Awaited<X>, string>>,
  Expect<Equal<Awaited<Y>, { field: number }>>
];
// - case
```

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 `Promise<T>` 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 ExampleType 类型。


> This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

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
type Awaited<T> = any;

// @errors: 2344 2300
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
// type Awaited<T extends Promise<unknown>> = T extends Promise<infer R> ? R : never;
// @errors: 2300
type Awaited<T extends Promise<unknown>> = T extends Promise<infer R> ? R extends Promise<unknown> ? Awaited<R> : R : never
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
