---
sidebar_label: 'Length of Tuple'
sidebar_position: 18
title: '获取元组的长度'
---

# Length of Tuple

## 介绍

export const questionNumber = '18';

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
const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const spaceX = [
  'FALCON 9',
  'FALCON HEAVY',
  'DRAGON',
  'STARSHIP',
  'HUMAN SPACEFLIGHT',
] as const;

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
];
// - case
```

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

For example

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y'];
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
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
type Length<T extends any> = any;

// @errors: 2344
// @include: test
```

<span className="badge-links">
  <a
    className="challenge"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/play`}
  >
    Take the Challenge
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
type Length<T extends readonly any[], Acc extends any[] = []> = T extends readonly [infer First, ...infer Rest] ? Length<Rest, [...Acc, First]> : Acc['length'];
```


```ts twoslash
// 实现2
type Length<T extends readonly any[]> = T['length']

```

```ts twoslash
// 实现3
type Length<T extends readonly any[]> = { [K in keyof T]: any}['length']
```

</details>

<span className="badge-links">
  <a
    className="share"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/answer`}
  >
    Share your Solutions
  </a>
  <a
    className="solution"
    target="\_blank"
    href={`https://tsch.js.org/${questionNumber}/solutions`}
  >
    Checkout more Solutions
  </a>
</span>