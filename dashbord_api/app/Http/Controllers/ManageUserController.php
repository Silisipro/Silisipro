<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ManageUserController extends Controller
{
    public function getUser(){
        try
        {

            if(!(new UserServiceController())->verifyAdmin()){
                return (new ServiceController())->apiResponse(404,[],"Admin only can see list of users");
            }
           $users = User::where('is_admin',0)->get();

           return (new ServiceController())->apiResponse(200,$users,"Liste des utilisateurs");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function getAdmin(){
        try
        {
            if(!(new UserServiceController())->verifyAdmin()){
                return (new ServiceController())->apiResponse(404,[],"Admin only can see list of admin");
            }
           $users = User::where('is_admin',1)->get();

            return (new ServiceController())->apiResponse(200,$users,"List of admins");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function AssignRoleAdminToUser($id){
        try
        {
            $user = User::whereId($id)->first();
            if(!$user){
                return (new ServiceController())->apiResponse(404,[],"User not found");
            }
            if($user->is_admin == 1){
                return (new ServiceController())->apiResponse(404,[],"User already admin");
            }
            $user->is_admin = 1;
            $user->save();
            return (new ServiceController())->apiResponse(200,[],"Role admin assign successfully!");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function RevokeRoleAdminToUser($id){
        try
        {
            $user = User::whereId($id)->first();
            if(!$user){
                return (new ServiceController())->apiResponse(404,[],"User not found");
            }
            if($user->is_admin == 0){
                return (new ServiceController())->apiResponse(404,[],"User is not admin");
            }
            $user->is_admin = 0;
            $user->save();
            return (new ServiceController())->apiResponse(200,[],"Role admin revoke successfully!");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function show($id){
        try
        {
            $user = User::whereId($id)->first();
            if(!$user){
                return (new ServiceController())->apiResponse(404,[],"User not found");
            }
           
            return (new ServiceController())->apiResponse(200,$user,"User Detail");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function getStatics(){
        try
        {
            $users = User::where('is_admin',0)->count();
            $admins = User::where('is_admin',1)->count();
            $allUsers = User::count();

            $data = [
                "users" => $users,
                "admins" => $admins,
                "allUsers" => $allUsers,
            ];
            return (new ServiceController())->apiResponse(200,$data,"Statistiques");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }
}
