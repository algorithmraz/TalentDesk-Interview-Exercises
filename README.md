This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Assignment

Complete the React Component under `App.js` in order to calculate a specific function according to user input. The function is named `detectSums` and is described below. Write tests for both the React Component and the function, and make sure it is a smooth experience for the user.

### React component

The Component must have a user input, parse it, run the function on it and report the results.

 - In case of an error, or an empty input, it should show a respective error message to the user.
 - You may write tests, to make sure the component renders the correct information according to each case.
 - You may install and use any third party libraries you may need either for the component, the form or the tests.


### Function definition

`detectSums()`:

 - Input: an array of numbers, e.g. `A = [1, 2, 3]`
 - Output: an array of matches, as objects, containing keys `pA`, `pB`, `sum` such that `A[p1] + A[p2] === A[sum]`, e.g. `[{ pA: 0, pB: 1, sum: 2 }]]`


#### Details

- __parts may appear in any order__, so for input `[1, 2, 3]`, either `[{ pA: 0, pB: 1, sum: 2 }]]` or `[{ pA: 1, pB: 0, sum: 2 }]]` are valid
- __every combination of sum and parts__ must appear __once__ in the results, so for input `[1, 2, 3]`, the result `[{ pA: 0, pB: 1, sum: 2 }, { pA: 1, pB: 0, sum: 2 }]` is invalid
- You should write your own tests to cover any edge cases you may think of.
- You may install and use any third party libraries.
- You should use ES6 syntax
- You may provide multiple versions of the function, detailing advantages/disadvantages of each


#### Example invocations

```
$ babel-node
> var { detectSums } = require('./src/utils');
undefined

> detectSums([1, 2, 3])
[ { pA: 0, pB: 1, sum: 2 } ]

> detectSums([1, 2, 3, 4])
[ { pA: 0, pB: 1, sum: 2 }, { pA: 0, pB: 2, sum: 3 } ]

> detectSums([3, 0, 3])
[ { pA: 0, pB: 1, sum: 2 }, { pA: 1, pB: 2, sum: 0 } ]

> detectSums([1, 2, 4])  // we can't use '2' twice as in '2 + 2 = 4'
[]

> detectSums([3, 0, 2])  // we can't use '3' twice as in '3 + 0 = 3'
[]

> detectSums([1, 2, 3, 4, 5])
[ { pA: 0, pB: 1, sum: 2 },
  { pA: 0, pB: 2, sum: 3 },
  { pA: 0, pB: 3, sum: 4 },
  { pA: 1, pB: 2, sum: 4 } ]

> detectSums([1, 2, 1, 3])  // return every possible combination once
[ { pA: 0, pB: 1, sum: 3 },
  { pA: 0, pB: 2, sum: 1 },
  { pA: 1, pB: 2, sum: 3 } ]

> detectSums([1, 2, 1, 2, 3])  // return every possible combination once
[ { pA: 0, pB: 1, sum: 4 },
  { pA: 0, pB: 2, sum: 1 },
  { pA: 0, pB: 2, sum: 3 },
  { pA: 0, pB: 3, sum: 4 },
  { pA: 1, pB: 2, sum: 4 },
  { pA: 2, pB: 3, sum: 4 } ]
>
```




### Bonus

#### Complexity

Provide the time and memory complexity of your function.

#### Make it memory efficient

Suppose we have memory limitations, e.g. mobile, but no time limitations. Provide a memory-efficient version of the function.

#### Make it time efficient

Suppose we have unlimited memory, but we want it to be *fast*. Provide a time-efficient version of the function.
