// G-var 
let meals,
    Details

// Run 

scroll();
getMeal('');
$('.nav-menu').click(openNav);
$('.nav-logo img').click(home);
$('.menu a').click(getMovieAttr);
$("#back-to-top").click(topZero);
$(document).ready(function () {
    $('.loading').fadeOut(1000);
});

// end 

// nav-bar 

function openNav() {
    if ($("nav").css("margin-left") == "250px") {
        closeNav();
    } else {
        $(".side-nav").css("margin-left", "0px");
        $("nav").css("margin-left", "250px");
        $('.menu ul li').animate({
            "paddingTop": "25px",
            "opacity": "1"
        }, 1000);
        $('.nav-menu').html('<i class="fa-solid fa-xmark"></i>');
        $('.copyrights p a').addClass('animate__flipInX animate__delay-1s');
    }
};
function closeNav() {
    $('.menu ul li').animate({
        "paddingTop": "250px",
        "opacity": "0"
    }, 1000);
    $(".side-nav").css("margin-left", "-250px");
    $("nav").css("margin-left", "0px");
    $('.nav-menu').html('<i class="fa-solid fa-align-justify"></i>');
    $('.copyrights p a').removeClass('animate__flipInX animate__delay-1s');
}

// end nav-bar 

// Api part one 

async function getMeal(term) {
    let api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
    let myHttp = await fetch(`${api}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        display(Data);
    }
}
async function getFirstLetter(term) {
    let api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`;
    let myHttp = await fetch(`${api}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        display(Data);
    }
}
async function getMealDetails(mealID) {
    let api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    let myHttp = await fetch(`${api}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        $('.loading').fadeIn(100);
        mealDetails(Data);
        $('.loading').fadeOut(1000);
    }
}
async function getCategory(term) {
    let api = `https://www.themealdb.com/api/json/v1/1/${term}`;
    let myHttp = await fetch(`${api}`);
    if (myHttp.ok && 400 != myHttp.status) {
        Data = await myHttp.json();
        if (term == "categories.php") {
            displayCategories(Data);
        } else if (term == "list.php?a=list") {
            displayArea(Data);
        } else if (term == "list.php?a=list") {
            displayArea(Data);
        } else if (term == "list.php?i=list") {
            displayIngredients(Data);
        }

        $('#contact').html(null);
    }
}

// Api Part two 

async function filterByCategory(CatId)
{
    let api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${CatId}`;
    let myHttp = await fetch(`${api}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        display(Data);
    }
}
async function filterByArea(AreaId)
{
    let api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaId}`;
    let myHttp = await fetch(`${api}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        display(Data);
    }
}
async function filterByIngredients(IngredientsId)
{
    let api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientsId}`;
    let myHttp = await fetch(`${api}`);
    if (myHttp.ok && 400 != myHttp.status) {
        let Data = await myHttp.json();
        display(Data);
    }
}

// Display 

function displaySearch() {
    let term = `
        <div class="col-md-6 py-5">
            <input id="search" type="search" placeholder="Search By Name"  class="form-control w-75 mx-auto bg-transparent rounded-0 text-white shadow-none border-white px-3 ByName">
        </div>
        <div class="col-md-6 py-5">
            <input id="search" type="search" placeholder="Search By Frist Letter" maxlength="1" class="form-control w-75 mx-auto bg-transparent rounded-0 text-white shadow-none border-white px-3 ByFristLetter">
        </div>
    `
    $('#contact').html(null);
    $('#hero .box').html(null);
    $('#searchBox .row').html(term);
    $('#searchBox .row').addClass("animate__fadeIn");
    $('.ByName').on("input", e => getMeal(e.target.value));
    $('.ByFristLetter').on("input", e => getFirstLetter(e.target.value));
}

function display(Data) {
    meals = new Map(Object.entries(Data.meals));
    let term = '';
    for (let [key, value] of meals) {
        term += `
        <div class="col-lg-3 col-md-6 col-sm-12 animate__animated ">
        <div onclick="getMealDetails('${value.idMeal}')" class="item overflow-hidden position-relative">
        <div class="cardImage d-flex justify-content-center">
            <img src="${value.strMealThumb}" class="img-fluid">
            </div>
            <div class="overlay overflow-hidden">
                <h1 class="animate__animated title">${value.strMeal}</h1>
        </div>
        </div>
    </div>`
        $('#contact').html(null);
        $('#hero .box').html(term);
        $('#hero .box div').addClass("animate__fadeIn");
        $('#hero .item').mouseenter(cardHoverIn);
        $('#hero .item').mouseleave(cardHoverOut);
    }
}

function mealDetails(Data) {
    Details = new Map(Object.entries(Data));
    let term = '';
    let tagsStr = "";
    let recipes = "";
    for (let [key, value] of Details) {
        for (let i = 1; i < 20; i++) {
            if (value[0][`strIngredient${i}`] != "") {
                recipes += `
                <span class="bg-success p-2 rounded animate__animated animate__flipInX animate__delay-1s ">
                ${value[0][`strMeasure${i}`]} ${value[0][`strIngredient${i}`]}</span>
                `
            }
        }

        if (value[0].strTags != null) {
            let tags = value[0].strTags.split(",");
            for (let i = 0; i < tags.length; i++) {
                tagsStr += `<span class="bg-danger p-2 rounded animate__animated animate__flipInX animate__delay-1s"">${tags[i]}</span>`
            }
        }
        term = `
        <div class="col-md-4 text-center mealDetails">
        <div class="mealImage animate__animated animate__fadeIn">
        <img class="img-fluid" src="${value[0].strMealThumb}">
        </div>
        <h2 class="h1 mt-3 animate__animated animate__flipInX animate__delay-1s text-white">${value[0].strMeal}</h2>
        </div>
        <div class="col-md-8">
        <h2 class="animate__animated animate__fadeInDown text-white">Instructions</h2>
        <p class="animate__animated animate__fadeIn text-white">${value[0].strInstructions}</p>
        <p> <span class="fw-bold text-white">Area</span> : <span class="text-info  " role="button" onclick="filterByArea('${value[0].strArea}')">${value[0].strArea}</span></p>
        <p><span class="fw-bold text-white">Category</span> : <span class="text-info" role="button" onclick="filterByCategory('${value[0].strCategory}')">${value[0].strCategory}</span></p>
        <div class="d-flex flex-wrap gap-2 text-white" id="recipes">
        </div>
        <div class="d-flex flex-wrap gap-2 my-4 text-white" id="tags">
        </div>
        <div class=" d-flex gap-2">
        <a class="source btn text-white" target="_blank" href="${value[0].strSource}">Source</a>
        <a class="youtube " target="_blank" href="${value[0].strYoutube}"><i class="fa-brands fa-youtube"></i></a>
        </div>
    </div>
        `

        $('#hero .box').html(term);
        $('#tags').html(`<h3>Tags :</h3>${tagsStr}`);
        $('#recipes').html(`<h3>Recipes :</h3>${recipes}`);
        // topZero();
    }
}

