import { getRecipes } from "../data";
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

const RecipeDisplay = ({ingredientToggle, directionToggle, nutritionToggle}) => {
  let recipes = getRecipes();
  return (
    <>
      <Accordion>
        {recipes.map((recipe) => (
          <Accordion.Item eventKey={recipe.id} key={recipe.id} >
            <Accordion.Header>
              {recipe.name}
              {recipe.nutrition_tags.map((tag) => (
                <div key={recipe.nutrition_tags.indexOf(tag)}>
                  <Badge pill bg="primary">{tag}</Badge>{' '}
                </div>
              ))}

            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col xs={4}>
                    <h3>{recipe.name}</h3>
                    <img src={recipe.image} alt={recipe.name} width='100%' ></img>
                  </Col>
                  <Col xs={8}>
                    {ingredientToggle ?
                      <>
                        <h4>Ingredients</h4>
                        <ol>
                          {recipe.ingredients.map((ingredient) => (
                            <li key={recipe.ingredients.indexOf(ingredient)}>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                          ))}
                        </ol>
                      </>
                      : null}
                    {directionToggle ?
                      <>
                        <h4>Directions</h4>
                        <ol>
                          {recipe.directions.map((direction) => (
                            <li key={recipe.directions.indexOf(direction)}>{direction}</li>
                          ))}
                        </ol>
                      </>
                      : null}

                    {nutritionToggle ?
                      <>
                        <h5>Nutrition Facts</h5>
                        <ul>
                          {recipe.nutrition_facts.map((fact) => (
                            <li key={recipe.nutrition_facts.indexOf(fact)}>{fact.name}: {fact.amount}{fact.unit}</li>
                          ))}
                        </ul>
                      </>
                      : null}

                  </Col>
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

    </>
  )
}

export default RecipeDisplay
