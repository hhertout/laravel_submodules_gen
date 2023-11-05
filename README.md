<p align="center">
  <h1 align="center">Lavarel Submodule Builder</h1>
    <p align="center">A tool for generating a customizable submodule boilerplate.</p>
</p>

<p align="center">
    <img src="https://img.shields.io/github/v/release/hhertout/laravel_submodules_gen.svg" />
    <a href="https://github.com/hhertout/rac_tool/actions">
      <img alt="Tests Passing" src="https://github.com/hhertout/laravel_submodules_gen/actions/workflows/tests.yml/badge.svg" />
    </a>
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
Create your templates in ```src/templates``` folder. You can find folder relative to the technology you want to use.

You must add ```.template``` extension to your template file to add them to the generation process.

#### Variables
You can use these variables in your templates:

```
{{subModuleName_lw}} // subModuleName in lower case
{{subModuleName_up}} // subModuleName in upper case
{{subModuleName_camel}} // subModuleName in camel case
{{subModuleName_capitalized}} // subModuleName with first letter capitalized
{{subModuleName}} // subModuleName in original case
```

### Generating templates
To generate templates: 
```bash
npm run generate
``` 
will generate all the referred in ```src/templates``` templates in ```generated.js``` file.

### Refer the template to the dest path

Then, you must add the generated template to the ```destinationPath.js``` file.

Caution ! 
- The key must be the same as the template name. Replace the ```.``` by ```_``` (as well for the extension).
  Example : ``app.module.js`` become ```app_module_js```
- The value is the destination path where the template must be in your application.

### Editing files with the new submodule

In case you need to update some file, for example the ```route.php``` file. You can configure it with the tool.

To complete...Coming soon...

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
