const FILES_TO_UPDATE_LIST = [
  {
    filepath: 'route.php',
    content:
      "Route::get('/{{subModuleName_lw}}', '{{subModuleName_capitalized}}Controller@index');",
  },
];

export default FILES_TO_UPDATE_LIST;
