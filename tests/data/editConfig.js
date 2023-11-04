const EDIT_CONFIG_TEST = [
  {
    filepath: 'tests/integration/fileToUpdate/route.php',
    content:
      "Route::get('/{{subModuleName_lw}}', '{{subModuleName_capitalized}}Controller@index');",
    baseContent: '<?php\n' + '\n' + 'echo "hello test";',
  },
];

export default EDIT_CONFIG_TEST;
