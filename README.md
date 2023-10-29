# laravel_submodules_gen

# Description

# Installation
```bash
npm install
```

# Usage

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

Then, you must add the generated template to the ```destinationPath.enum.js``` file.

Caution ! 
- The key must be the same as the template name. Replace the ```.``` by ```_``` (as well for the extension).
  Example : ``app.module.js`` become ```app_module_js```
- The value is the destination path where the template must be in your application.

# Contributing

# Release

You can found pre-release && release related for each tag
