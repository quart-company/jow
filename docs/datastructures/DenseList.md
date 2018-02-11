# DenseList Datastructure
DenseList is a simple and compact binary datastructure that is used extensively in JOW. A list is packed with n number of items as its `length` and each item is prefixed with a `size`.

## Format
As DenseLists store an already known `length` or the total number of elements in the list therefore will always begin with an unsigned 16 bit integer representing the length, followed by an unsigned 32 bit integer for the `n` size of the upcoming element and `n` size of bytes representing the element followed by a repeating pattern of size + element:
```
[length:UInt16BE][size:UInt32BE][element][size:UInt32BE][element]...
```
e.g. a list of two buffers with byte values `1 3 5` and  `2 4` can be packed to the following:
```
0 2   0 3   1 3 5   0 2   2 4
```
And later on can be easily unpacked by reading `lenght` and n number of sizes and elements where n is the length.

## Limits
- Up to a maximum of *65535* items within a single list. `<UInt16BE>`
- Each item is capped at roughly 4gb. `<UInt32BE>`

To overcome this limits a higher-level protocol is needed to create and pass multiple DenseLists.

## Uses
A DenseList is meant to be used in binary streams whereby the receiver will receive multiple DenseLists overtime and has the ability to unpack them at will. Note that DenseList itself is not a protocol but a simple datastructure and therefore is not efficient for multiplexing when used without a higher-level protocol.

A key/value store can be implemented using DenseList if each k/v pair can be represented in order.
