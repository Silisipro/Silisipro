<?php

namespace App\Http\Controllers;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index() 
    {
        try
        {
            $permissions = Permission::where('is_deleted',false)->get();

            return (new ServiceController())->apiResponse(200, $permissions, "List of permissions");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function create(Request $request)
    {
        try
        {
            $request->validate([
                "name"=>"required"
            ]);

            
            if(Permission::whereName($request->name)->exists()){
                return (new ServiceController())->apiResponse(404,[],"This permission already exist yet");
            }
             $permissions = new Permission();
             $permissions->name = $request->name;
             $permissions->save();
            return (new ServiceController())->apiResponse(200, $permissions,"Permission added successfully!");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function show($id)
    {
        try
        {
             $permissions = Permission::whereId($id)->first();
            if(! $permissions){
                return (new ServiceController())->apiResponse(404,[],"Permission not found");
            }
            return (new ServiceController())->apiResponse(200, $permissions,"Detail of permission");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function update(Request $request, $id) 
    {
        try
        {
            $request->validate([
                "name"=>"required"
            ]);

             $permissions = Permission::whereId($id)->first();
            if(! $permissions){
                return (new ServiceController())->apiResponse(404,[],"Permission not found");
            }

             $permissions->name = $request->name;
             $permissions->save();
            return (new ServiceController())->apiResponse(200, $permissions,"Permission updated successfully!");

        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    public function destroy($id) 
    {
        try
        {
             $permissions = Permission::whereId($id)->first();
            if(! $permissions){
                return (new ServiceController())->apiResponse(404,[],"Permission  not found");
            }

             $permissions->is_deleted = true;
             $permissions->save();
            return (new ServiceController())->apiResponse(200,[],"Permission deleted successfully!");

        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }
}

