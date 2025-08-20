// Meal Planner Module

class MealPlanner {
    constructor(recipeApp) {
        this.recipeApp = recipeApp;
        this.mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};
        this.shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    }

    generateMealPlan(preferences = {}) {
        const { diet = '', cuisine = '', targetCalories = 2000 } = preferences;
        const recipes = Object.values(this.recipeApp.mockRecipes);
        
        // Filter recipes based on preferences
        let availableRecipes = recipes.filter(recipe => {
            const matchesDiet = !diet || recipe.diet.includes(diet);
            const matchesCuisine = !cuisine || recipe.cuisine === cuisine;
            return matchesDiet && matchesCuisine;
        });

        if (availableRecipes.length < 3) {
            availableRecipes = recipes; // Fallback to all recipes
        }

        // Generate 7-day meal plan
        const mealPlan = {};
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        
        days.forEach(day => {
            mealPlan[day] = {
                breakfast: this.selectRandomRecipe(availableRecipes, 'breakfast'),
                lunch: this.selectRandomRecipe(availableRecipes, 'lunch'),
                dinner: this.selectRandomRecipe(availableRecipes, 'dinner')
            };
        });

        this.mealPlans[new Date().toISOString().split('T')[0]] = mealPlan;
        localStorage.setItem('mealPlans', JSON.stringify(this.mealPlans));
        
        return mealPlan;
    }

    selectRandomRecipe(recipes, mealType) {
        // For demo, just return random recipes
        // In real app, you'd have meal-type specific recipes
        const randomIndex = Math.floor(Math.random() * recipes.length);
        return recipes[randomIndex];
    }

    generateShoppingList(mealPlan) {
        const allIngredients = {};
        
        Object.values(mealPlan).forEach(day => {
            ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
                const recipe = day[mealType];
                if (recipe && recipe.ingredients) {
                    recipe.ingredients.forEach(ingredient => {
                        // Simple ingredient parsing (in real app, use more sophisticated parsing)
                        const cleanIngredient = ingredient.toLowerCase();
                        if (allIngredients[cleanIngredient]) {
                            allIngredients[cleanIngredient].count++;
                        } else {
                            allIngredients[cleanIngredient] = {
                                name: ingredient,
                                count: 1,
                                checked: false
                            };
                        }
                    });
                }
            });
        });

        this.shoppingList = Object.values(allIngredients);
        localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
        
        return this.shoppingList;
    }

    toggleShoppingItem(index) {
        if (this.shoppingList[index]) {
            this.shoppingList[index].checked = !this.shoppingList[index].checked;
            localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
        }
    }

    clearShoppingList() {
        this.shoppingList = [];
        localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList));
    }

    renderMealPlan(mealPlan, containerId) {
        const container = document.getElementById(containerId);
        const days = Object.keys(mealPlan);
        
        container.innerHTML = `
            <div class="meal-plan-grid">
                ${days.map(day => `
                    <div class="day-card">
                        <h3>${day}</h3>
                        <div class="meals">
                            <div class="meal-item">
                                <h4><i class="fas fa-sun"></i> Breakfast</h4>
                                <div class="meal-recipe" onclick="recipeApp.showRecipeDetails('${mealPlan[day].breakfast.id}')">
                                    <img src="${mealPlan[day].breakfast.image}" alt="${mealPlan[day].breakfast.title}">
                                    <span>${mealPlan[day].breakfast.title}</span>
                                </div>
                            </div>
                            <div class="meal-item">
                                <h4><i class="fas fa-cloud-sun"></i> Lunch</h4>
                                <div class="meal-recipe" onclick="recipeApp.showRecipeDetails('${mealPlan[day].lunch.id}')">
                                    <img src="${mealPlan[day].lunch.image}" alt="${mealPlan[day].lunch.title}">
                                    <span>${mealPlan[day].lunch.title}</span>
                                </div>
                            </div>
                            <div class="meal-item">
                                <h4><i class="fas fa-moon"></i> Dinner</h4>
                                <div class="meal-recipe" onclick="recipeApp.showRecipeDetails('${mealPlan[day].dinner.id}')">
                                    <img src="${mealPlan[day].dinner.image}" alt="${mealPlan[day].dinner.title}">
                                    <span>${mealPlan[day].dinner.title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="meal-plan-actions">
                <button class="auth-btn" onclick="mealPlanner.generateNewPlan()">
                    <i class="fas fa-refresh"></i> Generate New Plan
                </button>
                <button class="auth-btn" onclick="mealPlanner.generateShoppingListFromPlan()">
                    <i class="fas fa-shopping-cart"></i> Generate Shopping List
                </button>
            </div>
        `;
    }

    renderShoppingList(containerId) {
        const container = document.getElementById(containerId);
        
        if (this.shoppingList.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-shopping-cart"></i>
                    <p>No shopping list generated yet. Create a meal plan first!</p>
                </div>
            `;
            return;
        }

        const checkedCount = this.shoppingList.filter(item => item.checked).length;
        const totalCount = this.shoppingList.length;

        container.innerHTML = `
            <div class="shopping-list-header">
                <h3>Shopping List</h3>
                <div class="progress-info">
                    <span>${checkedCount}/${totalCount} items collected</span>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(checkedCount/totalCount)*100}%"></div>
                    </div>
                </div>
            </div>
            <div class="shopping-items">
                ${this.shoppingList.map((item, index) => `
                    <div class="shopping-item ${item.checked ? 'checked' : ''}">
                        <input type="checkbox" ${item.checked ? 'checked' : ''} 
                               onchange="mealPlanner.toggleShoppingItem(${index})">
                        <span class="item-name">${item.name}</span>
                        ${item.count > 1 ? `<span class="item-count">x${item.count}</span>` : ''}
                    </div>
                `).join('')}
            </div>
            <div class="shopping-actions">
                <button class="profile-btn" onclick="mealPlanner.clearShoppingList()">
                    <i class="fas fa-trash"></i> Clear List
                </button>
            </div>
        `;
    }

    generateNewPlan() {
        const preferences = {
            diet: document.getElementById('planDietFilter')?.value || '',
            cuisine: document.getElementById('planCuisineFilter')?.value || '',
            targetCalories: parseInt(document.getElementById('calorieTarget')?.value) || 2000
        };

        const newPlan = this.generateMealPlan(preferences);
        this.renderMealPlan(newPlan, 'mealPlanContainer');
        this.recipeApp.showSuccess('New meal plan generated!');
    }

    generateShoppingListFromPlan() {
        const today = new Date().toISOString().split('T')[0];
        const currentPlan = this.mealPlans[today];
        
        if (currentPlan) {
            const shoppingList = this.generateShoppingList(currentPlan);
            this.renderShoppingList('shoppingListContainer');
            this.recipeApp.showSuccess('Shopping list generated!');
        } else {
            this.recipeApp.showError('Please generate a meal plan first!');
        }
    }
}

// Initialize meal planner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.recipeApp) {
            window.mealPlanner = new MealPlanner(window.recipeApp);
        }
    }, 100);
});
