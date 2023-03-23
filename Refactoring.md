# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The deterministicPartitionKey function has been refactored into the following steps:

An early return case has been added for when the event argument is falsy, in which case the function returns the string "0" and no further verification is needed.

To simplify the logic and avoid multiple calls to crypto.createHash, the nested if/else statements have been replaced with a ternary operator. If there's no partitionKey in the event object or its length is greater than 256 characters, the event object or the partitionKey value is converted to a string and passed as input to crypto.createHash.

The last scenario is when the event object has a partitionKey attribute with a length less than or equal to 256 characters. In this case, the partitionKey value is converted to a string and returned as is.
