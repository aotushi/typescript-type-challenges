---
sidebar_label: Diff
sidebar_position: 645
tags: []
title: '使用typescript实现Diff'
---

# Diff

## 介绍

export const questionNumber = '645';

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


type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

// - case
```

  获取两个接口类型中的差值属性。

  ```ts
  type Foo = {
    a: string;
    b: number;
  }
  type Bar = {
    a: string;
    c: boolean
  }

  type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
  type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }

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

type Diff<O, O1> = any

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

type Diff<O, O1> = {
  [K in keyof O | keyof O1 as K extends keyof O & keyof O1 ? never : K]: K extends keyof O 
    ? O[K] 
    : K extends keyof O1 
      ? O1[K] 
      : never;
}


type Diff2<O, O1> = {
  [K in keyof (O & O1) as K extends keyof (O | O1) ? never : K]: K extends keyof O 
    ? O[K] 
    : K extends keyof O1 
      ? O1[K] 
      : never;
}

```


```ts twoslash
// most popular

type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

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
