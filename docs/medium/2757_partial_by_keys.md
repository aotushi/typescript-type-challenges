---
sidebar_label: PartialsByKeys $
sidebar_position: 2757
tags: []
title: '使用typescript实现PartialsByKeys'
---

# PartialsByKeys

## 介绍

export const questionNumber = '2757';

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

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]

// - case
```
  实现一个通用的`PartialByKeys<T, K>`，它接收两个类型参数`T`和`K`。

  `K`指定应设置为可选的`T`的属性集。当没有提供`K`时，它就和普通的`Partial<T>`一样使所有属性都是可选的。
  例如：

  ```ts
  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
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

type PartialByKeys<T, K> = any

// @errors: 2344 2314
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

type PartialByKeys<T, K = never> = {
  [P in keyof T as P extends K ? P : never]?: T[P]
} & {
  [P in keyof T as P extends K ? never : P]: T[P]
}

/**
 * 存在的问题: 可选属性的结果会是一个联合类型: 例如, name?: string | undefined
 * under strictNullChecks, TypeScript will tell us they’re potentially undefined.
 * 所以, 我们需要解决undefined的问题. 所以下文中IntersectionToObj的作用是?
 */

```

```ts twoslash
// most popular 
type PartialByKeys<T extends {}, U = keyof T> = 
  Omit<Partial<Pick<T, U & keyof T>> & Omit<T, U & keyof T>, never>;

```

```ts twoslash
// most popular
type IntersectionToObj<T> = {
  [K in keyof T]: T[K]
}
type PartialByKeys<T , K = any> = IntersectionToObj<{
  [P in keyof T as P extends K ? P : never]?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}>

```


```ts twoslash
// deepseek

type PartialByKeys<T, K extends keyof T = keyof T> = 
  Omit<T, K> & Partial<Pick<T,K>> extends infer O
    ? {[P in keyof O]: O[P]}
    : never;


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
