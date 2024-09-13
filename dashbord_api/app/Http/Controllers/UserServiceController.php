<?php

namespace App\Http\Controllers;

use App\Models\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserServiceController extends Controller
{
    public function activeService($name){
        try
        {
            $userId = Auth::user()->id;
            $exist = UserService::whereService($name)->where('user_id',$userId)->exists();
            if($exist){
                return (new ServiceController())->apiResponse(404,[],"Service already enabled");
            }

           $service = new UserService();
           $service->service = $name;
           $service->user_id = $userId;
           $service->save();

           return (new ServiceController())->apiResponse(200,$service,"Service enabled successfully!");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function desactiveService($id){
        try
        {

           $service = UserService::whereId($id)->first();
           if(!$service){
               return (new ServiceController())->apiResponse(404,[],"Service not found");
           }

           if($service->user_id != Auth::user()->id){
               return (new ServiceController())->apiResponse(404,[],"You cannot desactive a service that not belongs to you");
           }

           $service->delete();

           return (new ServiceController())->apiResponse(200,[],"Service disabled successfully");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function getUserService($id=null){
        try
        {
            $id = $id??Auth::user()->id;

           $services = UserService::where('user_id',$id)->get();

        //    return (new ServiceController())->apiResponse(200,$services,"Service disabled successfully");

        return $services;
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }
}