function displayCategories(Data) {
    categories = new Map(Object.entries(Data.categories));
    let term = '';
    for (let [key, value] of categories) {
        term += `
         <div class="col-lg-3 col-md-6 col-sm-12 animate__animated">
         <div onclick="filterByCategory('${value.strCategory}')" class="item overflow-hidden position-relative">
         <div class="cardImage d-flex justify-content-center">
                 <img src="${value.strCategoryThumb}" class="img-fluid">
             </div>
             <div class="overlay overflow-hidden">
                 <h1 class="animate__animated title text-black">${value.strCategory}</h1>   
                 <p class="animate__animated desc text-center text-black">${value.strCategoryDescription.slice(0,50)}</p> 
             </div>
         </div>
     </div>
    `
        $('#hero .box').html(term);
        $('#searchBox .row').html(null);
        $('#hero .box div').addClass("animate__fadeIn");
        $('#hero .item ').mouseenter(cardHoverIn);
        $('#hero .item').mouseleave(cardHoverOut);
    }
}

function displayArea(Data) {
    Area = new Map(Object.entries(Array.from(Data.meals).splice(0, 25)));

    let term = '';
    for (let [key, value] of Area) {
        term += `
         <div class="col-lg-3 col-md-6 col-sm-12 animate__animated">
         <div onclick="filterByArea('${value.strArea}')" class="item overflow-hidden position-relative text-center py-5">
            <i class="fa-solid fa-city fa-3x text-danger"></i>
            <h2 class="animate__animated title text-white">${value.strArea}</h2>  
         </div>
     </div>
    `
        $('#hero .box').html(term);
        $('#searchBox .row').html(null);
        $('#hero .box div').addClass("animate__fadeIn");
        $('#hero .item ').mouseenter(cardHoverIn);
        $('#hero .item').mouseleave(cardHoverOut);
    }
}

function displayIngredients(Data) {
    ingredients = new Map(Object.entries(Array.from(Data.meals).splice(0, 20)));
    let term = '';
    for (let [key, value] of ingredients) {
        term += `
         <div class="col-lg-3 col-md-6 col-sm-12 animate__animated">
         <div onclick="filterByIngredients('${value.strIngredient}')" class="item overflow-hidden position-relative text-center py-4 px-2">
         <i class="fa-solid fa-bowl-food fa-3x"></i>
         <h2 class="animate__animated title h3 text-white">${value.strIngredient}</h2>    
         <p class="animate__animated desc text-white">${value.strDescription.slice(0,50)}</p>
         </div>
     </div>
    `
        $('#hero .box').html(term);
        $('#searchBox .row').html(null);
        $('#hero .box div').addClass("animate__fadeIn");
        $('#hero .item ').mouseenter(cardHoverIn);
        $('#hero .item').mouseleave(cardHoverOut);
    }
}

