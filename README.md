
presentation-base
=================

My template for creating slides in HTML format with [Remark][remark]. Uses [Node][node], [Bower][bower], and [Gulp][gulp].

[remark]: https://github.com/gnab/remark
[node]: https://nodejs.org/
[bower]: http://bower.io/
[gulp]: http://gulpjs.com/


Use
---

Copy the contents of the repository, then install npm and Bower dependencies.

```sh
npm install
bower install
```

Then edit `src/slides.md` at least, and `src/slides.html` for styles.

To copy the Remark .js files, do:

```sh
gulp vendor
```

And to generate the `build/slides.html` output file do just:

```sh
gulp
```

To monitor for file changes and keep the output HTML file updated, do:

```sh
gulp --watch
```

