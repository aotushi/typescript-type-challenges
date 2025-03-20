---
sidebar_label: Absolute
sidebar_position: 529
tags: []
title: '使用typescript实现为绝对值返回的类型'
---

# Absolute

## 介绍

export const questionNumber = '529';

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
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

// - case
```

实现一个接收string,number或bigInt类型参数的`Absolute`类型,返回一个正数字符串。

```ts
  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
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

type Absolute<T extends number | string | bigint> = any

// @errors: 2344 2315
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
// @errors: 2344 2300
/* _____________ Answer Here _____________ */
/// ---cut---

// most popular

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}` ? U : `${T}`
```


```ts twoslash
// 没啥用

type Absolute<T extends number | string | bigint> =   T extends number 
    ? `${T}` extends `-${infer Tn}` ? `${Tn}` : `${T}`
    : T extends string
      ? `${T}` extends `-${infer Ts}` ? `${Ts}` : `${T}`
      : T extends bigint
        ? `${T}` extends `-${infer Tb}`
          ? `${Tb}`
          : `${T}`
        : never
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
