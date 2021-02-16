## Introduction
This project is built on top of [react-boiler-plate with typescript](https://github.com/react-boilerplate/react-boilerplate-cra-template)
It supports out-of-the-box many things. You can view more in feature section

## Install & Start
# Server
⚠️ Using [Yarn Package Manager](https://yarnpkg.com) is recommended over `npm`.

You should have database MySQL running
The config for it is at /server/ormconfig.json

Go to /server

```shell
yarn install
yarn start 
```
This should bring your server up at port 3001

```shell
yarn migration:run
```
This need to run after backend is up
This should create a base database including tables: users, feedbacks. With 1 admin and 2 employees and 1 feedback
Please check out the supported routes under server/readme.md

# Client
Then go to the root directory

```shell
yarn install 
yarn start
```
==> should bring frontend up at port 3000 
---

# Assumption 
- Due to time-limit, the scope is minimized to only functionality and UI designed is at its minimum
- Some parts of the application can be improved in terms of performance such as pagination and better redux state management. However, in this version, we dont have that. So to keep state up-to-date, it queries backend quite often. 

# Application scope

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedbackhttps://github.com/Pay-Baymax/FullStackEngineerChallenge

## Features

> This project is **NOT** a framework, UI component library or a design system. The only purpose of this template is to assist you starting your CRA app with a solid tool stack and development patterns. It's 100% customizable. After you start your journey and once you understand the concepts offered here you should personalize your code accordingly instead of being tied to the starter project.
>
> You can add or remove literally anything and use whichever library or tools you prefer.

<dl>

  <dt>Predictable state management</dt>
  <dd>Unidirectional data flow allows for change logging and time travel debugging.</dd>

  <dt>Instant feedback</dt>
  <dd>Enjoy the best DX (Developer eXperience) and code your app at the speed of thought! Your saved changes to the CSS and JS are reflected instantaneously without refreshing the page. Preserve application state even when you update something in the underlying code!</dd>

  <dt>Next generation CSS</dt>
  <dd>Write composable CSS that's co-located with your components for complete modularity. Unique generated class names keep the specificity low while eliminating style clashes. Ship only the styles that are on the page for the best performance.</dd>

  <dt>Industry-standard routing</dt>
  <dd>It's natural to want to add pages (e.g. `/about`) to your application, and routing makes this possible.</dd>

  <dt>Industry-standard i18n internationalization support</dt>
  <dd>Scalable apps need to support multiple languages, easily add and support multiple languages.</dd>

  <dt>Typescript</dt>
  <dd>Typescript is the key to scalability. Build self-documented code, easy-to-debug code and create maintainable large applications and codebases with a highly productive development experience.</dd>

  <dt>Quick scaffolding</dt>
  <dd>Create components, containers, routes, selectors and sagas - and their tests - right from the CLI!</dd>

  <dt>Static code analysis</dt>
  <dd>Focus on writing new features without worrying about formatting or code quality. With the right editor setup, your code will automatically be formatted and linted as you work.</dd>

  <dt>SEO</dt>
  <dd>We support SEO (document head tags management) for search engines that support indexing of JavaScript content. (eg. Google)</dd>
</dl>

But wait... there's more!

- _The best test setup:_ Automatically guarantee code quality and non-breaking
  changes. (Seen a react app with 100% test coverage before?)
- _The fastest fonts:_ Say goodbye to vacant text.
- _Stay fast_: Profile your app's performance from the comfort of your command
  line!

<sub><i>Keywords: Create React App, React Boilerplate, Custom Template, Typescript, React.js, Redux, Hot Reloading, ESNext, Babel, react-router, `styled-components`, redux-saga, FontFaceObserver</i></sub>
