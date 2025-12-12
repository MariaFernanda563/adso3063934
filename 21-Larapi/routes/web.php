<?php

use Illuminate\Support\Facades\Route;
use function Termwind\style;

Route::get('/', function () {
    return "<h1 style='text-align: center; margin: 24rem auto; font-family: Arial'>
        ✅ Check API Endpoints in Postman or Apidog 🚀 
    </h1>";
});
