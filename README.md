# Vue Library Starter

[![NPM][npmBadge]][npmUrl]
[![Minzip Package][bundlePhobiaBadge]][bundlePhobiaUrl]
[![NPM Download][npmDtBadge]][npmDtUrl]

[npmBadge]: https://img.shields.io/npm/v/vue-library-starter.svg?maxAge=2592000
[npmUrl]: https://www.npmjs.com/package/vue-library-starter
[npmDtBadge]: https://img.shields.io/npm/dt/vue-library-starter.svg
[npmDtUrl]: https://www.npmjs.com/package/vue-library-starter
[bundlePhobiaBadge]: https://img.shields.io/bundlephobia/minzip/vue-library-starter
[bundlePhobiaUrl]: https://bundlephobia.com/package/vue-library-starter@latest

> A minimal Vue library starter, built on top of Vite & Vue 3

## Table of Contents

<details>

<summary>TOC</summary>

- [Vue Library Starter](#vue-library-starter)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Use the Template](#use-the-template)
    - [GitHub Template](#github-template)
    - [Clone to local](#clone-to-local)
  - [Usage](#usage)
    - [1、Install dependencies](#1install-dependencies)
    - [2、Build a library](#2build-a-library)
    - [3、Build nuxt library](#3build-nuxt-library)
    - [4、Publish to npm](#4publish-to-npm)
  - [License](#license)

</details>

## Features

- Package manager [pnpm](https://pnpm.js.org/), safe and fast
- Bundle with the [library mode](https://vitejs.dev/guide/build.html#library-mode)
- Release with [semantic-release](https://www.npmjs.com/package/semantic-release)
- Publish to [npm](https://docs.npmjs.com/cli/v8/commands/npm-publish)

## Use the Template

### GitHub Template

[create a repo from this template on GitHub](https://github.com/new?template_name=vue-library-starter&template_owner=xiaoluoboding)

### Clone to local

```bash
git clone https://github.com/xiaoluoboding/vue-library-starter

cd vue-library-starter
```

## Usage

Building it is as easy as 1, 2, 3.

### 1、Install dependencies

```bash
pnpm install
```

### 2、Build a library

Rename all the `vue-library-starter` to your component name in the file `package.json、vite.config.ts`, eg: `my-component`

```bash
pnpm run build:lib
```

### 3、Build nuxt library

This repository ships a Nuxt module so you can use the library in Nuxt projects.

- Prepare the Nuxt playground and stub the module (handy for local testing)

```bash
pnpm run dev:nuxt:prepare
```

- Run the Nuxt playground to verify everything works

```bash
pnpm run dev:nuxt
```

- Build the Nuxt module artifacts to `lib/nuxt`

```bash
pnpm run build:module
```

- (Optional) Build all outputs (ESM, UMD, Nuxt) in one go

```bash
pnpm run release
```

Use in a Nuxt app by adding the module and CSS in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['vue-library-starter/nuxt'],
  css: ['vue-library-starter/style.css']
})
```

### 4、Publish to npm

```bash
npm publish
```

## License

MIT [@xiaoluoboding](https://github.com/xiaoluoboding)
