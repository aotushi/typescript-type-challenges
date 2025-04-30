---
sidebar_label: ParseUrlParams
sidebar_position: 9616
tags: []
title: '使用typescript实现ParseUrlParams'
---

# FirstUniqueCharIndex

## 介绍

export const questionNumber = '9616';

```twoslash include helper
/* _____________ Helper Types _____________ */
type Expect<T extends true> = T;

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;


// - type
```

给一个字符串,找到第一个不重复的字符,并返回它的索引.如果不存在, 返回-1(Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

```twoslash include test
/* _____________ Test Cases _____________ */
type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
]

// - case
```
  

  ```ts
type ParseUrlParams<T> = any
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

type ParseUrlParams<T> = any

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



```


```ts twoslash
// my


type ExcludeLast<T, U extends string> = T extends `${infer F}${U}${infer R}` ? `${F}` : T;


type strToUnion<T, U extends any = never> = T extends `${infer F}${infer R}` ? strToUnion<R, U | F> : U;


type ParseUrlParams<T extends string , U extends any = never> = T extends `${infer A}:${infer B}` 
  ? ':' extends strToUnion<B>
    ? B extends `${infer C}:${infer D}`
      ? ParseUrlParams<D, U | ExcludeLast<C, '/'>>
      : U
    : U | ExcludeLast<B, '/'>
  : T extends ''
    ? never 
    : U | ExcludeLast<T, '/'>;

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
