@extends('layouts.dashboard')

@section('title', 'Make Adoption: Larapets 🙀')

@section('content')


    <h1 class="text-4xl text-black flex gap-2 items-center justify-center pb-4 border-b-2 border-neutra-50 mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256">
            <path
                d="M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z">
            </path>
        </svg>
        Make Adoption
    </h1>

    {{-- Search --}}
    <label class="input text-white bg-[#0009] outline-none mb-10">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
            </g>
        </svg>
        <input type="search" placeholder="Search..." name="qsearch" id="qsearch" />
    </label>


    {{-- Table --}}
    <div class="overflow-x-auto rounded-box border text-white bg-[#0009]">
        <table class="table">
            <!-- head -->
            <thead>
                <tr class="text-white">
                    <th class="hidden md:table-cell">Id</th>
                    <th>Name Pet</th>
                    <th>Photo</th>
                    <th>Kind</th>
                    <th class="hidden md:table-cell">Weight</th>
                    <th>Age</th>
                    <th class="hidden md:table-cell">Breed</th>
                    <th class="hidden md:table-cell">Location</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="datalist">
                @foreach ($pets as $pet)
                    <tr @if ($pet->id % 2 == 0) class="bg-[#0006]" @endif>
                        <th class="hidden md:table-cell">{{ $pet->id }}</th>
                        <td>{{ $pet->name }}</td>
                        <td>
                            <div class="avatar">
                                <div class="mask mask-squircle w-24">
                                    <img src="{{ asset('images/' . $pet->image) }}" />
                                </div>
                            </div>
                        </td>
                        <td class="hidden md:table-cell">{{ $pet->kind }}</td>
                        <td class="hidden md:table-cell">{{ $pet->weight }} Kg</td>
                        <td>{{ $pet->age }} Years</td>
                        <td class="hidden md:table-cell">{{ $pet->breed }}</td>
                        <td class="hidden md:table-cell">{{ $pet->location }}</td>
                        <td>{{ Str::limit($pet->description, 10) }}</td>
                        <td>
                            <a class="btn btn-outline btn-xs" href="{{ url('makeadoption/' . $pet->id) }}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor"
                                    viewBox="0 0 256 256">
                                    <path
                                        d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z">
                                    </path>
                                </svg>
                            </a>
                            <form class="hidden" method="POST" action="{{ url('pets/' . $pet->id) }}">
                                @csrf
                                @method('delete')
                            </form>
                        </td>
                    </tr>
                @endforeach
                <tr class="bg-[#0009]">
                    <td colspan="7">{{ $pets->links('layouts.pagination') }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <dialog id="modal_delete" class="modal">
        <div class="modal-box bg-black text-white">
            <h3 class="text-lg font-bold">
                Are you sure?
            </h3>
            <div role="alert" class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="currentColor" viewBox="0 0 256 256">
                    <path
                        d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z">
                    </path>
                </svg>
                <span>You want to delete: <strong class="fullname"></strong></span>
            </div>
            <div class="flex gap-2 mt-4">
                <button class="btn btn-default btn-outline btn-sm btn-confirm">Confirm</button>
                <form method="dialog">
                    <button class="btn btn-default btn-outline btn-sm">Cancel</button>
                </form>
            </div>
    </dialog>
@endsection

@section('js')
    <script>
        $(document).ready(function () {
            //Modal
            const modal_message = document.getElementById('modal_message');
            @if (session('success'))
                modal_message.showModal();
            @endif
            //Delete
            $('table').on('click', '.btn-delete', function () {
                $fullname = $(this).attr('data-fullname')
                $('.fullname').text($fullname)
                $frm = $(this).next()
                modal_delete.showModal()
            })
            $('.btn-confirm').click(function () {
                $frm.submit();
            })
            // Search--------------
            function debounce(func, wait) {
                let timeout
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout)
                        func(...args)
                    };
                    clearTimeout(timeout)
                    timeout = setTimeout(later, wait)
                }
            }
            const search = debounce(function (query) {

                $token = $('input[name=_token]').val()

                $.post("search/makeadoption", { 'q': query, '_token': $token },
                    function (data) {
                        $('.datalist').html(data).hide().fadeIn(1000)
                    }
                )
            }, 500)
            $('body').on('input', '#qsearch', function (event) {

                event.preventDefault()
                const query = $(this).val()

                $('.datalist').html(`<tr>
                                <td colspan="7" class="text-center py-18">
                                    <span class="loading loading-infinity loading-xl"></span>
                                </td>
                            </tr>`)
                if (query != '') {
                    search(query)
                } else {
                    setTimeout(() => {
                        window.location.replace('makeadoption')
                    }, 500)
                }
            })
            //import 
            $('.btn-import').click(function (e) {
                $('#file').click()
            })
            $('#file').change(function (e) {
                $(this).parent().submit()
            })
        })
    </script>
@endsection