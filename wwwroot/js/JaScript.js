window.console = window.console || function (t) { };

if (document.location.search.match(/type=embed/gi)) {
    window.parent.postMessage("resize", "*");
}

const btns = document.querySelectorAll('.btn');
const modalOverlay = document.querySelector('.popup-log');

alert("modalOverlay=" + modalOverlay);
const popupClose = document.querySelector('.popup_close');
const popupClose1 = document.querySelector('.popup_close1');
const modals = document.querySelectorAll('.login-box');

btns.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('login-box--active');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('login-box--active');
		modalOverlay.classList.add('popup-log--active');
	});
});
if (modalOverlay != null) {
	modalOverlay.addEventListener('click', (e) => {
		console.log(e.target);

		if (e.target == modalOverlay || e.target == popupClose || e.target == popupClose1) {
			modalOverlay.classList.remove('popup-log--active');
			modals.forEach((el) => {
				el.classList.remove('login-box--active');
			});
		}
	});
}

const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

get_meal_btn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php').
		then(res => res.json()).
		then(res => {
			createMeal(res.meals[0]);
		});
});



const createMeal = meal => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	//Достаньте все ингредиенты с объекта. До 20
	for (let i = 1; i <= 20; i++){
		//debugger;
		/*alert(window);*/
		/*alert(window.CP);
		if (window.CP.shouldStopExecution(0)) break;*/
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
		} else {
			// Stop if no more ingredients
			//Остановитесь, если ингредиентов больше нет
			break;
		}
	} //window.CP.exitedLoop(0);

	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${meal.strYoutube ? `
		<div class="row">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;

	meal_container.innerHTML = newInnerHTML;
};







// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible');
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible');
});
//# sourceURL=pen.js


window.onload = function() {
    document.getElementById('login__form').onclick = function() {
        document.getElementById('log__form').submit();
        return false;
    };
};