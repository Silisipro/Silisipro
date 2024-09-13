<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Notifications\WelcomeEmail;
use Illuminate\Support\Facades\Notification;

class RegisterConrtroller extends Controller
{

     /**
 * @OA\Post(
 *     path="/api/register",
 *     tags={"Authentication"},
 *     summary="Add a user",
 *     description="Add a user",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 type="object",
 *                 @OA\Property(property="name", type="string", example="Doe", description="Nom de l'utilisateur"),
 *                 @OA\Property(property="email", type="string", format="email", example="john.doe@gmail.com", description="Adresse e-mail de l'utilisateur"),
 *                 @OA\Property(property="password", type="string", format="password", example="Bagdadi2000!", description="Confirmation du mot de passe (doit correspondre au mot de passe)"),
 *                 @OA\Property(property="password_confirm", type="string", format="password", example="Bagdadi2000!", description="Confirmation du mot de passe (doit correspondre au mot de passe)")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Utilisateur enregistré avec succès",
 *         @OA\JsonContent(
 *            @OA\Property(property="status_code", type="string", example="200"),
 *             @OA\Property(property="data", type="string", example="your-access-token"),
 *            @OA\Property(property="message", type="string", example="User created successfully!")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Erreur de validation",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="object", additionalProperties={"type": "string"})
 *         )
 *     )
 * )
 */

    public function register(RegisterRequest $request)
    {
        try
        {
            $request->validate([
                'name' => 'required',
                'email' => 'required',
                'password' => 'required',
            ]);


            $user = new User();
            $user->name = trim($request->name);
            $user->email = trim($request->email);
            $user->password =  trim(Hash::make($request->password));
            $user->save();

            Notification::send($user, new WelcomeEmail($user));


            return (new ServiceController())->apiResponse(200,User::whereEmail($user->email)->first(),"User created successfully!");

        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
                
        }
    }

