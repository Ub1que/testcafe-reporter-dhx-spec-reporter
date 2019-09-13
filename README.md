# testcafe-reporter-dhx-spec-reporter
[![Build Status](https://travis-ci.org/Ub1que/testcafe-reporter-dhx-spec-reporter.svg)](https://travis-ci.org/Ub1que/testcafe-reporter-dhx-spec-reporter)

This is the **dhx-spec-reporter** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/Ub1que/testcafe-reporter-dhx-spec-reporter/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-dhx-spec-reporter
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter dhx-spec-reporter
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('dhx-spec-reporter') // <-
    .run();
```

## Author
Ivan Ladyha 
