---
sidebar_label: Kebabcase
sidebar_position: 612
tags: []
title: '使用typescript实现Kebabcase'
---

# Kebabcase

## 介绍

export const questionNumber = '612';

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
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

// - case
```

替换`camelCase`或`PascalCase`字符串为`kebab-case`.    `FooBarBaz` -> `foo-bar-baz`

```ts
  type FooBarBaz = KebabCase<"FooBarBaz">
  const foobarbaz: FooBarBaz = "foo-bar-baz"

  type DoNothing = KebabCase<"do-nothing">
  const doNothing: DoNothing = "do-nothing"
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

type KebabCase<S> = any

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
// most popular


type KebabCase<S extends string> = S extends `${infer S1}${infer S2}`
  ? S2 extends Uncapitalize<S2>
    ? `${Uncapitalize<S1>}${KebabCase<S2>}`
    : `${Uncapitalize<S1>}-${KebabCase<S2>}`
  : S;

```



```ts twoslash
// 方法2 when i see my solution, i am tired too.
// @errors: 2322
type StrToArr<T extends string ,U extends any[] = []> = T extends `${infer F}${infer Rest}`
  ? StrToArr<Rest, [...U, F]>
  : U;

type ArrToStr<T extends any[], U extends string = ''> = T extends [infer F, ...infer Rest]
  ? ArrToStr<Rest, `${U}${F}`>
  : U;

type UpperToLower = {
    A: 'a';
  B: 'b';
  C: 'c';
  D: 'd';
  E: 'e';
  F: 'f';
  G: 'g';
  H: 'h';
  I: 'i';
  J: 'j';
  K: 'k';
  L: 'l';
  M: 'm';
  N: 'n';
  O: 'o';
  P: 'p';
  Q: 'q';
  R: 'r';
  S: 's';
  T: 't';
  U: 'u';
  V: 'v';
  W: 'w';
  X: 'x';
  Y: 'y';
  Z: 'z';
}

type strArr<S extends string> = StrToArr<S>;

type FormatArr<strArr, T extends any[] = []> = strArr extends [infer F, ...infer Rest extends string[]]
  ? [F extends keyof UpperToLower ? `-${UpperToLower[F]}` : F, ...FormatArr<Rest>]
  : T;

type KebabCase<S extends string> = ArrToStr<FormatArr<strArr<S>>> extends `-${infer Rest extends string}` 
  ? Rest extends '' ? '-' : Rest
  : ArrToStr<FormatArr<strArr<S>>>


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
