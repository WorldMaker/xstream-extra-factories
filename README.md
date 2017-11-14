# xstream-extra-factories

Extra generic factories for xstream

## `forever`

Creates a memory stream of a single item that never completes. 
Like `xs.of(item)` but does not send a completion event and always
remembers.

## `fromAsyncIterable`

Creates a stream from an async iterable (such as an async generator function: `async function* name()`).

## `fromCancellableDualCallback`

Creates a stream from a "watch" function that expects a success callback, an error callback,
any number of arguments following that, then returns an ID for cancellation. An example would
be `navigator.geolocation.watchPosition()`.

## `fromDualCallback`

Creates a stream from a function that expects a success callback, an error callback, then any
number of arguments following that. An example would be `navigator.geolocation.getPosition()`.

## `fromNodeCallback`

Creates a stream from a Node-style callback. A Node-style callback
function takes any number of arguments and then lastly a callback of the
form `(error: any, value: T) => void`.
