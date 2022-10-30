

// $(document).ready(
//   function () {
//   $(".align-justify").click(function () {

//     $(".nav-menu ").addClass("active").removeClass("notactive"),newWidth=$(".nav-menu").width(),$(".side-nav").css("left", newWidth),$(".fa-align-justify").toggleClass("fa-times"),
//     $(".nav-menu-links .item1").animate({opacity: "1",paddingTop: "25px"},1100),$(".nav-menu-links .item2").animate({opacity: "1",paddingTop: "25px"},1200),
//     $(".nav-menu-links .item3").animate({opacity: "1",paddingTop: "25px"},1300),$(".nav-menu-links .item4").animate({opacity: "1",paddingTop: "25px"},1400),
//     $(".nav-menu-links .item5").animate({opacity: "1",paddingTop: "25px"},1500,function () {
//       $(".align-justify").click(function (){

//         $(".nav-menu ").addClass("notactive").removeClass("active"),$(".side-nav").css("left", 0),$(".fa-times").toggleClass(" fa-align-justify"),
//         $(".nav-menu-links li").animate({opacity: "0",paddingTop: "500px"},500);
//       });
      
//     });
    
    
//   });

  

// });



$(".align-justify").click(
  function openNav() {
    if ($(".nav-menu").width()=="250") {
      $(".nav-menu").width("0"),$(".nav-menu-social-icons").css("left","-200px"),$(".side-nav").css("left", 0),$(".fa-times ").toggleClass("fa-align-justify"),
      $(".nav-menu-links li").animate({opacity: "0",paddingTop: "500px"},500)
    } 
    else{
      $(".nav-menu").width("250"),$(".nav-menu-social-icons").css("left","20px"),$(".side-nav").css("left", "240px"),$(".fa-align-justify").toggleClass("fa-times"),
      $(".nav-menu-links .item1").animate({opacity: "1",paddingTop: "25px"},1100),$(".nav-menu-links .item2").animate({opacity: "1",paddingTop: "25px"},1200),
      $(".nav-menu-links .item3").animate({opacity: "1",paddingTop: "25px"},1300),$(".nav-menu-links .item4").animate({opacity: "1",paddingTop: "25px"},1400),
      $(".nav-menu-links .item5").animate({opacity: "1",paddingTop: "25px"},1500)
    }
});


search("").then(() => {
  $(".loading ").fadeOut(500, () => {
      $("body").css("overflow", "visible")
  })
})

let array=[],row=$("#recipesData")

async function search(q){
  $(".loading-container").fadeIn(100)
    let recipes=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
    let recipeResponse=await recipes.json();
    displayMeals(recipeResponse.meals)
    $(".loading-container").fadeOut(400)
    return recipeResponse

}


async function getCategories(listBy) {
  x = await fetch(`https://www.themealdb.com/api/json/v1/1/${listBy}`);
  x = await x.json()
  return x;

}
async function getByLetter(letter) {
  if (letter) {
      let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      responseMeals = await meals.json()
      if (responseMeals.meals) {
          displayMeals(responseMeals.meals)
      }
  }
}

async function filterByCategory(category){
  let recipes=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  let recipeResponse=await recipes.json();
  console.log(recipeResponse.meals);
  displayMeals(recipeResponse.meals)
}

async function filterByArea(Area){
  let recipes=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
  let recipeResponse=await recipes.json();
  console.log(recipeResponse.meals.slice(0, 20));
  displayMeals(recipeResponse.meals.slice(0, 20))
}
// filterByArea("Canadian")

async function getByMainIngredient(ingradiant){
  let recipes=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingradiant}`);
  let recipeResponse=await recipes.json();
  console.log(recipeResponse.meals);
  displayMeals(recipeResponse.meals)
}


async function getMeal(MealId){
  let recipes=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`);
  let recipeResponse=await recipes.json();
  console.log(recipeResponse.meals[0]);
  displayMeal(recipeResponse.meals[0])
}
function displayMeal(meal) {
  let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",");
    let tagsStr="";
    for (let i = 0; i < tags?.length; i++) {
      tagsStr += `<li class="m-2 p-1 alert-danger rounded">${tags[i]}</li>`
      
    }
    let str = `
    <div class="col-md-4 text-white">
					<img class="w-100" src="${meal.strMealThumb}" alt=""
						srcset=""><br>
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
					<p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex " id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex " id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
		</div>`
  document.getElementById("recipesData").innerHTML=str;
  document.getElementById("recipes").innerHTML = recipes;
  document.getElementById("tags").innerHTML = tagsStr;
  
}

function displayMeals(array) {
    let meals =''
    for (let i = 0; i < array.length; i++) {
        meals+=
        `
        <div class="col-md-6 col-lg-3 my-3 ">
          <div onclick="getMeal(${array[i].idMeal})" class="movie rounded position-relative">
            <div class="post">
              <img src="${array[i].strMealThumb}" class="w-100 rounded" alt="">
            </div>
            <div class="layer d-flex align-items-center">
              <div class="info p-2">
                <h2>${array[i].strMeal}</h2>
              </div>
            </div>

          </div>
        </div>
        
        
        `
    }
    document.getElementById("recipesData").innerHTML=meals;
}

