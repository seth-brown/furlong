furlong
=========

A Node/JavaScript library for computing pairwise distance metrics.

![](furlong.jpg)

## Installation

* Using npm:  
  `npm install furlong --save`


  * or install directly:  
    `make clean && make package`

## Usage

furlong can be used with Node or with plain Javascript; it has no external dependencies. To use with Node, simply require it:
```
var furlong = require('furlong')
```
To use in the browser, link directly to it:
```
<script src="dist/furlong.min.js" charset="utf-8"></script>
```

Distance functions can be called directly, which return a scaler value:
```
>>> furlong.euclidean([0,0,0],[0,0,100])
100
```
Accessor functions can be used for more complex data structures
```
>>> var distanceFunc = furlong.distance('chebyshev')
                         .x(function(d) { return d.foo })
                         .y(function(d) { return d.bar })

>>> var a = [{'foo': 12, 'bar': 6},{'foo': 7, 'bar': 32},{'foo': 0, 'bar': 27}]
>>> distanceFunc(a)
27
```

furlong provides several distances functions and also supports user defined functions. The provided distance functions include:

* Euclidean distance
* Manhattan distance
* Chebyshev distance
* Bray Curtis distance
* Canberra distance 
* Hamming distance

`furlong.distance` is a higher-order function that returns a function. If two arguments are passed to it, the function assumes the first argument is one vector and the second argument is the second vector. The `x` accessor operates on the first vector, while the `y` accessor operates on the second vector. If one argument is passed to the fuction, furlong assumes that both accessors operate on the same vector:

```
Custom distance functions can be used with furlongs accessors as well:
```

var myDistanceFunc = function(v1, v2) { return 0 }

// generate a custom distance function
var hammingFunc = furlong.distance(myDistanceFunc) 
console.log(hammingFunc([0,0],[100,100]) // distance = 0
```

## Tests

* Using npm:  
  `npm test`


  * or test directly  
    `make test`

## Release History

* 0.1.0 Initial release
