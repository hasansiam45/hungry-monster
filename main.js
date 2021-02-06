

document.getElementById('btn').addEventListener('click', function () {
    const userInput = document.getElementById('input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`)
        .then(res => res.json())
        .then(data => {
            const meal = document.getElementById('meal');
            const mealImg = data.meals[0].strMealThumb;
            const mealName = data.meals[0].strMeal;
            const mealDiv = document.createElement('div');
            const mealInfo = `
            <img src = "${mealImg}">
            <h2>${mealName}</h2>
            `
            mealDiv.innerHTML = mealInfo;
            meal.appendChild(mealDiv);

       
            

            
        })
    
    
})