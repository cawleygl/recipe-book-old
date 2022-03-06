import RecipeDisplay from "../components/RecipeDisplay";


const LandingPage = () => {
  return (
    <RecipeDisplay
      ingredientToggle={true}
      directionToggle={true}
      nutritionToggle={true}
    />
  )
}

export default LandingPage
