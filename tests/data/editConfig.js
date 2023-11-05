const EDIT_CONFIG_TEST = [
  {
    baseContent:
      "<?php\n\necho \"hello test\";\nRoute::prefix('admin')->group(function () {\n    Route::get('/users', function () {\n    });\n});", // Only on test file
    filepath: 'tests/integration/fileToUpdate/route_traverse.php',
    content:
      "Route::get('/{{subModuleName_lw}}', '{{subModuleName_capitalized}}Controller@index');\n",
    traverse: {
      // from the end of the file
      key: '}', // target key where to insert the content
      count: 2, // how many times to traverse the key
    },
  },
  {
    baseContent: '<?php\n\n', // Only on test file
    filepath: 'tests/integration/fileToUpdate/route.php',
    content:
      "Route::get('/{{subModuleName_lw}}', '{{subModuleName_capitalized}}Controller@index');",
  },
];

export default EDIT_CONFIG_TEST;
