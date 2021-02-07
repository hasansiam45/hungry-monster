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
                    <h3>1. ${detailsOfMeal.strIngredient1}</h3>
                    <h3>2. ${detailsOfMeal.strIngredient2}</h3>
                    <h3>3. ${detailsOfMeal.strIngredient3}</h3>
                    <h3>4. ${detailsOfMeal.strIngredient4}</h3>
                    <h3>5. ${detailsOfMeal.strIngredient5}</h3>
                    <h3>6. ${detailsOfMeal.strIngredient6}</h3>
                    <h3>7. ${detailsOfMeal.strIngredient7}</h3>


                    `
                    detailsInfo.innerHTML = ingredientInfo;
                    topInfo.appendChild(detailsInfo);

                });
        })
    topInfo.innerHTML = null;
}