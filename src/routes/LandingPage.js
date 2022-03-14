import RecipeDisplay from "../components/RecipeDisplay";
import { getRecipes } from "../data";

let recipes = getRecipes();

const LandingPage = () => {
  return (
    <RecipeDisplay
      recipes={recipes}
      ingredientToggle={true}
      directionToggle={true}
      nutritionToggle={true}
    />
  )
}

export default LandingPage
