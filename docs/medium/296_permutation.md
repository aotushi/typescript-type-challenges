---
sidebar_label: Permutation
sidebar_position: 296
tags: []
title: '使用typescript实现联合类型的全排列Permutation'
---

# Permutation

## 介绍

export const questionNumber = '296';

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
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

// - case
```
实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。
例如

```ts
    type perm = Permutation<'A' | 'B' | 'C'>; 
    // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
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

type Permutation<T> = any

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
/**
 * 这是按顺序做题以来遇到的, 用法都认识, 但就是想不出来解决方案,却又寄希望未知的某个特性一下解决的的那类问题.
 * 最佳答案解释的很详细, 也有中文翻译.
 * 但中文版中提供了解决这类问题的最核心一点: 算法
 * ：[Generating Permutations - Topcoder](https://www.topcoder.com/blog/generating-permutations) 
 * 本文的思路就是第一种: remove
 *  BASIC ALGORITHM 1: REMOVE（基础算法之 删除 算法）
    BASIC ALGORITHM 2: INSERT（基础算法之 插入 算法）
    BASIC ALGORITHM 3: LEXICOGRAPHIC（基础算法之 字典序 算法）
    HEAP’S ALGORITHM（高级算法之 堆 算法）
 */

type Exclude2<T, U> = T extends U ? never : T;

type Permutation<All, K = All> = [All] extends [never]
  ? []
  : K extends All
    ? [K, ...Permutation<Exclude2<All, K>>]
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
