<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;

use Illuminate\Http\Request;

class MailController extends Controller
{
    public function sendEmail($email,$mail){
        try{
            Mail::to($email)->send(new SendMail($mail));
        } catch (\Exception $e)
        {
            return (new ServiceController())->apiResponse(500,[],$e->getMessage());
        }
    }
}