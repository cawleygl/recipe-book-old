import { getRecipes } from "../data";
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import placeholder from '../assets/logo512.png'


const RecipeDisplay = ({ recipes, ingredientToggle, directionToggle }) => {
  return (
    <>
      <Accordion alwaysOpen={true}>
        {recipes.map((recipe) => (
          <Accordion.Item eventKey={recipe.id} key={recipe.id} >
            <Accordion.Header>
              {recipe.name}
              {recipe.tags.map((tag) => (
                <div key={recipe.tags.indexOf(tag)}>
                  <Badge pill bg="primary">{tag}</Badge>{' '}
                </div>
              ))}

            </Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col xs={12}>
                    <h3>{recipe.name}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}>
                    <img src={recipe.image ? recipe.image : placeholder} alt={recipe.name} width='100%' ></img>
                  </Col>
                  <Col xs={10}>
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
