furlong
=======
n. _a unit of distance equal to 220 yards_

`furlong` is a zero dependency Node and Javascript library for computing pairwise distance metrics writting in Typescript.

![Build Status](https://github.com/seth-brown/furlong/workflows/Build%20Status/badge.svg?branch=master)

![](furlong.jpg)

## Installation

``` bash
npm install furlong --save
```

## Usage

`furlong` can be used with Node or with plain Javascript; it has no external dependencies. To use with Node, simply require it:  
``` javascript
const { furlong } = require('furlong')
```

To use in Javascript, just import it:  
``` javascript
import { furlong } from 'furlong'
```

Pairwise distance functions are computed using a distance method. `furlong` provides several built-in distance functions and also supports user defined functions. The provided distance functions include:

* Euclidean distance
* Manhattan (Taxicab) distance
* Chebyshev distance
* Bray Curtis distance
* Canberra distance 
* Hamming distance

``` bash
>>> furlong('euclidean').distance([0,0,0],[0,0,100])
100
```

Accessor functions can also be used for more complex data structures:
``` javascript
>>> const distanceFunc = furlong('chebyshev')
                     .x(d => d.foo)
                     .y(d => d.bar)

>>> const vectorA = [{'foo': 12},{'foo': 7},{'foo': 0}]
>>> const vectorB = [{'bar': 6},{'bar': 32},{'bar': 27}]
>>> distanceFunc
      .distance(vectorA, vectorB)
      .toFixed(2)
27
```
Custom distance functions can be used with `furlong`'s accessors as well:

``` javascript
>>> const customDistanceFunc = (v1, v2) => 0
>>> furlong('hamming')
    .func(customDistanceFunc)
    .distance([0,0],[1,1])
0
```

## Testing

* Using npm:  
  `npm test`

## Release History

* 0.1.0 Initial release
* 0.2.0 Ported library to Typescript
