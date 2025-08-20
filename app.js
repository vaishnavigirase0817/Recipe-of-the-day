// Recipe Finder App - Main JavaScript File

class RecipeApp {
    constructor() {
        this.currentUser = null;
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        this.nutritionData = JSON.parse(localStorage.getItem('nutritionData')) || [];
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.mockRecipes = {
            '1': {
                id: '1', title: 'Spaghetti Carbonara (Italian)', image: 'https://bellyfull.net/wp-content/uploads/2023/02/Spaghetti-Carbonara-blog-1.jpg',
                readyInMinutes: 25, servings: 4, calories: 520, protein: 22, carbs: 45, fat: 28, rating: 4.8, reviews: 156,
                ingredients: ['400g spaghetti', '200g pancetta', '4 large eggs', '100g Pecorino Romano cheese', 'Black pepper', 'Salt'],
                instructions: ['Boil pasta according to package directions', 'Cook pancetta until crispy', 'Whisk eggs with cheese and pepper', 'Combine hot pasta with pancetta', 'Add egg mixture off heat', 'Serve immediately'],
                cuisine: 'italian', diet: [], difficulty: 'medium', tags: ['pasta', 'comfort-food', 'quick']
            },
            '2': {
                id: '2', title: 'Chicken Tikka Masala (Indian)', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400',
                readyInMinutes: 45, servings: 6, calories: 380, protein: 28, carbs: 15, fat: 24, rating: 4.7, reviews: 203,
                ingredients: ['2 lbs chicken breast', '1 cup yogurt', '2 tbsp garam masala', '1 can tomato sauce', '1 cup cream', 'Garlic', 'Ginger', 'Basmati rice'],
                instructions: ['Marinate chicken in yogurt and spices', 'Cook chicken until golden', 'Sauté garlic and ginger', 'Add tomato sauce and spices', 'Add cream and chicken', 'Simmer until thick', 'Serve over rice'],
                cuisine: 'indian', diet: [], difficulty: 'medium', tags: ['curry', 'spicy', 'protein-rich']
            },
            '3': {
                id: '3', title: 'Vegan Buddha Bowl ', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
                readyInMinutes: 30, servings: 2, calories: 420, protein: 15, carbs: 65, fat: 12, rating: 4.6, reviews: 89,
                ingredients: ['1 cup quinoa', '2 cups mixed vegetables', '1 can chickpeas', '2 tbsp tahini', '1 lemon', 'Olive oil', 'Mixed greens', 'Avocado'],
                instructions: ['Cook quinoa', 'Roast vegetables at 400°F', 'Roast chickpeas until crispy', 'Make tahini dressing', 'Assemble bowls with quinoa', 'Top with vegetables and chickpeas', 'Drizzle with dressing'],
                cuisine: 'mediterranean', diet: ['vegan', 'vegetarian', 'gluten-free'], difficulty: 'easy', tags: ['healthy', 'bowl', 'plant-based']
            },
            '4': {
                id: '4', title: 'Beef Tacos (Mexican)', image: 'https://www.thesouthafrican.com/wp-content/uploads/2021/11/tacos-with-minced-beef-1.jpg',
                readyInMinutes: 20, servings: 4, calories: 350, protein: 25, carbs: 30, fat: 18, rating: 4.5, reviews: 178,
                ingredients: ['1 lb ground beef', '8 taco shells', '1 onion diced', '2 cloves garlic', '1 tbsp cumin', '1 tsp chili powder', 'Lettuce', 'Tomatoes', 'Cheese', 'Sour cream'],
                instructions: ['Brown ground beef with onions and garlic', 'Add spices and cook 2 minutes', 'Warm taco shells', 'Fill shells with beef mixture', 'Top with lettuce, tomatoes, cheese', 'Serve with sour cream'],
                cuisine: 'mexican', diet: [], difficulty: 'easy', tags: ['tacos', 'quick', 'family-friendly']
            },
            '5': {
                id: '5', title: 'Salmon Teriyaki (Japanese)', image: 'https://grillonadime.com/wp-content/uploads/2023/02/1200x1800-Grilled-Teriyaki-Salmon-8.jpg',
                readyInMinutes: 25, servings: 4, calories: 420, protein: 35, carbs: 20, fat: 22, rating: 4.9, reviews: 134,
                ingredients: ['4 salmon fillets', '1/4 cup soy sauce', '2 tbsp honey', '2 tbsp rice vinegar', '1 tbsp ginger', '2 cloves garlic', 'Sesame seeds', 'Green onions'],
                instructions: ['Mix soy sauce, honey, vinegar, ginger, and garlic', 'Marinate salmon for 15 minutes', 'Heat pan over medium-high heat', 'Cook salmon 4-5 minutes per side', 'Brush with teriyaki glaze', 'Garnish with sesame seeds and green onions'],
                cuisine: 'japanese', diet: [], difficulty: 'medium', tags: ['fish', 'healthy', 'gluten-free']
            },
            '6': {
                id: '6', title: 'Greek Salad (greek)', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
                readyInMinutes: 15, servings: 4, calories: 280, protein: 8, carbs: 12, fat: 24, rating: 4.4, reviews: 92,
                ingredients: ['4 tomatoes', '1 cucumber', '1 red onion', '200g feta cheese', '1/2 cup olives', '1/4 cup olive oil', '2 tbsp red wine vinegar', 'Oregano', 'Salt', 'Pepper'],
                instructions: ['Chop tomatoes, cucumber, and onion', 'Combine vegetables in large bowl', 'Add feta cheese and olives', 'Whisk olive oil, vinegar, oregano, salt, and pepper', 'Toss salad with dressing', 'Let sit 10 minutes before serving'],
                cuisine: 'greek', diet: ['vegetarian', 'gluten-free'], difficulty: 'easy', tags: ['salad', 'fresh', 'no-cook']
            },
            '7': {
                id: '7', title: 'Pad Thai (thai)', image: 'https://www.cookingclassy.com/wp-content/uploads/2019/03/pad-thai-1.jpg',
                readyInMinutes: 30, servings: 4, calories: 450, protein: 20, carbs: 55, fat: 16, rating: 4.6, reviews: 167,
                ingredients: ['8 oz rice noodles', '2 chicken breasts sliced', '3 eggs', '2 tbsp tamarind paste', '3 tbsp fish sauce', '2 tbsp brown sugar', 'Bean sprouts', 'Peanuts', 'Lime wedges', 'Cilantro'],
                instructions: ['Soak rice noodles in warm water', 'Heat wok over high heat', 'Scramble eggs and set aside', 'Stir-fry chicken until cooked', 'Add drained noodles and sauce', 'Toss with eggs and bean sprouts', 'Garnish with peanuts, lime, and cilantro'],
                cuisine: 'thai', diet: [], difficulty: 'medium', tags: ['noodles', 'stir-fry', 'asian']
            },
            '8': {
                id: '8', title: 'Margherita Pizza (Italian)', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
                readyInMinutes: 35, servings: 4, calories: 380, protein: 16, carbs: 48, fat: 14, rating: 4.7, reviews: 245,
                ingredients: ['Pizza dough', '1/2 cup tomato sauce', '8 oz fresh mozzarella', 'Fresh basil leaves', '2 tbsp olive oil', 'Salt', 'Black pepper'],
                instructions: ['Preheat oven to 475°F', 'Roll out pizza dough', 'Spread tomato sauce evenly', 'Add torn mozzarella pieces', 'Drizzle with olive oil', 'Bake 12-15 minutes until golden', 'Top with fresh basil before serving'],
                cuisine: 'italian', diet: ['vegetarian'], difficulty: 'medium', tags: ['pizza', 'classic', 'cheese']
            },
            '9': {
                id: '9', title: 'Chicken Caesar Salad (American)', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
                readyInMinutes: 20, servings: 4, calories: 320, protein: 28, carbs: 8, fat: 20, rating: 4.3, reviews: 112,
                ingredients: ['2 chicken breasts', 'Romaine lettuce', '1/2 cup Caesar dressing', '1/4 cup Parmesan cheese', 'Croutons', 'Lemon juice', 'Black pepper'],
                instructions: ['Season and grill chicken breasts', 'Let chicken rest, then slice', 'Wash and chop romaine lettuce', 'Toss lettuce with Caesar dressing', 'Top with sliced chicken', 'Add Parmesan cheese and croutons', 'Finish with lemon juice and pepper'],
                cuisine: 'american', diet: [], difficulty: 'easy', tags: ['salad', 'protein', 'classic']
            },
            '10': {
                id: '10', title: 'Beef Stir Fry (Chinese)', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
                readyInMinutes: 25, servings: 4, calories: 380, protein: 30, carbs: 25, fat: 18, rating: 4.5, reviews: 143,
                ingredients: ['1 lb beef sirloin sliced', 'Mixed vegetables', '3 tbsp soy sauce', '2 tbsp oyster sauce', '1 tbsp cornstarch', '2 cloves garlic', '1 tbsp ginger', 'Vegetable oil', 'Rice for serving'],
                instructions: ['Marinate beef in soy sauce and cornstarch', 'Heat wok over high heat', 'Stir-fry beef until browned', 'Remove beef, stir-fry vegetables', 'Add garlic and ginger', 'Return beef to wok with sauces', 'Serve over steamed rice'],
                cuisine: 'chinese', diet: [], difficulty: 'medium', tags: ['stir-fry', 'quick', 'protein']
            },
            '11': {
                id: '11', title: 'Mushroom Risotto (Italian)', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400',
                readyInMinutes: 40, servings: 4, calories: 450, protein: 12, carbs: 65, fat: 16, rating: 4.8, reviews: 98,
                ingredients: ['1.5 cups Arborio rice', '6 cups warm vegetable broth', '1 lb mixed mushrooms', '1 onion diced', '1/2 cup white wine', '1/2 cup Parmesan cheese', 'Butter', 'Olive oil', 'Fresh thyme'],
                instructions: ['Sauté mushrooms until golden, set aside', 'Cook onion in olive oil until soft', 'Add rice, stir for 2 minutes', 'Add wine, stir until absorbed', 'Add warm broth one ladle at a time', 'Stir in mushrooms, butter, and Parmesan', 'Garnish with fresh thyme'],
                cuisine: 'italian', diet: ['vegetarian'], difficulty: 'hard', tags: ['rice', 'creamy', 'comfort-food']
            },
            '12': {
                id: '12', title: 'Fish Tacos (Mexican)', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
                readyInMinutes: 25, servings: 4, calories: 320, protein: 25, carbs: 28, fat: 14, rating: 4.6, reviews: 187,
                ingredients: ['1 lb white fish fillets', '8 corn tortillas', '2 cups cabbage slaw', '1 avocado', 'Lime juice', 'Cilantro', 'Chipotle mayo', 'Cumin', 'Paprika'],
                instructions: ['Season fish with cumin and paprika', 'Pan-fry fish until flaky', 'Warm tortillas', 'Make slaw with cabbage and lime', 'Prepare chipotle mayo', 'Assemble tacos with fish, slaw, avocado', 'Garnish with cilantro and lime'],
                cuisine: 'mexican', diet: [], difficulty: 'easy', tags: ['fish', 'tacos', 'fresh']
            },
            '13': {
                id: '13', title: 'Ramen Bowl (Japanese)', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
                readyInMinutes: 35, servings: 2, calories: 480, protein: 22, carbs: 58, fat: 18, rating: 4.7, reviews: 156,
                ingredients: ['2 packs ramen noodles', '4 cups chicken broth', '2 soft-boiled eggs', 'Sliced pork belly', 'Green onions', 'Nori sheets', 'Corn kernels', 'Bean sprouts', 'Miso paste'],
                instructions: ['Prepare soft-boiled eggs', 'Cook pork belly until crispy', 'Heat chicken broth with miso paste', 'Cook ramen noodles separately', 'Assemble bowls with noodles and broth', 'Top with eggs, pork, and vegetables', 'Garnish with nori and green onions'],
                cuisine: 'japanese', diet: [], difficulty: 'medium', tags: ['noodles', 'soup', 'comfort-food']
            },
            '14': {
                id: '14', title: 'Caprese Salad (Italian)', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400',
                readyInMinutes: 10, servings: 4, calories: 250, protein: 12, carbs: 8, fat: 20, rating: 4.4, reviews: 76,
                ingredients: ['4 large tomatoes', '8 oz fresh mozzarella', 'Fresh basil leaves', '1/4 cup balsamic vinegar', '2 tbsp olive oil', 'Salt', 'Black pepper'],
                instructions: ['Slice tomatoes and mozzarella', 'Arrange alternating on plate', 'Tuck basil leaves between slices', 'Drizzle with olive oil and balsamic', 'Season with salt and pepper', 'Let sit 5 minutes before serving'],
                cuisine: 'italian', diet: ['vegetarian', 'gluten-free'], difficulty: 'easy', tags: ['salad', 'fresh', 'no-cook']
            },
            '15': {
                id: '15', title: 'Korean Bibimbap (Korean)', image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400',
                readyInMinutes: 40, servings: 4, calories: 520, protein: 24, carbs: 68, fat: 16, rating: 4.8, reviews: 134,
                ingredients: ['2 cups cooked rice', '1 lb beef bulgogi', 'Spinach', 'Bean sprouts', 'Carrots', 'Mushrooms', '4 eggs', 'Gochujang', 'Sesame oil', 'Garlic'],
                instructions: ['Prepare and season each vegetable separately', 'Cook beef bulgogi until tender', 'Fry eggs sunny-side up', 'Arrange rice in bowls', 'Top with vegetables and beef in sections', 'Add fried egg on top', 'Serve with gochujang and sesame oil'],
                cuisine: 'korean', diet: [], difficulty: 'hard', tags: ['rice-bowl', 'korean', 'balanced']
            },
            '16': {
                id: '16', title: 'French Onion Soup (French)', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
                readyInMinutes: 60, servings: 4, calories: 380, protein: 18, carbs: 35, fat: 20, rating: 4.6, reviews: 89,
                ingredients: ['6 large onions sliced', '6 cups beef broth', '1/2 cup dry white wine', 'Gruyere cheese', 'French bread slices', 'Butter', 'Fresh thyme', 'Bay leaves', 'Salt', 'Pepper'],
                instructions: ['Caramelize onions in butter for 30 minutes', 'Add wine and cook 5 minutes', 'Add broth, thyme, and bay leaves', 'Simmer 20 minutes', 'Ladle into oven-safe bowls', 'Top with bread and cheese', 'Broil until cheese bubbles'],
                cuisine: 'french', diet: [], difficulty: 'medium', tags: ['soup', 'comfort-food', 'cheese']
            },
            '17': {
                id: '17', title: 'Quinoa Stuffed Peppers (Mexican)', image: 'https://tse2.mm.bing.net/th/id/OIP.mM-KiM9CZ3tZwAtRIOq1vwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3',
                readyInMinutes: 45, servings: 4, calories: 320, protein: 14, carbs: 48, fat: 10, rating: 4.3, reviews: 67,
                ingredients: ['4 bell peppers', '1 cup quinoa', '1 can black beans', '1 cup corn', '1 onion diced', 'Tomatoes', 'Cheese', 'Cumin', 'Paprika', 'Cilantro'],
                instructions: ['Cut tops off peppers and remove seeds', 'Cook quinoa according to package directions', 'Sauté onion until soft', 'Mix quinoa, beans, corn, and spices', 'Stuff peppers with mixture', 'Top with cheese', 'Bake at 375°F for 25 minutes'],
                cuisine: 'mexican', diet: ['vegetarian'], difficulty: 'medium', tags: ['stuffed', 'healthy', 'protein-rich']
            },
            '18': {
                id: '18', title: 'Chicken Noodle Soup (American)', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
                readyInMinutes: 50, servings: 6, calories: 280, protein: 22, carbs: 32, fat: 8, rating: 4.5, reviews: 198,
                ingredients: ['2 chicken breasts', '8 oz egg noodles', '3 carrots diced', '3 celery stalks diced', '1 onion diced', '8 cups chicken broth', 'Fresh dill', 'Salt', 'Pepper', 'Bay leaves'],
                instructions: ['Simmer chicken in broth until cooked', 'Remove chicken and shred', 'Sauté vegetables until tender', 'Add vegetables to broth', 'Cook noodles separately', 'Return chicken to pot', 'Add cooked noodles and fresh dill'],
                cuisine: 'american', diet: [], difficulty: 'easy', tags: ['soup', 'comfort-food', 'healing']
            },
            '19': {
                id: '19', title: 'Chocolate Lava Cake (French)', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
                readyInMinutes: 25, servings: 4, calories: 420, protein: 8, carbs: 45, fat: 24, rating: 4.9, reviews: 234,
                ingredients: ['4 oz dark chocolate', '4 tbsp butter', '2 eggs', '2 egg yolks', '1/4 cup sugar', '2 tbsp flour', 'Butter for ramekins', 'Powdered sugar', 'Vanilla ice cream'],
                instructions: ['Preheat oven to 425°F', 'Melt chocolate and butter together', 'Whisk eggs, yolks, and sugar', 'Combine chocolate mixture with eggs', 'Fold in flour', 'Pour into buttered ramekins', 'Bake 12-14 minutes until edges are firm', 'Serve immediately with ice cream'],
                cuisine: 'french', diet: ['vegetarian'], difficulty: 'medium', tags: ['dessert', 'chocolate', 'indulgent']
            },
            '20': {
                id: '20', title: 'Avocado Toast (American)', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
                readyInMinutes: 10, servings: 2, calories: 280, protein: 8, carbs: 25, fat: 18, rating: 4.2, reviews: 156,
                ingredients: ['2 slices whole grain bread', '1 ripe avocado', '1 tomato sliced', '2 eggs', 'Lemon juice', 'Red pepper flakes', 'Salt', 'Black pepper', 'Olive oil'],
                instructions: ['Toast bread until golden', 'Mash avocado with lemon juice and salt', 'Fry or poach eggs', 'Spread avocado on toast', 'Top with tomato slices', 'Add cooked egg on top', 'Season with pepper flakes and olive oil'],
                cuisine: 'american', diet: ['vegetarian'], difficulty: 'easy', tags: ['breakfast', 'healthy', 'quick']
            }
        };
        
        this.init();
    }

