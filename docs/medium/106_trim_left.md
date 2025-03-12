---
sidebar_label: TrimLeft
sidebar_position: 106
tags: []
title: '使用typescript实现TrimLeft'
---

# TrimLeft

## 介绍

export const questionNumber = '106';

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
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]

// - case
```
实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。


例如

```ts
  
type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '

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

type TrimLeft<T> = any

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

/* _____________ Answer Here _____________ */
/// ---cut---

//方法1
type Whitespace = ' ' | '\n'| '\t'
type TrimLeft<S extends string> = S extends `${Whitespace}${infer Rest}` ? TrimLeft<Rest> : S;

```

```ts twoslash
// 潜在问题: 
/**
 * TypeScript 中的递归类型确实存在深度限制。TypeScript 默认的递归深度限制约为 45-50 层，具体限制可能因版本而略有不同。当递归嵌套达到这个限制时，TypeScript 编译器会报错。
 * 
 * 思路
 * 1.尾递归优化
 *  - 减少递归次数
 *  - 优化效果有限
 * 2.分段处理
 *  - 
 * 
 */
// 尾递归优化

type TrimRight<T extends string> = 
  T extends `${infer Rest} ` ? TrimRight<Rest> :
  T extends `${infer Rest}\n` ? TrimRight<Rest> :
  T extends `${infer Rest}\t` ? TrimRight<Rest> :
  T;

```


```ts twoslash
// Trim
type Whitespace = ' ' | '\n'| '\t'
type TrimLeft<S extends string> = S extends `${Whitespace}${infer Rest}` ? TrimLeft<Rest> : S;
type TrimRight<S extends string> = S extends `${infer F}${Whitespace}` ? TrimRight<F> : S;
type Trim<S extends string> = TrimLeft<TrimRight<S>>

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
