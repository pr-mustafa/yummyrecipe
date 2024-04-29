let regexName = /^[a-zA-Z]{1,}$/;
let regexEmail = /^[a-zA-Z0-9]{1,}[_.-]?[a-zA-Z0-9]{1,}@[a-zA-Z]{1,}\.[a-zA-Z]{2,}$/;
let regexPhone = /^[+]?[0-9]{10,}$/;
let regexPassword = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

//regex
$(window).on("load", () => {
    setTimeout(() => {
        $(".main-loading-screen").css("display", "none");
    }, 1500)
})

fetchMeals("https://www.themealdb.com/api/json/v1/1/search.php?s=");
setTimeout(() => {
    $("body").css({ "overflow": "visible" })
}, 1500)


let searchPage =
    ``

let SignUpPage = ``

function inputsValidation() {
    let flag = 1;
    $("#formValidate div input").on("keyup", (e) => {

        if ($(e.target).attr("id") === "nameInput") {
            if (regexName.test($("#nameInput").val()) == true) {
                $("#nameAlert").addClass("d-none");
            }
            else {
                flag = 0;
                $("#nameAlert").removeClass("d-none");
            }
        }
        else if ($(e.target).attr("id") === "emailInput") {
            if (regexEmail.test($("#emailInput").val()) == true) {
                $("#emailAlert").addClass("d-none");
            }
            else {
                flag = 0;
                $("#emailAlert").removeClass("d-none");
            }
        }
        else if ($(e.target).attr("id") === "phoneInput") {
            if (regexPhone.test($("#phoneInput").val()) == true) {
                $("#phoneAlert").addClass("d-none");
            }
            else {
                flag = 0;
                $("#phoneAlert").removeClass("d-none");
            }
        }
        else if ($(e.target).attr("id") === "ageInput") {
            if ($("#ageInput").val() == "") {
                flag = 0;
                $("#ageAlert").removeClass("d-none");

            }
            else {
                $("#ageAlert").addClass("d-none");
            }
        }
        else if ($(e.target).attr("id") === "passwordInput") {
            if (regexPassword.test($("#passwordInput").val()) == true) {
                $("#passwordAlert").addClass("d-none");
            }
            else {
                flag = 0;
                $("#passwordAlert").removeClass("d-none");
            }
        }
        else if ($(e.target).attr("id") === "repasswordInput") {
            if ($("#passwordInput").val() === $("#repasswordInput").val()) {
                $("#repasswordAlert").addClass("d-none");
            }
            else {
                flag = 0;
                $("#repasswordAlert").removeClass("d-none");
            }

        }
        checkFlag(flag);
    })

}

function checkFlag(flag) {
    if (flag == 1 && $("#nameInput").val().length > 0 && $("#emailInput").val().length > 0 && $("#phoneInput").val().length > 0 && $("#ageInput").val().length > 0 && $("#passwordInput").val().length > 0 && $("#repasswordInput").val().length > 0) {
        $("#submitBtn").prop("disabled", false)
    }
    else {
        $("#submitBtn").prop("disabled", true)
    }
}


var typingTimer;                //timer identifier
var doneTypingInterval = 1500;

$("#SearchNameInput").on("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
})

$("#SearchNameInput").on('keydown', function () {
    clearTimeout(typingTimer);
});

