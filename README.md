<p align="center">
  <h1 align="center">Lavarel Submodule Builder</h1>
    <p align="center">A tool for generating a customizable submodule boilerplate.</p>
</p>

<p align="center">
    <img src="https://img.shields.io/github/v/release/hhertout/laravel_submodules_gen.svg" />
    <a href="https://github.com/hhertout/rac_tool/actions">
      <img alt="Tests Passing" src="https://github.com/hhertout/laravel_submodules_gen/actions/workflows/tests.yml/badge.svg" />
    </a>
<a href='https://coveralls.io/github/hhertout/laravel_submodules_gen'><img src='https://coveralls.io/repos/github/hhertout/laravel_submodules_gen/badge.svg' alt='Coverage Status' /></a>
</p>

# Presentation

An all-in-one development tool that simplifies the process of creating and customizing submodules for your projects.
Accelerate your development workflow and maintain modular, reusable code with ease.

The tool is highly customizable, making it adaptable to fit the unique needs of any project. Tailor submodules to your
specific requirements and ensure seamless integration into your software development process.

# Installation

### Globally

```bash
npm install -g github:hhertout/laravel_submodules_gen
```

### Locally

```bash
npm install github:hhertout/laravel_submodules_gen
```

# Usage

```bash
npx <repository>
```

Then answer the questions to create the submodule.

# Customize your own tool

Clone the repository and install dependencies.
You need to have nodejs installed on your computer (with version > 16).

```bash
git clone <repository>
```

```bash
npm install
```

## Configuration

### Templates

#### Create your templates

Create your templates in `src/templates` folder. You can find folder relative to the technology you want to use.

You must add `.template` extension to your template file to add them to the generation process.

#### Variables

You can use these variables in your templates:

```
{{subModuleName_lw}} // subModuleName in lower case
{{subModuleName_up}} // subModuleName in upper case
{{subModuleName_camel}} // subModuleName in camel case
{{subModuleName_capitalized}} // subModuleName in pascal case
{{subModuleName}} // subModuleName in original case
```

### Generating templates

To generate templates:

```bash
npm run generate
```

will generate all the referred in `src/templates` templates in `generated.js` file.

### Refer the template to the dest path

Then, you must add the generated template to the `destinationPath.js` file.

```js
// EXEMPLE - to adapt depend of your needs
const DESTINATION_PATH = {
  vanilla_app_module_js: 'assets/js/submodules',
  react_app_jsx: 'assets/js/submodules',
  react_app_module_js: 'assets/js/submodules',
  solid_app_jsx: 'assets/js/submodules',
  solid_index_js: 'assets/js/submodules',
  solid_view_blade_php: 'ressources/views/submodules',
};
```

Rules :

- The key must be the same as the template name. Replace the `.` by `_` (as well for the extension).

  Example : `app.module.js` become `app_module_js`

- The value is the destination path where the template must be in your application.

### Case of specifics files

Certain files within this project receive unique treatment by the algorithm.

This specific handling caters to the distinctive requirements of such files, allowing them to follow a
different naming convention or undergo alternative processing. Before submitting files for processing, consult the
relevant documentation to understand the specific considerations for each file type.

For example, `controller.php.template` will be generated to `<module_name>Controller.php`.

A list of files that receive special treatment is provided below:

- `controller.php.template` : will be generated to `<module_name>Controller.php`
- `index.js.template` : will be generated to `<module_name>.module.js`

### Editing files with the new submodule

In case you need to update some file, for example the `route.php` file. You can configure it with the tool.

The configuration is available in `src/config/fileToUpdate.js` file.

```js
const FILES_TO_UPDATE_LIST = [
  {
    filepath: 'route.php',
    content:
      "Route::get('/{{subModuleName_lw}}', '{{subModuleName_capitalized}}Controller@index');",
  },
];
```

You can add as many files as you want. The content will be add at the last line of the file.

You can specify the position of the insertion of the content with the `traverse` key. The default value start at the end
of the file.

```js
const FILES_TO_UPDATE_LIST = [
  {
    filepath: 'route.php',
    content:
      "Route::get('/{{subModuleName_lw}}', '{{subModuleName_capitalized}}Controller@index');\n",
    traverse: {
      // from the end of the file
      key: '}', // target key where to insert the content
      count: 2, // how many times to traverse the key
    },
  },
];
```

### Dependencies installation

You can customize your own dependencies installation depend of your needs.

The configuration is available in `src/config/dependencies.js` file.

```js
const DEPENDENCIES = {
  REACT: ['react', 'react-dom', 'react-router-dom'],
  SOLID: ['solid-js', '@solidjs/router'],
};
```

Simply add your dependencies to the array based on the selected framework. These dependencies will be installed
automatically if the user chooses to install them.

# Contributing

We welcome contributions from the community to help improve this tool. To contribute, please follow these steps:

- Create a new branch from the dev branch.
- Make your changes or additions.
- Push your branch to the repository.
- Open a Pull Request (PR) targeting the dev branch.
- A review and merge of your PR will be done as soon as possible.
- Thank you for contributing to the project, and let's make it even better together!

# Release

You can found pre-release && release related for each tag
