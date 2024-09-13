<?php

use App\Http\Controllers\RegisterConrtroller;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\UserServiceController;
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
Route::get('activeCompte/{email}', [LoginController::class, 'activeCompte']);
Route::post('logout', [LogoutController::class, 'logout'])->middleware('auth:sanctum');

Route::post('service/activeService/{name}', [UserServiceController::class, 'activeService'])->middleware('auth:sanctum');
Route::post('service/desactiveService/{id}', [UserServiceController::class, 'desactiveService'])->middleware('auth:sanctum');
Route::get('service/getUserService/{id}', [UserServiceController::class, 'getUserService'])->middleware('auth:sanctum');


Route::get('home', function () {

    return 'hello';
});


