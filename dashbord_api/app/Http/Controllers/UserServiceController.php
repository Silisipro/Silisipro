<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserServiceController extends Controller
{
    public function activeService($name){
        try
        {
            $serviceName = ['Drive','Calendar', 'Youtube','FavoriteTamWidget','Mail','Exchange rate','Astronomie','Space'];

            if (!in_array($name, $serviceName)) {
                return (new ServiceController())->apiResponse(404,[],"Service not found");
            }

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

    public function getUserService(Request $request){
        try
        {

            $services =[
                ["service" => "Home"],
                ["service" => "Weather"],
            ];

            $id = $request->query('id')??Auth::user()->id;

            if($request->query('id')){
                if(!$this->verifyAdmin()){

                    return (new ServiceController())->apiResponse(404,[],"Admin only can see another person service");
                }
            }

            foreach(UserService::where('user_id',$id)->get() as $service){
                $services[] = $service;
            }


            return $services;
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function getServiceById($id){
        return  UserService::where('user_id',$id)->get();
    }

    public function verifyAdmin(){
        if(Auth::user()->is_admin != 1){
            return 0;
        }
        return 1;
    }

    public function getUserByService($serviceName){
        try
        {

            $services = ['Drive','Calendar', 'Youtube','FavoriteTamWidget','Mail','Exchange rate','Astronomie','Space'];

            if (!in_array($serviceName, $services)) {
                return (new ServiceController())->apiResponse(404,[],"Service not found");
            }
            $users = [];
            if(!$this->verifyAdmin()){

                return (new ServiceController())->apiResponse(404,[],"Admin only can see person who enabled a service");
            }
            foreach(UserService::all() as $service){
                if($service->service == $serviceName){
                    $users[] = User::whereId($service->user_id)->first();
                }
            }

            $data[] = [
                'users' => $users,
                'count' => count($users)
            ];

            return (new ServiceController())->apiResponse(200,$data,"List and number of user by service");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

}

