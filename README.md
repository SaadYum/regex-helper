# Regular Expression Helper
Regular Expressions should be a valuable part of any developers toolbox. They provide a
concise way to describe a pattern that can be used to test, search, match, replace, or split the
contents of a string. Regular Expressions provide functionality you might otherwise have to
implement using loops and more lines of code.
The Regular Expression Helper helps you learn more about Regular Expressions by building a
useful tool you'll also be able to use to test expressions you use in your apps.

## Installation
### Prerequisites
* Your system should have [NODE JS](https://nodejs.org/en/) installed on it
### Steps
1. Clone the Repo
2. Open your system terminal in the cloned directory
3. run command `npm install`
4. run command `npm start`
5. App will start running on `localhost:3000`


![Sample Screenshot](https://github.com/SaadYum/regex-helper/blob/main/public/sample.PNG)

## Features

- User can enter a regular expression.
- User can enter a string the regular expression can be run against.
- User can click a 'Run' button to test
- User can see a warning message if no regular expression was entered.
- User can see a warning message if no string was entered.
- User can see the matching text highlighted indicating if `test()` was able to locate the
pattern in the string.
- User can see a message if none of the text was matched.

- User can select the flags (like 'g') to be used in the regular expression from a dropdown
i.e global, case insensitive, multiline, sticky.
- User can select the RegExp function to be applied from a dropdown - test, search, or
match
- User can see a message indicating the result of the selected RegExp function.
