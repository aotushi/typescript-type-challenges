---
sidebar_label: 'TupleToObject'
sidebar_position: 11
title: '使用typescript实现tuple转换为对象'
---


# Tuple To Object

## 介绍

export const questionNumber = '11';

```twoslash include helper

/* _____________ Helper Types _____________ */
type Expect<T extends true> = T;
type Equal<X,Y> = (<T>T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
// - type

```

```twoslash include test
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1, 2: 2, 3: 3, 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1, [sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1, '2': '2', 3: 3, '4': '4', [sym1]: typeof sym1 }>>,
]

//@errors: 2344 1005
type error = TupleToObject<[[1, 2], {}]>

// - case

```

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。

  例如：

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

## 起点

```ts twoslash
// @include: helper
// ---cut---
/* _____________ Your Code Here _____________ */
type TupleToObject<T extends readonly (string|number|symbol)[]> = {
  [P in T[number]]: P
}

// @errors: 2344 2315 1005
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

// @errors: 1005 2344 2315 1056 2536

/* _____________ Answer Here _____________ */
/// ---cut---
// 实现1
type TupleToObject<T extends readonly (string|number|symbol)[]> = {
  [P in T[number]]: P
}

```

```ts twoslash
// 实现2
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```

```ts twoslash
// 实现3
type TupleToObject<T extends readonly (keyof any)[]> = {
  [P in T[number]]: P
}
```

```ts twoslash
// 实现4
type UnionToObj<U extends keyof any> = {
  [K in U]: K
}

type TupleToObject<T extends readonly any[]> = UnionToObj<T[number]>
```


```ts twoslash
// 实现5
type TupleToObject<T extends readonly PropertyKey[]> = {
  [K in T[number]]: K
}

```

```ts twoslash
// 实现6
type TupleToObject<T extends readonly (keyof any)[]> = T extends readonly (infer E)[]
  ? { [K in E & keyof any]: K }
  : never
```

```ts twoslash
// 实现7
type TupleToObject<T extends readonly (keyof any)[]> = {
  [K in T[number] as K]: K
}
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