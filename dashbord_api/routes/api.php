<?php

use App\Http\Controllers\RegisterConrtroller;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('home', function () {
    // return $request->user();
    // return response()->json('hello');
    return 'hello';
});
Route::post('register', [RegisterConrtroller::class, 'register']);
Route::post('login/google/{email}/{name}', [LoginController::class, 'handleGoogleLogin']);
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LogoutController::class, 'logout']);

Route::get('/role/index', [RoleController::class, 'index']);
Route::post('/role/create', [RoleController::class, 'create']);
Route::get('/role/show/{id}', [RoleController::class, 'show']);
Route::post('/role/update/{id}', [RoleController::class, 'update']);
Route::post('/role/destroy/{id}', [RoleController::class, 'destroy']);

Route::get('/permission/index', [PermissionController::class, 'index']);
Route::post('/permission/create', [PermissionController::class, 'create']);
Route::get('/permission/show/{id}', [PermissionController::class, 'show']);
Route::post('/permission/update/{id}', [PermissionController::class, 'update']);
Route::post('/permission/destroy/{id}', [PermissionController::class, 'destroy']);