    init() {
        this.loadTheme();
        this.setupEventListeners();
        this.checkAuthState();
        this.loadFavorites();
        this.updateNutritionDashboard();
        this.loadPopularRecipes();
    }

    loadTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('.theme-toggle i');
        themeIcon.className = this.currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    setupEventListeners() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });

        document.getElementById('searchBtn').addEventListener('click', () => this.searchRecipes());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchRecipes();
        });

        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('signupForm').addEventListener('submit', (e) => this.handleSignup(e));

        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchAuthTab(tab.dataset.tab));
        });

        document.querySelectorAll('.close').forEach(close => {
            close.addEventListener('click', () => this.closeModals());
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) this.closeModals();
        });
    }

    checkAuthState() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUserInterface();
        }
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}Tab`).classList.add('active');

        if (tabName === 'explore') this.loadPopularRecipes();
        else if (tabName === 'favorites') this.loadFavorites();
        else if (tabName === 'nutrition') this.updateNutritionDashboard();
        else if (tabName === 'profile') this.updateProfileInfo();
    }

    switchAuthTab(tabName) {
        document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(`${tabName}Form`).classList.add('active');
    }

    async searchRecipes() {
        const query = document.getElementById('searchInput').value.trim();
        if (!query) return;

        const cuisine = document.getElementById('cuisineFilter').value;
        const diet = document.getElementById('dietFilter').value;
        const time = document.getElementById('timeFilter').value;
        const difficulty = document.getElementById('difficultyFilter').value;

        this.showLoading();

        try {
            const recipes = await this.fetchRecipes(query, { cuisine, diet, time, difficulty });
            this.displayRecipes(recipes, 'searchResults');
            
            this.searchHistory.push({
                query, timestamp: new Date().toISOString(),
                filters: { cuisine, diet, time, difficulty }
            });
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            
        } catch (error) {
            this.showError('Failed to search recipes. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    async fetchRecipes(query, filters = {}) {
        const allRecipes = Object.values(this.mockRecipes);
        
        let filteredRecipes = allRecipes.filter(recipe => {
            const matchesQuery = recipe.title.toLowerCase().includes(query.toLowerCase()) ||
                               recipe.ingredients.some(ing => ing.toLowerCase().includes(query.toLowerCase())) ||
                               recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
            
            const matchesCuisine = !filters.cuisine || recipe.cuisine === filters.cuisine;
            const matchesDiet = !filters.diet || recipe.diet.includes(filters.diet);
            const matchesTime = !filters.time || recipe.readyInMinutes <= parseInt(filters.time);
            const matchesDifficulty = !filters.difficulty || recipe.difficulty === filters.difficulty;

            return matchesQuery && matchesCuisine && matchesDiet && matchesTime && matchesDifficulty;
        });

        await new Promise(resolve => setTimeout(resolve, 800));
        return filteredRecipes;
    }

    displayRecipes(recipes, containerId) {
        const container = document.getElementById(containerId);
        
        if (recipes.length === 0) {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-search"></i><p>No recipes found. Try adjusting your search criteria.</p></div>`;
            return;
        }

        container.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" onclick="recipeApp.showRecipeDetails('${recipe.id}')">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" 
                     onerror="this.src='https://via.placeholder.com/400x200?text=Recipe+Image'">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <div class="recipe-meta">
                        <span><i class="fas fa-clock"></i> ${recipe.readyInMinutes} min</span>
                        <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                        <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                        <span class="difficulty-badge ${recipe.difficulty}"><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                    </div>
                    <div class="recipe-rating">
                        <span class="rating-display">
                            <i class="fas fa-star"></i> ${recipe.rating} (${recipe.reviews} reviews)
                        </span>
                    </div>
                    <div class="recipe-actions">
                        <button class="favorite-btn ${this.favorites.includes(recipe.id) ? 'active' : ''}" 
                                onclick="event.stopPropagation(); recipeApp.toggleFavorite('${recipe.id}')">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="share-btn-small" onclick="event.stopPropagation(); shareRecipe('${recipe.id}')" title="Share Recipe">
                            <i class="fas fa-share-alt"></i>
                        </button>
                        <button class="view-recipe-btn">View Recipe</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async showRecipeDetails(recipeId, scaledRecipe = null) {
        const recipe = scaledRecipe || this.mockRecipes[recipeId];
        if (!recipe) return;

        const modal = document.getElementById('recipeModal');
        const detailsContainer = document.getElementById('recipeDetails');

        detailsContainer.innerHTML = `
            <div class="recipe-header">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h2>${recipe.title}</h2>
                <div class="recipe-meta-detailed">
                    <span><i class="fas fa-clock"></i> ${recipe.readyInMinutes} minutes</span>
                    <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                    <span><i class="fas fa-fire"></i> ${recipe.calories} calories</span>
                    <span class="difficulty-badge ${recipe.difficulty}"><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                </div>
                <div class="recipe-rating-display">
                    <span class="rating-display">
                        <i class="fas fa-star"></i> ${recipe.rating} (${recipe.reviews} reviews)
                    </span>
                </div>
            </div>

            <!-- Recipe Scaling Controls -->
            <div class="scaling-controls">
                <span>Adjust servings:</span>
                <div class="serving-adjuster">
                    <button class="serving-btn" onclick="adjustServings('${recipe.id}', ${recipe.servings - 1})">-</button>
                    <span class="serving-display">${recipe.servings}</span>
                    <button class="serving-btn" onclick="adjustServings('${recipe.id}', ${recipe.servings + 1})">+</button>
                </div>
                <button class="timer-start-btn" onclick="startCookingTimer(${recipe.readyInMinutes}, '${recipe.title}')">
                    <i class="fas fa-clock"></i> Start Timer
                </button>
            </div>
            
            <div class="recipe-content">
                <div class="ingredients-section">
                    <h3><i class="fas fa-list"></i> Ingredients</h3>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="instructions-section">
                    <h3><i class="fas fa-clipboard-list"></i> Instructions</h3>
                    <ol class="instructions-list">
                        ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                    </ol>
                </div>
            </div>
            
            <div class="nutrition-info">
                <h3><i class="fas fa-chart-pie"></i> Nutrition Information (per serving)</h3>
                <div class="nutrition-grid">
                    <div class="nutrition-item"><div class="value">${recipe.calories}</div><div class="label">Calories</div></div>
                    <div class="nutrition-item"><div class="value">${recipe.protein}g</div><div class="label">Protein</div></div>
                    <div class="nutrition-item"><div class="value">${recipe.carbs}g</div><div class="label">Carbs</div></div>
                    <div class="nutrition-item"><div class="value">${recipe.fat}g</div><div class="label">Fat</div></div>
                </div>
                <button class="auth-btn" onclick="recipeApp.addToNutritionTracker('${recipe.id}')" style="margin-top: 1rem;">
                    <i class="fas fa-plus"></i> Add to Nutrition Tracker
                </button>
            </div>

            <!-- Recipe Rating Section -->
            <div class="recipe-rating-section">
                <h3><i class="fas fa-star"></i> Rate This Recipe</h3>
                <div class="rating-stars" data-recipe="${recipe.id}">
                    ${[1,2,3,4,5].map(star => `<span class="star" data-rating="${star}">★</span>`).join('')}
                </div>
                <textarea id="reviewText" placeholder="Write a review (optional)..." rows="3"></textarea>
                <button class="auth-btn" onclick="submitRating('${recipe.id}')">Submit Rating</button>
            </div>

            <!-- Recipe Sharing -->
            <div class="recipe-sharing">
                <h3><i class="fas fa-share-alt"></i> Share This Recipe</h3>
                <div class="share-buttons">
                    <button class="share-btn copy" onclick="shareRecipe('${recipe.id}')">
                        <i class="fas fa-copy"></i> Copy Link
                    </button>
                    <button class="share-btn facebook" onclick="shareToFacebook('${recipe.id}')">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button class="share-btn twitter" onclick="shareToTwitter('${recipe.id}')">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                </div>
            </div>
        `;

        // Setup rating stars interaction
        this.setupRatingStars(recipe.id);
        modal.style.display = 'block';
    }

    toggleFavorite(recipeId) {
        const index = this.favorites.indexOf(recipeId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(recipeId);
        }

        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.updateFavoriteButtons();
        this.loadFavorites();
        this.updateProfileInfo();
    }

    updateFavoriteButtons() {
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            if (onclick) {
                const recipeId = onclick.match(/'([^']+)'/)?.[1];
                if (recipeId) {
                    btn.classList.toggle('active', this.favorites.includes(recipeId));
                }
            }
        });
    }

    async loadFavorites() {
        const favoritesGrid = document.getElementById('favoritesGrid');
        
        if (this.favorites.length === 0) {
            favoritesGrid.innerHTML = `<div class="empty-state"><i class="fas fa-heart"></i><p>No favorites yet. Start exploring recipes!</p></div>`;
            return;
        }

        const favoriteRecipes = this.favorites.map(id => this.mockRecipes[id]).filter(Boolean);
        this.displayRecipes(favoriteRecipes, 'favoritesGrid');
    }

    addToNutritionTracker(recipeId) {
        const recipe = this.mockRecipes[recipeId];
        if (recipe) {
            const nutritionEntry = {
                id: Date.now().toString(),
                recipeId: recipe.id,
                recipeName: recipe.title,
                calories: recipe.calories,
                protein: recipe.protein,
                carbs: recipe.carbs,
                fat: recipe.fat,
                date: new Date().toISOString().split('T')[0]
            };

            this.nutritionData.push(nutritionEntry);
            localStorage.setItem('nutritionData', JSON.stringify(this.nutritionData));
            this.updateNutritionDashboard();
            this.showSuccess('Recipe added to nutrition tracker!');
        }
    }

    updateNutritionDashboard() {
        const today = new Date().toISOString().split('T')[0];
        const todayEntries = this.nutritionData.filter(entry => entry.date === today);

        const totals = todayEntries.reduce((acc, entry) => ({
            calories: acc.calories + entry.calories,
            protein: acc.protein + entry.protein,
            carbs: acc.carbs + entry.carbs,
            fat: acc.fat + entry.fat
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

        document.getElementById('dailyCalories').textContent = Math.round(totals.calories);
        document.getElementById('dailyProtein').textContent = Math.round(totals.protein);
        document.getElementById('dailyCarbs').textContent = Math.round(totals.carbs);
        document.getElementById('dailyFat').textContent = Math.round(totals.fat);

        const historyContainer = document.getElementById('nutritionHistory');
        if (todayEntries.length > 0) {
            historyContainer.innerHTML = `
                <h3>Today's Meals</h3>
                ${todayEntries.map(entry => `
                    <div class="nutrition-entry" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--surface); border-radius: 10px; margin: 0.5rem 0;">
                        <span>${entry.recipeName}</span>
                        <span>${entry.calories} cal</span>
                        <button onclick="recipeApp.removeNutritionEntry('${entry.id}')" style="background: var(--error); color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 5px; cursor: pointer;">Remove</button>
                    </div>
                `).join('')}
            `;
        } else {
            historyContainer.innerHTML = `<div class="empty-state"><i class="fas fa-chart-pie"></i><p>No meals tracked today.</p></div>`;
        }
    }

    removeNutritionEntry(entryId) {
        this.nutritionData = this.nutritionData.filter(entry => entry.id !== entryId);
        localStorage.setItem('nutritionData', JSON.stringify(this.nutritionData));
        this.updateNutritionDashboard();
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (email && password) {
            this.currentUser = {
                id: Date.now().toString(),
                name: email.split('@')[0],
                email: email,
                loginTime: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUserInterface();
            this.closeModals();
            this.showSuccess('Login successful!');
        }
    }

    handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        if (name && email && password) {
            this.currentUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                signupTime: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUserInterface();
            this.closeModals();
            this.showSuccess('Account created successfully!');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUserInterface();
        this.showSuccess('Logged out successfully!');
    }

    updateUserInterface() {
        const userGreeting = document.getElementById('userGreeting');
        const authButton = document.getElementById('authButton');

        if (this.currentUser) {
            userGreeting.textContent = `Welcome, ${this.currentUser.name}!`;
            authButton.textContent = 'Logout';
            authButton.onclick = () => this.logout();
        } else {
            userGreeting.textContent = 'Welcome, Guest!';
            authButton.textContent = 'Login';
            authButton.onclick = () => this.showAuthModal();
        }

        this.updateProfileInfo();
    }

    updateProfileInfo() {
        if (this.currentUser) {
            document.getElementById('profileName').textContent = this.currentUser.name;
            document.getElementById('profileEmail').textContent = this.currentUser.email;
        }
        
        document.getElementById('totalFavorites').textContent = this.favorites.length;
        document.getElementById('totalSearches').textContent = this.searchHistory.length;
    }

    async loadPopularRecipes() {
        this.showLoading();
        try {
            const recipes = Object.values(this.mockRecipes);
            this.displayRecipes(recipes, 'exploreResults');
        } finally {
            this.hideLoading();
        }
    }

    searchByCuisine(cuisine) {
        document.getElementById('cuisineFilter').value = cuisine;
        document.getElementById('searchInput').value = cuisine;
        this.switchTab('home');
        this.searchRecipes();
    }

    showAuthModal() {
        document.getElementById('authModal').style.display = 'block';
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    showLoading() {
        document.getElementById('loadingSpinner').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loadingSpinner').style.display = 'none';
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed; top: 2rem; right: 2rem; z-index: 10000;
            background: var(--surface); color: var(--text-primary);
            padding: 1rem 1.5rem; border-radius: 10px;
            box-shadow: 0 4px 15px var(--shadow);
            border-left: 4px solid ${type === 'success' ? 'var(--success)' : 'var(--error)'};
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    setupRatingStars(recipeId) {
        const stars = document.querySelectorAll('.rating-stars .star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i <= index);
                });
            });
        });
    }

    clearData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            localStorage.clear();
            this.favorites = [];
            this.searchHistory = [];
            this.nutritionData = [];
            this.currentUser = null;
            this.updateUserInterface();
            this.loadFavorites();
            this.updateNutritionDashboard();
            this.showSuccess('All data cleared successfully!');
        }
    }
}

