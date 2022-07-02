import React, { useState, useEffect } from 'react'
import { omit } from 'lodash'

import API from "../utils/API";

const useForm = (callback) => {
  let log = false;
  // Form Values
  // State
  const [values, setValues] = useState({
    recipeName: "",
    source: "",
    description: "",
    img: { preview: "", data: null },
    ingredients: [{ ingredientAmount: "", ingredientUnit: "", ingredientName: "", ingredientModifier: "" }],
    directions: [""],
    tags: [],
    notes: ""
  });
  //Touched Booleans
  // State
  const [touched, setTouched] = useState({
    description: false,
    directions: false,
    ingredientName: false,
    recipeName: false,
    source: false
  });
  // Submit Form Errors
  // Message Constants
  const errorMessages = {
    description: "Description is required",
    directions: "At least one direction is required",
    ingredientName: "At least one ingredient is required",
    recipeName: "Recipe Name is required",
    source: "Source is required"
  }
  // State
  const [errors, setErrors] = useState({
    description: errorMessages.description,
    directions: errorMessages.directions,
    ingredientName: errorMessages.ingredientName,
    recipeName: errorMessages.recipeName,
    source: errorMessages.source
  });
  useEffect(() => {
    console.log("ERORRS", errors);
  }, [errors])

  // Add Empty Field popover booleans
  // State
  const [addErrors, setAddErrors] = useState({
    directions: false,
    ingredients: false
  });

  // Currently activated item in directions and ingredients
  const [currentStep, setCurrentStep] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);

  // Load tags
  const [loadedTags, setLoadedTags] = useState([]);
  useEffect(() => {
    async function initalLoadTags() {
      try {
        let tagsRes = await API.getTags()

        // add selectedState boolean (set to false)
        tagsRes.data.forEach(tag => tag.selectedState = false);
        log && console.log("Loaded Tags:", tagsRes);

        // Set to loaded tags state variable
        setLoadedTags(tagsRes.data);

      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
    initalLoadTags();
  }, [])

  const addToErrors = (name) => {
    // we will set the error state
    let nameObj = { ...errors };
    let key = name;
    nameObj[key] = errorMessages[name];
    setErrors(nameObj);
  };

  const removeFromErrors = (name) => {
    // set the error state empty or remove the error for name input
    //omit function removes/omits the value from given object and returns a new object
    let newObj = omit(errors, name);
    setErrors(newObj);
  };

  const touchedField = (name) => {
    // Set touched field to false on any onChange update
    let nameObj = { ...touched };
    let key = name;
    nameObj[key] = true;
    setTouched(nameObj);
  };

  const validateField = (name, value) => {
    //A function to validate each input values
    switch (name) {
      case 'recipeName': case 'source': case 'description':
        if (!value) addToErrors(name);
        else removeFromErrors(name);
        break;
      case 'ingredientAmount': case 'ingredientUnit': case 'ingredientModifier':
        removeFromErrors('ingredientName');
        break;
      case 'ingredientName':
        if (!value && values.ingredients.length <= 1) addToErrors(name);
        else removeFromErrors(name);
        break;
      case 'directions':
        if (!value && values.directions.length <= 1) addToErrors(name);
        else removeFromErrors(name);
        break;
      case 'notes': case 'tag': case 'imgLink': case 'imgUpload':
        log && console.log(`Field: ${name} not validated`);
        break;
      default:
        console.error(`Name not recognized - validateField`, name)
        break;
    }
  };

  // show popover when user tries to add an empty field
  const showEmptyItemPopover = (name) => {
    let addErrorsObj = { ...addErrors };
    let key = name;
    addErrorsObj[key] = true;
    setAddErrors(addErrorsObj)
  };

  //A method to handle popover toggling
  const handleToggle = (event, name) => {
    let addErrorsObj = { ...addErrors };
    let key = name;
    addErrorsObj[key] = false;
    setAddErrors(addErrorsObj)
  };

  // A method to add an item to form inputs stored in arrays
  const handleAdd = (event) => {
    //To stop default events    
    event.persist();
    // Name value - 'directions' or 'ingredients'
    let name;
    // Use input group (parent of text fields) name value on enter key press
    if (event.target.type === 'textarea' || event.target.type === 'text') {
      name = event.target.closest('.input-group').dataset.name;
      // use closest button name (in case icon is clicked) on button click
    } else {
      name = event.target.closest('button').name;
    }
    let submittingItem = values[name][values[name].length - 1];

    // Destructure values
    let arrayvalue = [...values[name]];

    // Push empty item to array (string for directions, object for ingredients)
    switch (name) {
      case 'directions':
        // return if current direction is empty
        if (!submittingItem) {
          showEmptyItemPopover(name);
          return;
        }
        // Add empty item
        arrayvalue.push("");
        // change current step to last step
        setCurrentStep(arrayvalue.length - 1);
        break;
      case 'ingredients':
        // return if current ingredient name is empty
        if (!submittingItem.ingredientName) {
          showEmptyItemPopover(name);
          return;
        }
        // Add empty item
        arrayvalue.push({ ingredientAmount: "", ingredientUnit: "", ingredientName: "", ingredientModifier: "" });
        // change current step to last step
        setCurrentItem(arrayvalue.length - 1);
        break;
      default:
        console.error(`Name not recognized - handleAdd`, name)
        break;
    }

    let valuesObj = { ...values };
    valuesObj[name] = arrayvalue;
    setValues(valuesObj)
  };

  // A method to delete an item from form inputs stored in arrays
  const handleDelete = (event) => {
    event.stopPropagation();
    const name = event.target.closest('tbody').dataset.name;
    const index = event.target.closest('button').dataset.index;

    // Do not delete last step, only clear
    if (values[name].length <= 1) {
      let valuesObj = { ...values };
      switch (name) {
        case 'directions':
          valuesObj[name] = [""];
          break;
        case 'ingredients':
          valuesObj[name] = [{ ingredientAmount: "", ingredientUnit: "", ingredientName: "", ingredientModifier: "" }];
          break;
        default:
          console.error(`Name not recognized - handleDelete`, name)
          break;
      }
      setValues(valuesObj);
      return;
    }

    // Destructure values
    let arrayvalue = [...values[name]];
    // Remove value at index
    arrayvalue.splice(index, 1);

    switch (name) {
      case 'directions':
        setCurrentStep(arrayvalue.length - 1);
        break;
      case 'ingredients':
        setCurrentItem(arrayvalue.length - 1);
        break;
      default:
        console.error(`Name not recognized - handleDelete`, name)
        break;
    }

    // Set array in state
    let valuesObj = { ...values };
    valuesObj[name] = arrayvalue;
    setValues(valuesObj)

  };

  const handleSubmit = (event) => {
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback();
    } else {
      event.preventDefault();
      // Alert user with error messages
      let errorMessages = Object.values(errors);
      errorMessages.map(errorMessage => alert(errorMessage));
      // Set touched values to true to show errors
      setTouched({
        description: true,
        directions: true,
        ingredientName: true,
        recipeName: true,
        source: true
      });
    }
  };

  const handleSelect = (event) => {
    const name = event.target.closest('tbody').dataset.name;
    const index = event.target.closest('tr').dataset.index;

    switch (name) {
      case 'directions':
        setCurrentStep(parseInt(index));
        break;
      case 'ingredients':
        setCurrentItem(parseInt(index));
        break;
      default:
        console.error(`Name not recognized - handleSelect`, name)
        break;
    }
  };

  const setIngredientValue = (name, value) => {
    let { ingredients } = values;
    let itemObject = ingredients[currentItem];
    itemObject[name] = value;
    let valuesObj = { ...values };
    valuesObj['ingredients'][currentItem] = itemObject;
    setValues(valuesObj)
  };

  const setDirectionValue = (name, value) => {
    let { directions } = values;
    directions[currentStep] = value;
    let valuesObj = { ...values };
    valuesObj[name] = directions;
    setValues(valuesObj)
  };

  const setTagValue = (name, value) => {
    let selectedTagsArray = [...values.tags];
    let loadedTagsArray = [...loadedTags];
    let checkedTag = loadedTagsArray.find(tag => tag._id === value);
    let index = loadedTagsArray.indexOf(checkedTag);

    // Check, adding ID to array
    if (checkedTag.selectedState === false) {
      // Push ID from checked tag to selectedTags array
      selectedTagsArray.push(checkedTag._id)
      setValues({
        ...values,
        tags: selectedTagsArray,
      });

      // Change its boolean value of checked tag in loadedTags array
      loadedTagsArray[index].selectedState = true;

      // Uncheck, removing ID from array
    } else {
      // Filter selected ID from selectedTags array
      let filteredArray = selectedTagsArray.filter(tagId => tagId !== value);
      setValues({
        ...values,
        tags: filteredArray,
      });

      // Change its boolean value of checked tag in All Tags array
      loadedTagsArray[index].selectedState = false;
    };
  };


  const updateValue = (name, value, files) => {
    //A function to properly add input values to the values object
    switch (name) {
      case 'recipeName': case 'source': case 'description': case 'notes':
        setValues({
          ...values,
          [name]: value,
        });
        break;
      case 'directions':
        setDirectionValue(name, value);
        break;
      case 'ingredientName': case 'ingredientUnit': case 'ingredientAmount': case 'ingredientModifier':
        setIngredientValue(name, value);
        break;
      case 'imgLink':
        setValues({
          ...values,
          img: { preview: value, data: null },
        });
        break;
      case 'imgUpload':
        setValues({
          ...values,
          img: { preview: URL.createObjectURL(files), data: files },
        });
        break;
      case 'tag':
        setTagValue(name, value);
        break;
      default:
        log && console.log(`Field: ${name} not updated`);
        break;
    }
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events    
    event.persist();

    let name = event.target.name;
    let val = event.target.value;
    let files = event.target.files ? event.target.files[0] : null;

    log && console.log("Name", name);
    log && console.log("Value", val);
    log && console.log("Files", files);

    // Set touched value to true
    touchedField(name);

    // Validate and add errors as needed
    validateField(name, val);

    // Set values in state
    updateValue(name, val, files);

  };

  return {
    values,
    errors,
    touched,
    currentStep,
    currentItem,
    addErrors,
    loadedTags,
    handleChange,
    handleSubmit,
    handleSelect,
    handleAdd,
    handleDelete,
    handleToggle
  };
}

export default useForm