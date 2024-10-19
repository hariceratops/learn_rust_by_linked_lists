# Yet another Linked List Implementation in Rust

The purpose of the document is to record the progress of learning Rust whilst coming from C++ background.
A written document about the progress might signify a solid understanding. In turn this may help also 
others pursuing to learn Rust.

Though C++ and Rust do have some similarities, their philosophies are different. Learning 
through identifying analogies is not perfect but will ease things.

This is inspired by the series [Learn Rust With Entirely Too Many Linked List](https://rust-unofficial.github.io/too-many-lists/index.html)

Linked Lists do not have a great reputation with the advent of modern processors, as they are
not cache friendly. Neverthless they are basic abstract data structures and serve their purpose in niche use cases
like in kernels, hence implementing some will cover a wide range of concepts spanning across Rust's 
* Basic syntax
* Type system
* Ownerships
* Borrowing
* Lifetimes
* Memory management primitives such as Box, Rc and Arc

Spoiler alert! Frankly speaking, implementing Linked List or any node based data structure is quite a feat for a novice, since it takes a bit of effort to convince
the Rust compiler that the given piece of implementation is safe.

