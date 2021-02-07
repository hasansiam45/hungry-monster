let mealList = document.getElementById('mealList');
let topInfo = document.getElementById('details');

document.getElementById('btn').addEventListener('click', displayMatchingFoods);
document.getElementById('input').addEventListener('change', displayMatchingFoods);




function displayMatchingFoods() {
    userInput = document.getElementById('input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`)

        .then(res => res.json())

        .then(data => {
            if (data.meals) {
                document.getElementById('showError').style.display = 'none';
                document.getElementById('details').style.display = 'block';

                const meals = data.meals;
                meals.forEach(meal => {

                    const mealDiv = document.createElement('div');
                    const mealName = meal.strMeal;
                    const mealImg = meal.strMealThumb;
                    const mealInfo = `
            <img onclick = "displayDetails('${mealName}')" src = "${mealImg}">
            <h2 onclick = "displayDetails('${mealName}')">${mealName}</h2>
            `
                    mealDiv.innerHTML = mealInfo;
                    mealList.appendChild(mealDiv);
                });
            } else {
                document.getElementById('showError').style.display = 'block';
                document.getElementById('details').style.display = 'none';

            }


        })

    mealList.innerHTML = null;
}


const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const idMeal = data.meals[0].idMeal;
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
                .then(res => res.json())
                .then(data => {
                    const detailsInfo = document.createElement('div');
                    const detailsOfMeal = data.meals[0];
                    const ingredientInfo = `
                    <img src ="${detailsOfMeal.strMealThumb}">
                    <h1>${detailsOfMeal.strMeal}</h1>
                    <h3>Ingredients: </h3>
                    <ol>       <li> ${detailsOfMeal.strIngredient1}</li>
                    <li> ${detailsOfMeal.strIngredient2}</li>
                    <li> ${detailsOfMeal.strIngredient3}</li>
                    <li> ${detailsOfMeal.strIngredient4}</li>
                    <li> ${detailsOfMeal.strIngredient5}</li>
                    <li> ${detailsOfMeal.strIngredient6}</li>
                    <li> ${detailsOfMeal.strIngredient7}</li>
                    <li> ${detailsOfMeal.strIngredient8}</li>
                    <li> ${detailsOfMeal.strIngredient9}</li>
                    <li> ${detailsOfMeal.strIngredient10}</li>

</ol>

                    `
                    detailsInfo.innerHTML = ingredientInfo;
                    topInfo.appendChild(detailsInfo);

                });
        })
    topInfo.innerHTML = null;
}