// Global functions for HTML onclick handlers
function toggleTheme() {
    recipeApp.currentTheme = recipeApp.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', recipeApp.currentTheme);
    recipeApp.loadTheme();
}

function continueAsGuest() {
    recipeApp.currentUser = {
        id: 'guest',
        name: 'Guest',
        email: 'guest@example.com',
        isGuest: true
    };
    
    recipeApp.updateUserInterface();
    recipeApp.closeModals();
    recipeApp.showSuccess('Welcome, Guest!');
}

function searchByCuisine(cuisine) {
    recipeApp.searchByCuisine(cuisine);
}

function clearData() {
    recipeApp.clearData();
}

function logout() {
    recipeApp.logout();
}

function showMealPlanner() {
    document.getElementById('mealPlannerModal').style.display = 'block';
    // Generate initial meal plan if none exists
    if (window.mealPlanner && !document.getElementById('mealPlanContainer').innerHTML) {
        generateMealPlan();
    }
}

function showShoppingList() {
    document.getElementById('shoppingListModal').style.display = 'block';
    if (window.mealPlanner) {
        window.mealPlanner.renderShoppingList('shoppingListContainer');
    }
}

function generateMealPlan() {
    if (window.mealPlanner) {
        window.mealPlanner.generateNewPlan();
    }
}

