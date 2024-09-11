<?php

namespace App\Http\Controllers;
use Spatie\Permission\Models\Role;
use Illuminate\Http\JsonResponse;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index() 
    {
        try
        {
            $roles = Role::where('is_deleted',false)->get();

            return (new ServiceController())->apiResponse(200,$roles,"List of roles");
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

            
            if(Role::whereName($request->name)->exists()){
                return (new ServiceController())->apiResponse(404,[],"This role already exist yet");
            }
            $role = new Role();
            $role->name = $request->name;
            $role->save();
            return (new ServiceController())->apiResponse(200,$role,"Role added successfully!");
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
            $role = Role::whereId($id)->first();
            if(!$role){
                return (new ServiceController())->apiResponse(404,[],"Role not found");
            }
            return (new ServiceController())->apiResponse(200,$role,"Detail of role");
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

            $role = Role::whereId($id)->first();
            if(!$role){
                return (new ServiceController())->apiResponse(404,[],"Role not found");
            }

            $role->name = $request->name;
            $role->save();
            return (new ServiceController())->apiResponse(200,$role,"Role updated successfully!");

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
            $role = Role::whereId($id)->first();
            if(!$role){
                return (new ServiceController())->apiResponse(404,[],"Role not found");
            }

            $role->is_deleted = true;
            $role->save();
            return (new ServiceController())->apiResponse(200,[],"Role deleted successfully!");

        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }
}
