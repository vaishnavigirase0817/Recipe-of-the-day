// Advanced Features Module for Recipe Finder
class AdvancedFeatures {
    constructor() {
        this.currentCookingStep = 0;
        this.cookingSteps = [];
        this.cookingTimer = null;
        this.cookingTimerInterval = null;
        this.cookingTimerSeconds = 0;
        this.completedSteps = new Set();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserProgress();
    }

    setupEventListeners() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            if (e.key === 'ArrowRight' && document.getElementById('cookingModeModal').style.display === 'block') {
                this.nextStep();
            }
            if (e.key === 'ArrowLeft' && document.getElementById('cookingModeModal').style.display === 'block') {
                this.previousStep();
            }
        });
    }

    // Cooking Mode Feature
    startCookingMode(recipeId) {
        const recipe = window.recipeApp.mockRecipes[recipeId];
        if (!recipe) return;

        this.cookingSteps = [
            {
                title: "Preparation",
                content: "Gather all ingredients and equipment needed for this recipe.",
                image: recipe.image,
                timer: 5
            },
            ...recipe.ingredients.map((ingredient, index) => ({
                title: `Ingredient ${index + 1}`,
                content: `Prepare: ${ingredient}`,
                image: recipe.image,
                timer: 2
            })),
            ...recipe.instructions.map((instruction, index) => ({
                title: `Step ${index + 1}`,
                content: instruction,
                image: recipe.image,
                timer: Math.ceil(recipe.readyInMinutes / recipe.instructions.length)
            }))
        ];

        this.currentCookingStep = 0;
        this.completedSteps.clear();
        
        document.getElementById('cookingRecipeTitle').textContent = recipe.title;
        document.getElementById('cookingModeModal').style.display = 'block';
        this.renderCookingStep();
    }

    renderCookingStep() {
        const step = this.cookingSteps[this.currentCookingStep];
        if (!step) return;

        const stepContent = document.getElementById('cookingStepContent');
        const stepCounter = document.getElementById('stepCounter');
        
        stepCounter.textContent = `Step ${this.currentCookingStep + 1} of ${this.cookingSteps.length}`;
        
        stepContent.innerHTML = `
            <div class="step-content">
                <h3>${step.title}</h3>
                <img src="${step.image}" alt="${step.title}" class="step-image">
                <p>${step.content}</p>
                <div class="step-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((this.currentCookingStep + 1) / this.cookingSteps.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">${this.currentCookingStep + 1}/${this.cookingSteps.length} completed</span>
                </div>
            </div>
        `;

        // Update timer button
        const timerText = document.getElementById('timerText');
        timerText.textContent = `Start ${step.timer}min Timer`;
    }

    nextStep() {
        if (this.currentCookingStep < this.cookingSteps.length - 1) {
            this.currentCookingStep++;
            this.renderCookingStep();
        } else {
            this.completeCookingMode();
        }
    }

    previousStep() {
        if (this.currentCookingStep > 0) {
            this.currentCookingStep--;
            this.renderCookingStep();
        }
    }

    markStepComplete() {
        this.completedSteps.add(this.currentCookingStep);
        window.recipeApp.showSuccess('Step completed!');
        this.nextStep();
    }

    completeCookingMode() {
        window.recipeApp.showSuccess('🎉 Cooking completed! Enjoy your meal!');
        this.closeAllModals();
        this.saveUserProgress();
    }

    toggleTimer() {
        const step = this.cookingSteps[this.currentCookingStep];
        if (!step) return;

        if (this.cookingTimerInterval) {
            this.stopCookingTimer();
        } else {
            this.startCookingTimer(step.timer);
        }
    }

    startCookingTimer(minutes) {
        this.cookingTimerSeconds = minutes * 60;
        const timerText = document.getElementById('timerText');
        
        this.cookingTimerInterval = setInterval(() => {
            this.cookingTimerSeconds--;
            const mins = Math.floor(this.cookingTimerSeconds / 60);
            const secs = this.cookingTimerSeconds % 60;
            timerText.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            
            if (this.cookingTimerSeconds <= 0) {
                this.stopCookingTimer();
                this.showTimerNotification();
            }
        }, 1000);
        
        timerText.textContent = `${minutes}:00`;
    }

    stopCookingTimer() {
        if (this.cookingTimerInterval) {
            clearInterval(this.cookingTimerInterval);
            this.cookingTimerInterval = null;
        }
        document.getElementById('timerText').textContent = 'Start Timer';
    }

    showTimerNotification() {
        window.recipeApp.showSuccess('⏰ Timer finished! Check your cooking.');
        
        // Browser notification if permission granted
        if (Notification.permission === 'granted') {
            new Notification('Cooking Timer', {
                body: 'Your cooking timer has finished!',
                icon: '/favicon.ico'
            });
        }
        
        // Play sound (if available)
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU4k9n1unEiBC13yO/eizEIHWq+8+OWT');
            audio.play().catch(() => {}); // Ignore errors
        } catch (e) {}
    }

    // Recipe Comparison Feature
    showRecipeComparison() {
        const modal = document.getElementById('comparisonModal');
        const recipe1Select = document.getElementById('recipe1Select');
        const recipe2Select = document.getElementById('recipe2Select');
        
        // Populate recipe options
        const recipes = Object.values(window.recipeApp.mockRecipes);
        const options = recipes.map(recipe => 
            `<option value="${recipe.id}">${recipe.title}</option>`
        ).join('');
        
        recipe1Select.innerHTML = '<option value="">Select first recipe...</option>' + options;
        recipe2Select.innerHTML = '<option value="">Select second recipe...</option>' + options;
        
        modal.style.display = 'block';
    }

    compareRecipes() {
        const recipe1Id = document.getElementById('recipe1Select').value;
        const recipe2Id = document.getElementById('recipe2Select').value;
        
        if (!recipe1Id || !recipe2Id) {
            window.recipeApp.showError('Please select both recipes to compare!');
            return;
        }
        
        if (recipe1Id === recipe2Id) {
            window.recipeApp.showError('Please select different recipes to compare!');
            return;
        }
        
        const recipe1 = window.recipeApp.mockRecipes[recipe1Id];
        const recipe2 = window.recipeApp.mockRecipes[recipe2Id];
        
        this.renderComparison(recipe1, recipe2);
    }

    renderComparison(recipe1, recipe2) {
        const resultsContainer = document.getElementById('comparisonResults');
        
        // Determine winners for each metric
        const metrics = {
            calories: recipe1.calories < recipe2.calories ? 1 : 2,
            time: recipe1.readyInMinutes < recipe2.readyInMinutes ? 1 : 2,
            protein: recipe1.protein > recipe2.protein ? 1 : 2,
            rating: recipe1.rating > recipe2.rating ? 1 : 2
        };
        
        resultsContainer.innerHTML = `
            <div class="comparison-recipe ${metrics.calories === 1 || metrics.time === 1 || metrics.protein === 1 || metrics.rating === 1 ? 'winner' : ''}">
                <h3>${recipe1.title}</h3>
                <img src="${recipe1.image}" alt="${recipe1.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                
                <div class="comparison-metric">
                    <span>Calories:</span>
                    <span class="metric-value ${metrics.calories === 1 ? 'winner' : ''}">${recipe1.calories}</span>
                </div>
                <div class="comparison-metric">
                    <span>Cooking Time:</span>
                    <span class="metric-value ${metrics.time === 1 ? 'winner' : ''}">${recipe1.readyInMinutes} min</span>
                </div>
                <div class="comparison-metric">
                    <span>Protein:</span>
                    <span class="metric-value ${metrics.protein === 1 ? 'winner' : ''}">${recipe1.protein}g</span>
                </div>
                <div class="comparison-metric">
                    <span>Rating:</span>
                    <span class="metric-value ${metrics.rating === 1 ? 'winner' : ''}">${recipe1.rating}⭐</span>
                </div>
                <div class="comparison-metric">
                    <span>Difficulty:</span>
                    <span class="metric-value">${recipe1.difficulty}</span>
                </div>
                <div class="comparison-metric">
                    <span>Servings:</span>
                    <span class="metric-value">${recipe1.servings}</span>
                </div>
            </div>
            
            <div class="comparison-recipe ${metrics.calories === 2 || metrics.time === 2 || metrics.protein === 2 || metrics.rating === 2 ? 'winner' : ''}">
                <h3>${recipe2.title}</h3>
                <img src="${recipe2.image}" alt="${recipe2.title}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                
                <div class="comparison-metric">
                    <span>Calories:</span>
                    <span class="metric-value ${metrics.calories === 2 ? 'winner' : ''}">${recipe2.calories}</span>
                </div>
                <div class="comparison-metric">
                    <span>Cooking Time:</span>
                    <span class="metric-value ${metrics.time === 2 ? 'winner' : ''}">${recipe2.readyInMinutes} min</span>
                </div>
                <div class="comparison-metric">
                    <span>Protein:</span>
                    <span class="metric-value ${metrics.protein === 2 ? 'winner' : ''}">${recipe2.protein}g</span>
                </div>
                <div class="comparison-metric">
                    <span>Rating:</span>
                    <span class="metric-value ${metrics.rating === 2 ? 'winner' : ''}">${recipe2.rating}⭐</span>
                </div>
                <div class="comparison-metric">
                    <span>Difficulty:</span>
                    <span class="metric-value">${recipe2.difficulty}</span>
                </div>
                <div class="comparison-metric">
                    <span>Servings:</span>
                    <span class="metric-value">${recipe2.servings}</span>
                </div>
            </div>
        `;
    }

    // Video Tutorial Feature
    showVideoTutorial(recipeId) {
        const recipe = window.recipeApp.mockRecipes[recipeId];
        if (!recipe) return;
        
        document.getElementById('videoTitle').textContent = `${recipe.title} - Video Tutorial`;
        document.getElementById('videoDescription').textContent = `Learn how to make ${recipe.title} with this step-by-step video tutorial.`;
        
        // Simulate video loading
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.innerHTML = `
            <div class="video-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading video tutorial...</p>
            </div>
        `;
        
        setTimeout(() => {
            videoPlayer.innerHTML = `
                <div class="video-placeholder">
                    <i class="fas fa-play-circle"></i>
                    <p>Video Tutorial: ${recipe.title}</p>
                    <small>Duration: ${Math.ceil(recipe.readyInMinutes / 2)} minutes</small>
                </div>
            `;
        }, 1500);
        
        document.getElementById('videoModal').style.display = 'block';
    }

    // Ingredient Substitution Feature
    getIngredientSubstitutions(ingredient) {
        const substitutions = {
            'butter': ['margarine', 'coconut oil', 'olive oil'],
            'milk': ['almond milk', 'soy milk', 'coconut milk'],
            'eggs': ['applesauce', 'banana', 'flax eggs'],
            'flour': ['almond flour', 'coconut flour', 'oat flour'],
            'sugar': ['honey', 'maple syrup', 'stevia'],
            'cream': ['coconut cream', 'cashew cream', 'greek yogurt']
        };
        
        const lowerIngredient = ingredient.toLowerCase();
        for (const [key, subs] of Object.entries(substitutions)) {
            if (lowerIngredient.includes(key)) {
                return subs;
            }
        }
        return [];
    }

    showIngredientSubstitutions(recipeId) {
        const recipe = window.recipeApp.mockRecipes[recipeId];
        if (!recipe) return;
        
        let substitutionsHtml = '<div class="substitutions-container"><h3>Ingredient Substitutions</h3>';
        
        recipe.ingredients.forEach(ingredient => {
            const subs = this.getIngredientSubstitutions(ingredient);
            if (subs.length > 0) {
                substitutionsHtml += `
                    <div class="substitution-item">
                        <strong>${ingredient}</strong> can be replaced with:
                        <ul>${subs.map(sub => `<li>${sub}</li>`).join('')}</ul>
                    </div>
                `;
            }
        });
        
        substitutionsHtml += '</div>';
        
        // Show in a temporary modal or notification
        const notification = document.createElement('div');
        notification.className = 'substitution-modal';
        notification.innerHTML = `
            <div class="substitution-content">
                ${substitutionsHtml}
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(notification);
    }

    // User Progress Tracking
    saveUserProgress() {
        const progress = {
            completedRecipes: Array.from(this.completedSteps),
            cookingLevel: this.calculateCookingLevel(),
            achievements: this.getAchievements(),
            lastActivity: new Date().toISOString()
        };
        localStorage.setItem('userProgress', JSON.stringify(progress));
    }

    loadUserProgress() {
        const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        this.completedSteps = new Set(progress.completedRecipes || []);
        return progress;
    }

    calculateCookingLevel() {
        const completedCount = this.completedSteps.size;
        if (completedCount < 5) return 'Beginner';
        if (completedCount < 15) return 'Intermediate';
        if (completedCount < 30) return 'Advanced';
        return 'Master Chef';
    }

    getAchievements() {
        const achievements = [];
        const completedCount = this.completedSteps.size;
        
        if (completedCount >= 1) achievements.push('First Recipe');
        if (completedCount >= 5) achievements.push('Getting Started');
        if (completedCount >= 10) achievements.push('Cooking Enthusiast');
        if (completedCount >= 20) achievements.push('Kitchen Master');
        
        return achievements;
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        this.stopCookingTimer();
    }
}

// Global functions for HTML onclick handlers
function startCookingMode(recipeId) {
    if (window.advancedFeatures) {
        window.advancedFeatures.startCookingMode(recipeId);
    }
}

function nextStep() {
    if (window.advancedFeatures) {
        window.advancedFeatures.nextStep();
    }
}

function previousStep() {
    if (window.advancedFeatures) {
        window.advancedFeatures.previousStep();
    }
}

function markStepComplete() {
    if (window.advancedFeatures) {
        window.advancedFeatures.markStepComplete();
    }
}

function toggleTimer() {
    if (window.advancedFeatures) {
        window.advancedFeatures.toggleTimer();
    }
}

function showRecipeComparison() {
    if (window.advancedFeatures) {
        window.advancedFeatures.showRecipeComparison();
    }
}

function compareRecipes() {
    if (window.advancedFeatures) {
        window.advancedFeatures.compareRecipes();
    }
}

function showVideoTutorial(recipeId) {
    if (window.advancedFeatures) {
        window.advancedFeatures.showVideoTutorial(recipeId);
    }
}

function playVideo() {
    window.recipeApp.showSuccess('▶️ Video playing...');
}

function pauseVideo() {
    window.recipeApp.showSuccess('⏸️ Video paused');
}

function restartVideo() {
    window.recipeApp.showSuccess('🔄 Video restarted');
}

function showIngredientSubstitutions(recipeId) {
    if (window.advancedFeatures) {
        window.advancedFeatures.showIngredientSubstitutions(recipeId);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.advancedFeatures = new AdvancedFeatures();
});