function adjustServings(recipeId, newServings) {
    if (newServings < 1) return;
    if (window.enhancedFeatures && window.recipeApp) {
        const recipe = window.recipeApp.mockRecipes[recipeId];
        const scaledRecipe = window.enhancedFeatures.scaleRecipe(recipe, newServings);
        window.recipeApp.showRecipeDetails(recipeId, scaledRecipe);
    }
}

function startCookingTimer(minutes, recipeName) {
    if (window.enhancedFeatures) {
        const timerWidget = document.getElementById('timerWidget');
        timerWidget.classList.remove('hidden');
        window.currentTimer = window.enhancedFeatures.startCookingTimer(minutes, recipeName);
        
        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

function stopTimer() {
    if (window.currentTimer) {
        clearInterval(window.currentTimer);
        window.currentTimer = null;
    }
    document.getElementById('timerWidget').classList.add('hidden');
}

function submitRating(recipeId) {
    const activeStars = document.querySelectorAll('.rating-stars .star.active');
    const rating = activeStars.length;
    const reviewText = document.getElementById('reviewText').value;
    
    if (rating === 0) {
        recipeApp.showError('Please select a rating!');
        return;
    }
    
    if (window.enhancedFeatures) {
        window.enhancedFeatures.addReview(recipeId, reviewText, rating);
        recipeApp.showSuccess('Thank you for your rating and review!');
        document.getElementById('reviewText').value = '';
    }
}

function shareToFacebook(recipeId) {
    const recipe = recipeApp.mockRecipes[recipeId];
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Check out this amazing ${recipe.title} recipe!`)}`;
    window.open(url, '_blank', 'width=600,height=400');
}

function shareToTwitter(recipeId) {
    const recipe = recipeApp.mockRecipes[recipeId];
    const text = `Check out this amazing ${recipe.title} recipe! 🍽️`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank', 'width=600,height=400');
}

function showQuickRecipes() {
    if (window.enhancedFeatures) {
        const quickRecipes = window.enhancedFeatures.getQuickRecipes();
        recipeApp.displayRecipes(quickRecipes, 'searchResults');
        recipeApp.showSuccess('Showing quick recipes (under 20 minutes)!');
    }
}

function showHealthyRecipes() {
    if (window.enhancedFeatures) {
        const healthyRecipes = window.enhancedFeatures.getHealthyRecipes();
        recipeApp.displayRecipes(healthyRecipes, 'searchResults');
        recipeApp.showSuccess('Showing healthy, low-calorie recipes!');
    }
}

function showPopularRecipes() {
    if (window.enhancedFeatures) {
        const popularRecipes = window.enhancedFeatures.getPopularRecipes();
        recipeApp.displayRecipes(popularRecipes, 'searchResults');
        recipeApp.showSuccess('Showing most popular recipes!');
    }
}

function showSeasonalRecipes() {
    if (window.enhancedFeatures) {
        const seasonalRecipes = window.enhancedFeatures.getSeasonalRecipes();
        recipeApp.displayRecipes(seasonalRecipes, 'searchResults');
        recipeApp.showSuccess('Showing seasonal recipe recommendations!');
    }
}

function importRecipe() {
    const url = document.getElementById('importUrl').value;
    if (!url) {
        recipeApp.showError('Please enter a valid URL!');
        return;
    }
    
    if (window.enhancedFeatures) {
        window.enhancedFeatures.importRecipeFromUrl(url).then(recipe => {
            if (recipe) {
                recipeApp.showSuccess('Recipe imported successfully!');
                document.getElementById('importModal').style.display = 'none';
                document.getElementById('importUrl').value = '';
            } else {
                recipeApp.showError('Failed to import recipe. Please try again.');
            }
        });
    }
}

function showImportModal() {
    document.getElementById('importModal').style.display = 'block';
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.recipeApp = new RecipeApp();
    
    // Load AI recommendations on home page
    setTimeout(() => {
        if (window.enhancedFeatures) {
            window.enhancedFeatures.renderRecommendations('aiRecommendations');
        }
    }, 1000);
});

// Add slide-in animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
