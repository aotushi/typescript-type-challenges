---
sidebar_label: DropChar $
sidebar_position: 2070
tags: []
title: '使用typescript实现DropChar'
---

# DropChar

## 介绍

export const questionNumber = '2070';

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
  Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
  Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

// - case
```

从字符串中剔除指定字符。

  例如：

  ```ts
    type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
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

type DropChar<S, C> = any

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
// @errors: 2344 2589
/* _____________ Answer Here _____________ */
/// ---cut---

// most popular

type DropChar<S, C extends string> = S extends `${infer L}${C}${infer R}` ? DropChar<`${L}${R}`, C> : S;

/**
 * 存在的问题, 在ts的playground(v5.8.2)中, 当处理DropChar<' butter fly!', ''>时, 有潜在警告: Type instantiation is excessively deep and possibly infinite.(2589)
 */
```

```ts twoslash
/**
 * 问题: 
 * 1.'' 和' '是俩类型, 那如何判断相等呢?
 * 2.我的初始思路也是按照most popular, 但是遇到了1给否了.接下来的思路, 是转换成数组, 递归判断是否相等
 * 2.1 如果相等, 返回的元素中就剔除这个; 如果不相等,返回的元素中就包含这个.
 * 2.2 但是判断相等依然无法解决.
 * 3.将数组转换为字符串
 */
type ArrToStr<A, S extends string = ''> = A extends [infer F extends string, ...infer Rest] 
  ? ArrToStr<Rest, `${S}${F}`> 
  : S;

type StrToArr<S, T extends any[] = []> = S extends `${infer F}${infer Rest}`
  ? [...T, F, ...StrToArr<Rest, T>]
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
