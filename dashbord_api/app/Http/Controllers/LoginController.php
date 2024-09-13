<?php

namespace App\Http\Controllers;

use App\Jobs\SendEmail;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;


/**
 * @OA\Info(
 *      title="Environnement de test des API du dashboard",
 *      version="1.0.0",
 *      description="test",
 *      @OA\Contact(
 *          email="",
 *      )
 * )
 */

class LoginController extends Controller
{

      /**
 * @OA\Post(
 *     path="/api/login/google/{email}/{name}",
 *     summary="login with google",
 *     description="ogin with google.",
 *     tags={"Authentication"},
 *     @OA\Parameter(
 *         name="filecode",
 *         in="path",
 *         description="Code unique du fichier",
 *         required=true,
 *         @OA\Schema(
 *             type="string"
 *         )
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         description="Fichiers à télécharger",
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="files",
 *                     type="array",
 *                     @OA\Items(type="string", format="binary")
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Fichier ajouté avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="data",
 *                 type="string",
 *                 example="file add successfuly"
 *             )
 *         )
 *     ),
 * )
 */
    public function handleGoogleLogin($email, $name) {

        try{
           
            $user = User::whereEmail($email)->first();
            $password =  bcrypt("Password@22");

            if(!$user){
                $user = new User();
                $user->name = trim($name);
                $user->email = trim($email);
                $user->password =  $password;
                $user->save();
                (new LoginController())->activeCompte($email);

                $plateforme = env('APP_NAME');

                $mail = [
                    'title' => 'Confirmation registration',
                    'body' =>"Bonjour, $name
                    Merci de vous être inscrit(e) sur notre plateforme via Google ! Un compte a été créé automatiquement pour vous avec l'adresse e-mail $email. Pour des raisons de sécurité, nous vous avons généré un mot de passe temporaire : Password@22.Nous vous conseillons de le modifier une fois connecter.
                    Cordialement, L'équipe  $plateforme"
                ];

                dispatch(new SendEmail($email, $mail));
            }
            (new LoginController())->activeCompte($email);
            $role = 0;

            $token = $user->createToken('auth_token')->plainTextToken;

            return (new ServiceController())->apiResponse(200,['user'=>$user, 'token'=>$token,'is_admin'=>$role],"Login successful!");
        } catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    /**
 * @OA\Post(
 *     path="/api/login",
 *     summary="make authentification",
 *     tags={"Authentication"},
 *      @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name"},
 *             @OA\Property(property="email", type="string", example="a@gmail.com"),
 *             @OA\Property(property="password", type="string", example="P@$$w0rd")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="connected successfully",
 *         @OA\JsonContent(
 *             @OA\Property(property="status_code", type="string", example="200"),
 *             @OA\Property(property="data", type="array", @OA\Items(type="string")),
 *            @OA\Property(property="message", type="string", example="Login successful!")
 *         )
 *     ),
 *     @OA\Response(
 *         response=202,
 *         description="Invalid credentials"
 *     )
 * )
 */



    public function login(Request $request) {
        try {

            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
    
            $email = trim($request-> email);
            $password = trim($request-> password);

            $user = User::where('email', $email)->first();

            if (!$user) {
                return (new ServiceController())->apiResponse(404,$user,"User not found. Please create an account first!");
            }

            if(is_null($user->email_verified_at)){

                $link = url('/api/activeCompte/'. $user->email);

                $body = "Activate your account by clicking on this link $link";

                $mail = [
                    'title' => 'Account activation link',
                    'body' =>$body
                ];

                dispatch(new SendEmail($email, $mail));
                return (new ServiceController())->apiResponse(404,[],"Please verify your email first.  An activation link has been sent to your email. Please click on it to activate your account!");
            }

            $role = $user->is_admin;
            if (Hash::check($password, $user->password)) {
                $token = $user->createToken('auth_token')->plainTextToken;
                return (new ServiceController())->apiResponse(200,['user'=>$user, 'token'=>$token,'is_admin'=>$role],"Login successful!");

            } else {
                return (new ServiceController())->apiResponse(401,[],"Incorrect password!");
            }
        } catch (\Exception $e) {

            return (new ServiceController())->apiResponse(500,[],$e->getMessage());

        }
    }

    public function activeCompte($email){
        try
        {
            $user = User::whereEmail($email)->first();
            if(!$user){
                return (new ServiceController())->apiResponse(404,User::whereEmail($user->email)->first(),"Account not found!");
            }
            $user->email_verified_at = now();
            $user->save();
            return redirect('https://app.dashboard.e-coye.com/');

            // return (new ServiceController())->apiResponse(200,$user,"Compte validé avec succès!");
        }
        catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }

    



}
