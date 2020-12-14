This is a simple gulp project to help generate svg sprites from a list of svg icons to the desired color set

### More details

The current code only supports a very specific path of coloring.

A typical svg will wrap a path that are as below code

```html
<path
  d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
  fill="black"
  stroke="grey"
></path>
```

1. Fills

- All fills that has value of `black` will be replace with `solid` color in the config
- All files that has value of `grey` will be replace with `fade` color in the config

2. Stroke

- this is optional
-

### How to use

1. Put in the desired svg that you want into /assets folder.
2. Run the following line to generate icons in colors

```bash
yarn gulp cheerio
```

3. Run the following line to compile the icons in to rows

```bash
yarn gulp spriteRow
```

4. Run the following line to compile them into one big file

```bash
yarn gulp pack
```

5. You should see the compile svg fils in a folder `build > view >`. Your final file output is `sprite.view.svg`