function doneTyping() {
    if ($("#SearchNameInput").val().length > 0) {
        SearchMeal(`https://www.themealdb.com/api/json/v1/1/search.php?s=${$("#SearchNameInput").val()}`);
    }
    else {
        SearchMeal("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    }
}

function searchByLetter() {

    if ($("#SearchLetterInput").val().length === 0) {
        SearchMeal("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
    }
    else {
        SearchMeal(`https://www.themealdb.com/api/json/v1/1/search.php?f=${$("#SearchLetterInput").val()}`)
    }

}

async function SearchMeal(value) {

    let x = 20;
    $('#foodRow').empty();
    $('.loading-screen').css({ "display": "flex" });
    var response = await fetch(value)
    var finalResponse = await response.json();
    var contentText = "";
    if (finalResponse.meals) {
        if (finalResponse.meals.length < 20) {
            x = finalResponse.meals.length;
        }

        for (let i = 0; i < x; i++) {
            contentText += `
                    <div class="col-md-3">
                        <div onclick="getFoodDetails(${finalResponse.meals[i].idMeal})" id="foodDetails" class="image-card position-relative overflow-hidden rounded-3">
                            <img src="${finalResponse.meals[i].strMealThumb}" alt="" class="food-img img-fluid" />
                                <div
                                    class="image-overlay position-absolute w-100 h-100 d-flex align-items-center">
                                    <h3 class="ps-1">${finalResponse.meals[i].strMeal}</h3>
                                    </div>
                        </div>
                    </div>
                    `

        }
    }
    $('.loading-screen').css({ "display": "none" });
    $('#foodRow').addClass("row py-5 g-4");
    $("#foodRow").append(contentText);

}



async function fetchMeals(value) {

    let x = 20;
    $('#foodRow').empty();
    $('.loading-screen').css({ "display": "flex" });
    var response = await fetch(value)
    var finalResponse = await response.json();
    var contentText = "";
    if (finalResponse.meals) {
        if (finalResponse.meals.length < 20) {
            x = finalResponse.meals.length;
        }

        for (let i = 0; i < x; i++) {
            contentText += `
                <div class="col-md-3">
                    <div onclick="getFoodDetails(${finalResponse.meals[i].idMeal})" id="foodDetails" class="image-card position-relative overflow-hidden rounded-3">
                        <img src="${finalResponse.meals[i].strMealThumb}" alt="" class="food-img img-fluid" />
                            <div
                                class="image-overlay position-absolute w-100 h-100 d-flex align-items-center">
                                <h3 class="ps-1">${finalResponse.meals[i].strMeal}</h3>
                                </div>
                    </div>
                </div>
                `

        }
    }
    $('.loading-screen').css({ "display": "none" });
    $('#foodRow').addClass("row py-5 g-4");
    $("#foodRow").append(contentText);

}

async function fetchCategories() {
    $('#foodRow').empty();
    $('.loading-screen').css({ "display": "flex" });
    var response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    var finalResponse = await response.json();
    var contentText = "";
    if (finalResponse.categories) {
        for (let i = 0; i < finalResponse.categories.length; i++) {
            contentText += `
            <div class="col-md-3">
                <div onclick="fetchMeals('https://www.themealdb.com/api/json/v1/1/filter.php?c=${finalResponse.categories[i].strCategory}')"  class="image-card position-relative overflow-hidden rounded-3">
                    <img src="${finalResponse.categories[i].strCategoryThumb}" alt="" class="food-img img-fluid" />
                        <div
                            class="image-overlay position-absolute w-100 h-100 d-flex align-items-center flex-column p-2 text-center">
                            <h4 class="ps-1">${finalResponse.categories[i].strCategory}</h4>
                            <p class="overflow-hidden">${finalResponse.categories[i].strCategoryDescription}</p>
                            </div>
                </div>
            </div>
            `
        }

    }
    $('.loading-screen').css({ "display": "none" });
    $('#foodRow').addClass("row py-5 g-4");
    $("#foodRow").append(contentText);

}

async function fetchCountry() {
    $('#foodRow').empty();
    $('.loading-screen').css({ "display": "flex" });
    var response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    var finalResponse = await response.json();
    var contentText = "";
    if (finalResponse.meals) {
        for (let i = 0; i < finalResponse.meals.length; i++) {
            contentText += `
            <div class="col-md-3 text-white">
                <div onclick="fetchMeals('https://www.themealdb.com/api/json/v1/1/filter.php?a=${finalResponse.meals[i].strArea}')"  class="pointer rounded-3 d-flex align-items-center flex-column p-2 text-center">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3 class="ps-1">${finalResponse.meals[i].strArea}</h3>
                </div>
            </div>
            `
        }

    }
    $('.loading-screen').css({ "display": "none" });
    $('#foodRow').addClass("row py-5 g-4");
    $("#foodRow").append(contentText);

}

async function fetchIngredients() {
    $('#foodRow').empty();
    $('.loading-screen').css({ "display": "flex" });
    var response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    var finalResponse = await response.json();
    var contentText = "";
    if (finalResponse.meals) {
        for (let i = 0; i < 20; i++) {
            contentText += `
            <div class="col-md-3 text-white text-center">
                <div onclick="fetchMeals('https://www.themealdb.com/api/json/v1/1/filter.php?i=${finalResponse.meals[i].strIngredient}')"  class="pointer rounded-3">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3 class="ps-1 pt-1">${finalResponse.meals[i].strIngredient}</h3>
                            <p class="">${(finalResponse.meals[i].strDescription).substring(0, 109)}</p>
                </div>
            </div>
            `
        }

    }
    $('.loading-screen').css({ "display": "none" });
    $('#foodRow').addClass("row py-5 g-4");
    $("#foodRow").append(contentText);

}


$('.slider-container').css({ "left": -$('.slider').outerWidth() }, 500)
$('#togglerOpen').click(() => {
    if ($('#togglerOpen').hasClass("fa-bars")) {
        showMenu();
        slideUpItems();
    }
    else {
        hideMenu();
        slideDownItems();
    }
})

async function getFoodDetails(id) {
    $("#SearchPage").css({ "display": "none" });
    $('#foodRow').empty();
    $('.loading-screen').css({ "display": "flex" });
    var response = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    var finalResponse = await response.json();

    let contentText;
    contentText =
        `
   <div class="col-md-4">
   <img src="${finalResponse.meals[0].strMealThumb}" alt="" class="w-100 rounded-3 img-fluid">
   <h2 class="text-white">${finalResponse.meals[0].strMeal}</h2>
   </div>
   <div class="col-md-8">
   <h2 class="text-white">Instructions</h2>
   <p class="text-white">${finalResponse.meals[0].strInstructions}</p>
   <h3 class="text-white"><span class="fw-bolder">Area : </span>${finalResponse.meals[0].strArea}</h3>
   <h3 class="text-white"><span class="fw-bolder">Category : </span>${finalResponse.meals[0].strCategory}</h3>
   <h3 class="text-white">Recipes : </h3>
   <ul class="list-unstyled d-flex g-3 flex-wrap">    
    `

    for (let i = 1; i <= 20; i++) {
        if (finalResponse.meals[0]['strMeasure' + i] != " " && finalResponse.meals[0]['strMeasure' + i] != "" && finalResponse.meals[0]['strMeasure' + i] != null) {
            contentText += `<li class="alert alert-info m-2 p-1">${finalResponse.meals[0]['strMeasure' + i]} ${finalResponse.meals[0]['strIngredient' + i]}</li>`
        }
    }
    contentText +=
        `
    </ul>
    <h3 class="text-white">Tags : </h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    `
    if (finalResponse.meals[0].strTags != null) {
        let myArray = (finalResponse.meals[0].strTags).split(",");
        if (myArray) {
            for (let j = 0; j < myArray.length; j++) {
                if (myArray[j] != "" && myArray[j] != null) {
                    contentText += `<li class="alert alert-danger m-2 p-1">${myArray[j]}</li>`

                }
            }
        }
    }

    contentText += `
    </ul>
    <a href="${finalResponse.meals[0].strSource}" target="_blank" class="btn btn-success">Source</a>
    <a href="${finalResponse.meals[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    </div>
    `
    $('.loading-screen').css({ "display": "none" });
    $('#foodRow').addClass("row py-5 g-4");
    $("#foodRow").append(contentText);


}



function hideMenu() {
    slideDownItems()
    $('.slider-container').animate({ "left": -$('.slider').outerWidth() }, 500);
    $('#togglerOpen').removeClass("fa-close");
    $('#togglerOpen').addClass("fa-bars");

}
function showMenu() {
    slideUpItems();
    $('.slider-container').animate({ "left": "0px" }, 500);
    $('#togglerOpen').removeClass("fa-bars");
    $('#togglerOpen').addClass("fa-close");
}

function slideUpItems() {
    for (let i = 0; i < $('.slider-menu ul li').length; i++) {
        setTimeout(() => {
            $('.slider-menu ul li').eq(i).animate({
                "top": "0"
            })
        }, i * 75)
    }
}

function slideDownItems() {
    for (let i = 0; i < $('.slider-menu ul li').length; i++) {
        setTimeout(() => {
            $('.slider-menu ul li').eq(i).animate({
                "top": "300px"
            })
        }, i * 30)

    }
}

$(".slider-menu ul li a").click((e) => {
    $("#SearchPage").css({ "display": "none" });
    $("#SignUp").css({ "display": "none" });
    $('#foodRow').empty();
    if ($(e.target).attr("my-href") == "SearchPage") {
        $("#SearchPage").css({ "display": "block" });
        $("#SearchNameInput").val('');
        $("#SearchLetterInput").val('');
    }
    else if ($(e.target).attr("my-href") == "Categories") {
        fetchCategories();
    }
    else if ($(e.target).attr("my-href") == "Area") {
        fetchCountry();
    }
    else if ($(e.target).attr("my-href") == "Ingredients") {
        fetchIngredients();
    }
    else if ($(e.target).attr("my-href") == "Contact") {
        $("#SignUp").css({ "display": "flex" });
    }

    hideMenu();

})

