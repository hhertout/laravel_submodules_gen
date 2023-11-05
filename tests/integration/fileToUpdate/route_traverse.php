<?php

echo "hello test";
Route::prefix('admin')->group(function () {
    Route::get('/users', function () {
        Route::get('/testmodule', 'TestModuleController@index');
    });
});