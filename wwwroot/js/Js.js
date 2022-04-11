$(document).ready(function () {
    <!-- Табы на JS -->
    $(".dws-button").on("click", ".tab", function() {
    // Удаляем классы active
    $(".dws-form").find(".active").removeClass("active");
	$(".dws-button").find(".active").removeClass("active");
 
    // Добавляем классы active
    $(this).addClass("active");
 $(".tab-form").eq($(this).index()).addClass("active");
 $(".container1").eq($(this).index()).addClass("active");
    });



    $("#open_pop_up").click(function (e1) {
        alert("logout");
        //eraseCookie("user_name_login");
        $.post("./service/user_logout", {}, function (msg1) {
            alert("msg1=" + msg1);


        });
        alert("basepath1="+$("#basepath1").attr("href"));
        window.location.href = $("#basepath1").attr("href");
        //alert($("#login_form").find("#userName").val());
    });



    alert(getCookie("user_name_login2"));

    $("#Reg_btn1").click(function (e1) {
        $.post("./service/user_register", { username: $("#Register__form").find("#userName").val(), emailBox: $("#Register__form").find("#emailBox").val(), password: $("#Register__form").find("#password").val() }, function (msg1) {
            alert("msg2=" + msg1);
            //window.location.href="./Home/index_users";
            window.location.href = $("#basepath1").attr("href");
            //return false;
        });
    });

    $("#login_btn1").click(function (e1) {



        alert("login");
        $.post("./service/user_login", { username: $("#login_form").find("#userName").val(), password: $("#login_form").find("#password").val() }, function (msg1) {
            alert("msg1=" + msg1);
            window.location.href="./Home/index";

            //return false;
        });

        //alert($("#login_form").find("#userName").val());
    });


});


function eraseCookie(name) {
    //document.cookie = name + '=; Max-Age=0';

    document.cookie = name + "=; Max-Age=0; path=/; domain=" + location.hostname;
}



const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsElement = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealElement = document.getElementById('single-meal');

//Seach meal and fetch from API
function searchMeal(e) {
  e.preventDefault(); //prevent submitting to an actual file

  //clear single meal
  single_mealElement.innerHTML = '';

  //get search term
  const term = search.value;
  //console.log(term);

  //check for empty
  if (term.trim()) {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='.concat(term))
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = "<h2>Search results for '".concat(term).concat("':</h2>");

        if (data.meals == null) {
          resultHeading.innerHTML = '<p>There is no search result. Please try again.</p>'
        }
        else {
          mealsElement.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join('');
        }


      });
    //clear search text
    search.value = "";

  } else {
    alert('Please enter a search term');
  }



}

function addMealToDom(mealData) {
  const ingredientsArray = [];

  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`]) {
      const stringToPush = `${mealData[`strIngredient${i}`]} - ${mealData[`strMeasure${i}`]}`;
      ingredientsArray.push(stringToPush);
      //console.log(stringToPush);
    }
    else {
      break;
    }
  }

  YoutubeStringLocation = mealData.strYoutube.indexOf("watch?v=");
  YoutubeVideoID = mealData.strYoutube.substring(YoutubeStringLocation + 8);


  single_mealElement.innerHTML = `
  <div class="single-meal">
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"></img>
    <div class="single-meal-info">
      ${mealData.strCategory ? `<p>${mealData.strCategory}</p>` : ""}
      ${mealData.strArea ? `<p>${mealData.strArea}</p>` : ""}
    </div>
    <div class="main">
        <p>${mealData.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredientsArray.map(ingredient => `<li>${ingredient}<\li>`).join('')}
        </ul>
    </div>
    <div class="YoutubeVideo">
    <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/${YoutubeVideoID}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; 
    autoplay; 
    clipboard-write; 
    encrypted-media; 
    gyroscope; 
    picture-in-picture" allowfullscreen>
    </iframe>
    </div>
    
  </div>`
}

function getRandomMeal() {
  // clear meals and heading
  mealsElement.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data => {
      const mealData = data.meals[0];
      addMealToDom(mealData);

    });
}

//Fetch meal by ID
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      const mealData = data.meals[0];
      console.log(mealData);

      addMealToDom(mealData);
    });
};

//Event listensiers
submit.addEventListener('submit', searchMeal);

if (random != null) {
    random.addEventListener('click', getRandomMeal);
}

mealsElement.addEventListener('click', e => {
  //console.log(e.path);
  const mealInfo = e.path.find(item => {
    //console.log(item);
    if (item.classList) {
      return item.classList.contains('meal-info');
    }
    else {
      return false
    }
  });
  //console.log(mealInfo);
  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    //console.log(mealID);
    getMealByID(mealID);
  }
}

)