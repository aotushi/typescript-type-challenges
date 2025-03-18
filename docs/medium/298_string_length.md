---
sidebar_label: StringLength
sidebar_position: 298
tags: []
title: '使用typescript实现联合类型的全排列Permutation'
---

# Permutation

## 介绍

export const questionNumber = '298';

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
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

// - case
```

计算字符串的长度，类似于 `String#length` 


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

type LengthOfString<S extends string> = any

// @errors: 2344 2558
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

// 方法1
// 这里思考以下, 为什么字符串的length属性返回类型是个number, 而不是和数组一样的数值字面量类型呢
type StrToArr<S extends string , T extends any[]> = S extends ''
  ? []
  : S extends `${infer F}${infer R}`
    ? [...T, F, ...StrToArr<R, T>]
    : T;
type LengthOfString<S extends string> = StrToArr<S, []>['length'];

```

```ts twoslash
// most popular

type LengthOfString<
  S extends string,
  T extends string[] = []
> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T['length'];


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
