<?php

use App\Http\Controllers\RegisterConrtroller;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\ManageUserController;
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
Route::get('service/getUserService', [UserServiceController::class, 'getUserService'])->middleware('auth:sanctum');
Route::get('service/getUserByService/{name}', [UserServiceController::class, 'getUserByService'])->middleware('auth:sanctum');

Route::get('users/getUser', [ManageUserController::class, 'getUser'])->middleware('auth:sanctum');
Route::get('users/getAdmin', [ManageUserController::class, 'getAdmin'])->middleware('auth:sanctum');
Route::post('users/AssignRoleAdminToUser/{id}', [ManageUserController::class,   'AssignRoleAdminToUser'])->middleware('auth:sanctum');
Route::post('users/RevokeRoleAdminToUser/{id}', [ManageUserController::class, 'RevokeRoleAdminToUser'])->middleware('auth:sanctum');
Route::get('users/getStatics', [ManageUserController::class, 'getStatics'])->middleware('auth:sanctum');
Route::get('users/show/{id}', [ManageUserController::class, 'show'])->middleware('auth:sanctum');
Route::post('users/destroy/{id}', [ManageUserController::class, 'destroy'])->middleware('auth:sanctum');



Route::get('home', function () {

    return 'hello';
});


