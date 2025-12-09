<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Pet;
use App\Models\Adoption;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    //My profile
    public function myprofile()
    {
        $user = User::find(Auth::user()->id);
        // dd($user->toArray());
        return view('customer.myprofile')->with('user', $user);
    }

    public function updatemyprofile(Request $request)
    {
        $validation = $request->validate([
            'document'  => ['required', 'numeric', 'unique:' . User::class . ',document,' . $request->id],
            'fullname'  => ['required', 'string'],
            'gender'    => ['required'],
            'birthdate' => ['required', 'date'],
            'phone'     => ['required'],
            'email'     => ['required', 'lowercase', 'email', 'unique:' . User::class . ',email,' . $request->id],
        ]);

        if ($validation) {
            // dd($request->all());
            if ($request->hasFile('photo')) {
                $photo = time() . '.' . $request->photo->extension();
                $request->photo->move(public_path('images'), $photo);
                if ($request->originphoto != 'null.webp') {
                    unlink(public_path('images/') . $request->originphoto);
                }
            } else {
                $photo = $request->originphoto;
            }
        }
        $user = User::find($request->id);
        $user->document  = $request->document;
        $user->fullname  = $request->fullname;
        $user->gender    = $request->gender;
        $user->birthdate = $request->birthdate;
        $user->photo     = $photo;
        $user->phone     = $request->phone;
        $user->email     = $request->email;
        if ($user->save()) {
            return redirect('dashboard')->with('message', 'My profile was successfully edited!');
        }
    }

    //My adoptions
    public function myadoptions()
    {
        $adopts = Adoption::where('user_id', Auth::user()->id)->get();
        return view('customer.myadoptions')->with('adopts', $adopts);
    }

    public function showadoption(Request $request)
    {
        $adopt = Adoption::find($request->id);
        return view('customer.showadoption')->with('adopt', $adopt);
    }

    //Make adoptions
    public function listpets()
    {
        $pets = Pet::where('status', '0')->orderBy('id', 'DESC')->paginate(20);
        return view ('customer.makeadoption')->with('pets', $pets);
    }

    public function confirmadoption(Request $request)
    {

    }

    public function makeadoption(Request $request)
    {
        
    }

    public function search(Request $request)
    {
        $pets = Pet::Kinds($request->q)->orderBy('id', 'desc')->paginate(20);
        return view('customer.search')->with('pets', $pets);
    }

}
