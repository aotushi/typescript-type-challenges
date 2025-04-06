---
sidebar_label: BEM Style String $
sidebar_position: 3326
tags: []
title: '使用typescript实现BEM Style String'
---

# BEM Style String

## 介绍

export const questionNumber = '3326';

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
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]
// - case
```
  BEM是CSS中类的流行的命名规范.

  例如, 用`btn`表示块元素, 依赖于块元素的将用`btn__price`表示, 改变块样式的修饰符适用`btn--big`或`btn__price--warning`来修饰.
  执行`BEM<B,E,M>`,从3个参数中生成联合字符串. B是字符字面量, E和M是字符数组(也可能是空的).

  ```ts

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

type BEM<B extends string, E extends string[],M extends string[]> = any

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
// @errors: 2344 2589 2314
/* _____________ Answer Here _____________ */
/// ---cut---

// most popular
type BEM<B extends string, E extends string[], M extends string[]> = `${B}${E extends [] ? '' : `__${E[number]}`}${M extends [] ? '' : `--${M[number]}`}`

```


```ts twoslash
// my solution
/**
 * 如果E类型数组中有多个元素,就不能处理.
 */
type addModifierLine<Pre extends string, A extends any[]> = A['length'] extends 0
  ? A
  : A extends [infer F extends string, ...infer R]
    ? `${Pre}${F}` | (R['length'] extends 0 ? never : addModifierLine<Pre, R>)
    : A;


type addModifierLineToArrEle<Pre extends string, A extends any[]> = A extends [infer F extends string, ...infer R]
    ? [`${Pre}${F}`, ...addModifierLineToArrEle<Pre, R>]
    : [];

type mergeEAndM2<E extends string[], M extends string[]> = 
  M['length'] extends 0
    ? E
    : E extends [infer F extends string]
      ? addModifierLineToArrEle<F, M>
      : M;



type BEM<B extends string, E extends string[], M extends string[]> = 
  addModifierLine<B, mergeEAndM2<addModifierLineToArrEle<'__', E>, addModifierLineToArrEle<'--', M>>>

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
