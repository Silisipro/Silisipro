<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RegisterConrtroller extends Controller
{
    public function register(RegisterRequest $request)
    {
        try
        {
            // $request->validate([
            //     'name' => 'required',
            //     'email' => 'required',
            //     'password' => 'required',
            // ]);
            $role = 'user';

            if(Role::whereName($role)->first()->is_deleted == true){
                return (new ServiceController())->apiResponse(404,[],"This role is deleted");
    
                }

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password =  Hash::make($request->password);
            $user->save();
            
            $user->assignRole($role);

            
            // assign role to user
            
            return (new ServiceController())->apiResponse(200,$user,"User created successfully!");

        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
                
        }
    }