function displayContact()
{
    let term = `
    <h2 class="text-center">Contact US</h2>
    <form>
        <div class="row mt-3 ms-5">
            <div class="col-md-6">
                <input type="text" required id="name" maxlength="37" class="form-control mt-4" placeholder="Enter Your Name">
                <span Class="error" class="animate__animated"></span>
            </div>
            <div class="col-md-6">
                <input type="email" required id="email"  class="form-control mt-4" placeholder="Enter Your Email">
                <span Class="error" class="animate__animated"></span>
            </div>
            <div class="col-md-6">
                <input type="number"required id="phone" class="form-control mt-4" placeholder="Enter Your Phone">
                <span Class="error" class="animate__animated"></span>
            </div>
            <div class="col-md-6">
                <input type="number"required id="age"  class="form-control mt-4" placeholder="Enter Your Age">
                <span Class="error" class="animate__animated"></span>
            </div>
            <div class="col-md-6 position-relative">
                <input type="password" required id="password" class="form-control mt-4" placeholder="Enter Your Password">
                <span Class="error" class="animate__animated"></span>
                <span class="showPass"><i data-show="show" class="fa-solid fa-eye-slash"></i></span>
            </div>
            <div class="col-md-6">
                <input type="password"required id="repassword" class="form-control mt-4" placeholder="ReEnter Password">
                <span Class="error" class="animate__animated"></span>
            </div>
            <div class="col-md-12  mt-5">
                <button type="submit" class="form-btn rounded-3 mb-5 animate__animated">Submit</button>
            </div>
        </form>
    </div>
    `
    $('#hero .box').html(null);
    $('#searchBox .row').html(null);
    $('#contact').html(term);
    validations();
}

// end 

// validations 

function validations() {
    $('#contact input').on("input", function () {
        $('#contact input').on("input", function () {
            if (checkClassError()) // == true
            {
                $(`form button`).mouseenter(formButtonValidation);
                $('form button').addClass('animate__shakeX bg-danger buttonFormActive');
                $('form button').css({
                    'cursor': 'default',
                    'userSelect': 'none'
                });
            } else {
                $('form button').removeClass('animate__shakeX bg-danger buttonFormActive');
                $(`form button`).css({
                    "marginLeft": "0px"
                });
                $('form button').off('mouseenter', formButtonValidation);
                $('form button').css('cursor', 'pointer');
            }
        })

        function checkClassError() {
            if ($('#contact .error').hasClass('animate__flipInX')) {
                return true;
            } else {
                return false;
            }
        }
    })
    $('#contact #name').on("input", function () {
        const regex = /^[a-zA-z\s]{1,36}$/;
        const $error = $('#name').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        } else if (regex.test($(this).val())) {
            hideError($error, $this);
        } else {
            $error.html("Invalid Name , only Characters allowed");
            ShowError($error, $this);
        }
    })
    $('#contact #email').on("input", function () {
        const regex = /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/;
        const $error = $('#email').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        } else if (regex.test($(this).val())) {
            hideError($error, $this);
        } else {
            $error.html("Invalid Email , try example@domain.com");
            ShowError($error, $this);
        }
    })
    $('#contact #phone').on("input", function () {
        const regex = /^(02)?(01)[0125][0-9]{8}$/;
        const $error = $('#phone').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        } else if (regex.test($(this).val())) {
            hideError($error, $this);
        } else {
            $error.html("Invalid Phone Number");
            ShowError($error, $this);
        }
    })
    $('#contact #age').on("input", function () {
        const regex = /^(1[6-9]|[2-9][0-9]|100)$/;
        const $error = $('#age').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        } else if (regex.test($(this).val())) {
            hideError($error, $this);
        } else {
            $error.html("Your age must be over 16+");
            ShowError($error, $this);
        }
    })
    $('#contact #password').on("input", function () {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const $error = $('#password').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        } else if (regex.test($(this).val())) {
            hideError($error, $this);
        } else {
            $error.html("password must contain numbers & letters at least 8 character");
            ShowError($error, $this);
        }
    })
    $('#contact #repassword').on("input", function () {
        const $error = $('#repassword').next();
        const $this = $(this);
        if ($(this).val() == "") {
            hideError($error, $this);
        } else if ($(this).val() == $('#password').val()) {
            hideError($error, $this);
        } else {
            $error.html("Password not match");
            ShowError($error, $this);
        }
    })
    $('.showPass').click(function () {
        if ($('#password').attr('type') == "text") {
            $('#password').attr('type', 'password');
            $('.showPass').html('<i data-show="show" class="fa-solid fa-eye-slash"></i>');
        } else {
            $('#password').attr('type', 'text');
            $('.showPass').html('<i data-show="show" class="fa-solid fa-eye"></i>');
        }
    })
    $('#password').focus(function () {
        $('.showPass').css("opacity", 1);
        $('.showPass').css("bottom", 10);
    })
    $(document).click(function (e) {
        if ($(e.target)[0] == $('#password')[0] || $(e.target).attr('data-show') == $('.showPass i').attr('data-show')) {
            $('.showPass').css("opacity", 1);
            $('.showPass').css("bottom", 10);
        } else {
            $('.showPass').css("opacity", 0);
            $('.showPass').css("bottom", -20);
        }
    })

    function hideError($error, $this) {
        $this.css("border-bottom-color", "#CED4DA");
        $error.html(null);
        $error.removeClass('animate__animated animate__flipInX');
        $error.addClass('animate__animated animate__fadeOutUp');
    }

    function ShowError($error, $this) {
        $this.css("border-bottom-color", "rgb(214, 46, 51)");
        $error.removeClass('animate__animated animate__fadeOutUp');
        $error.addClass('animate__animated animate__flipInX');
    }

    function formButtonValidation() {
        let buttonLocation = $(`form button`).css("marginLeft")
        if (buttonLocation == "250px") {
            $(`form button`).css({
                "marginLeft": "0px"
            });
        } else {
            $(`form button`).css({
                "marginLeft": "250px"
            });
        }
        $(`form button`).keydown(function (e) {
            if (e.key == "Enter") {
                event.preventDefault();
            }
        })
    }
}