function displayCategories() {
  let cat="";
  for (let i = 0; i < array.length; i++) {
    cat+=`
    <div class="col-md-6 col-lg-3 ">
          <div onclick="filterByCategory('${array[i].strCategory}')" class="movie rounded position-relative">
            <div class="post">
              <img src="${array[i].strCategoryThumb}" class="w-100 rounded" alt="">
            </div>
            <div class="layer d-flex align-items-center">
              <div class="info p-2">
                <h2>${array[i].strCategory}</h2>
                <p>${array[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
              </div>
            </div>

          </div>
        </div>
    
    `
    
  }
  document.getElementById("recipesData").innerHTML=cat;
}

function displayByArea() {
  let cat="";
  for (let i = 0; i < array.length; i++) {
    cat+=`
    <div class="col-md-6 col-lg-3 my-3  ">
        <div class="movie rounded position-relative">
            <div onclick=(filterByArea('${array[i].strArea}')) class="post ">
                <i class="fa-solid fa-city fa-3x text-info"></i>
                <h2 class="text-white">${array[i].strArea}</h2>
            </div>
        </div>
    </div>
    
    `
    
  }
  document.getElementById("recipesData").innerHTML=cat;
  
}

function displayIngredients(){
  let cat="";
  for (let i = 0; i < array.length; i++) {
    cat+=`
    
    <div class="col-md-6 col-lg-3 my-3">
        <div onclick="getByMainIngredient('${array[i].strIngredient}')" class="movie rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food  fa-3x text-danger"></i>
                <h2 class="text-white">${array[i].strIngredient}</h2>
                <p class="text-white">${array[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>
    
    `
  }
  document.getElementById("recipesData").innerHTML=cat;

}


$(".nav-menu-links").click(async (e) =>{ 
  let listBy=e.target.getAttribute("data-list");
  document.getElementById("recipesData").innerHTML="";
  if (listBy=="search") {
  document.getElementById("recipesData").innerHTML="";
  document.getElementById("search-container").innerHTML=`
  <div class="row">
    <div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name"></div>
    <div class="col-md-6"><input class="form-control " type="text" id="letter"placeholder="search By First Letter..."></div>
  </div>`;

  $("#searchInput").keyup((e) => {
    search(e.target.value)
  })
  $("#letter").keyup((e) => {
      getByLetter(e.target.value)
  })
    
  }

  if (listBy=="contact") {

    document.getElementById("search-container").innerHTML=""
    document.getElementById("recipesData").innerHTML=`
    <section id="contact" class="container my-4 my-margin w-75 m-auto">
          <div>
            <h2 class="text-light mb-5">ContacUs</h2>
            <div class="row">

              <div class="col-md-6">
                <div class="form-groub mb-5">
                  <input class="form-control" onkeyup="Validation()" placeholder="Enter Your Name" id="name">
                  <div class="alert mt-1 bg-danger d-none" id="namealert" role="alert">
                    Special Characters and Numbers not allowed
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-groub mb-5">
                  <input class="form-control" onkeyup="Validation()" placeholder="Enter Your Email" id="Email">
                  <div class="alert mt-1 bg-danger d-none" id="emailalert" role="alert">
                  Enter valid email. *Ex: xxx@yyy.zzz
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-groub mb-5">
                  <input class="form-control" onkeyup="Validation()" placeholder="Enter Your Phone" id="phone">
                  <div class="alert mt-1 bg-danger d-none" id="phonealert" role="alert">
                  Enter valid Phone Number
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-groub mb-5">
                  <input class="form-control" onkeyup="Validation()" placeholder="Enter Your Age" id="age">
                  <div class="alert mt-1 bg-danger d-none" id="agealert" role="alert">
                  Enter valid Age
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-groub mb-5">
                  <input class="form-control" onkeyup="Validation()" type="password" placeholder="Enter Your Password" id="password">
                  <div class="alert mt-1 bg-danger d-none" id="passwordalert" role="alert">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-groub mb-5">
                  <input class="form-control" onkeyup="Validation()" type="password" placeholder="Enter Your repassword" id="repassword">
                  <div class="alert mt-1 bg-danger d-none" id="repasswordalert" role="alert">
                  Enter valid Repassword
                  </div>
                </div>
              </div>

            </div>
            <button type="submit" disabled id="submitBtn" class="btn btn-outline-danger">Submit</button>
          </div>

        </section>`
  }
  // let another-event = new CustomEvent('click'); //its a constructor used for representing events initialized by an application for any purpose.
  // document.querySelector('.').dispatchEvent(click_event);//sends an Event to the object,(synchronously) invoking the affected EventListener s in the appropriate order

    let x;

    if (listBy == "categories") {
      x = await getCategories(listBy + ".php")
      array = x.categories.splice(0, 20);
      displayCategories()
    } 
    else if (listBy == "a") {
      x = await getCategories("list.php?a=list")
      array = x.meals.splice(0, 20);
      displayByArea()
    } 
    else if (listBy == "i") {
      x = await getCategories("list.php?i=list")
      array = x.meals.splice(0, 20);
      displayIngredients()
    }
  
});

