---
sidebar_label: ReplaceAll
sidebar_position: 119
tags: []
title: '使用typescript实现一个字符串的replaceAll'
---

# ReplaceAll

## 介绍

export const questionNumber = '119';

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
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]

// - case
```
  实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

例如

```ts
  type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'
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

type ReplaceAll<S extends string, From extends string, To extends string> = any

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
// @errors: 2344

/* _____________ Answer Here _____________ */
/// ---cut---

//most popular

type ReplaceAll<S extends string, From extends string, To extends string> = S extends ''
  ? S
  : S extends `${infer F}${From}${infer Rest}`
    ? `${F}${To}${ReplaceAll<Rest, From, To>}`
    : S;
```


```ts twoslash
// 存在问题

type replace<S extends string, K extends string, To extends string> = K extends '' 
  ? S
  : S extends `${infer R}${K}${infer Rest}` 
    ? `${R}${To}${Rest}` 
    : S


type ReplaceAll<S extends string, K extends string, To extends string> = K extends '' 
  ? S
  : S extends `${infer R}${K}${infer Rest}`
    ? ReplaceAll<replace<S, K, To>, K, To>
    : S;

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
