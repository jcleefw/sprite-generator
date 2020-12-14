This is a simple gulp project to help generate svg sprites from a list of svg icons to the desired color set

### More details

The current code only supports a very specific path of coloring.

A typical svg will wrap a path that are as below code

```svg
<path
    d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
    fill="black"></path>
```

1. Fills

- All fills that are

There are also 2 types of coloring it support
1

### How to use

1. Put in the desired svg that you want into /assets folder.