// end validations 

function getMovieAttr()
{
    if($(this).attr("attr") == "categories.php")
    {
        $('.loading').fadeIn(200);
        getCategory("categories.php");
        closeNav();
        $('.loading').fadeOut(1000);
        
    }
    else if($(this).attr("attr") == "list.php?a=list")
    {   $('.loading').fadeIn(200);
        getCategory('list.php?a=list');
        closeNav();
        $('.loading').fadeOut(1000);
    }
    else if($(this).attr("attr") == "list.php?i=list")
    {   $('.loading').fadeIn(200);
        getCategory('list.php?i=list');
        closeNav();
        $('.loading').fadeOut(1000);
    }
    else if($(this).attr("attr") == "search")
    {   $('.loading').fadeIn(200);
        displaySearch();
        closeNav();
        $('.loading').fadeOut(1000);
    }
    else if($(this).attr("attr") == "contact")
    {   $('.loading').fadeIn(200);
        displayContact();
        closeNav();
        $('.loading').fadeOut(1000);
    }
}

// end 

// general - scroll - home 

function scroll()
{
    $(window).scroll(backToTop);
    function backToTop()
    {
        if (window.pageYOffset > 100) {
            $('#back-to-top').addClass("active");
            } else {
            $('#back-to-top').removeClass("active");   
        }
    }
}

function home() {
    $('.loading').fadeIn(200);
    getMeal('');
    closeNav();
    $('#searchBox .row').html(null);
    $('.loading').fadeOut(1000);
}

function cardHoverIn() {
    $(this).find($('.overlay')).css({
        "opacity": "1",
        "visibility": "visible"
    });
    $(this).find($('.overlay .title')).removeClass('animate__slideOutLeft');
    $(this).find($('.overlay .title')).addClass('animate__fadeInDown');
    $(this).find($('.overlay .desc')).removeClass('animate__slideOutLeft');
    $(this).find($('.overlay .desc')).addClass('animate__flipInX');
    $(this).find($('.overlay .date')).removeClass('animate__slideOutLeft');
    $(this).find($('.overlay .date')).addClass('animate__fadeInUp');
    $(this).find($('.overlay .rate')).removeClass('animate__slideOutLeft');
    $(this).find($('.overlay .rate')).addClass('animate__fadeInUp');
    $(this).find($('.cardImage img')).addClass("animate");
}

function cardHoverOut() {
    $(this).find($('.overlay')).css({
        "opacity": "0",
        "visibility": "hidden"
    });
    $(this).find($('.overlay .title')).removeClass('animate__fadeInDown');
    $(this).find($('.overlay .title')).addClass('animate__slideOutLeft');
    $(this).find($('.overlay .desc')).removeClass('animate__flipInX');
    $(this).find($('.overlay .desc')).addClass('animate__slideOutLeft');
    $(this).find($('.overlay .date')).removeClass('animate__fadeInUp');
    $(this).find($('.overlay .date')).addClass('animate__slideOutLeft');
    $(this).find($('.overlay .rate')).removeClass('animate__fadeInUp');
    $(this).find($('.overlay .rate')).addClass('animate__slideOutLeft');
    $('.cardImage img').removeClass("animate");
}

function topZero()
{
    $('html, body').animate({scrollTop:0}, 1000);
}

// end all js 

