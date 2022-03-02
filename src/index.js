const data = [
  { name: "Bob", age: 32, gender: "male", isStudent: false },
  { name: "Alice", age: 30, gender: "female", isStudent: false },
  { name: "Philip", age: 22, gender: "male", isStudent: true },
  { name: "Sam", age: 24, gender: "male", isStudent: true },
  { name: "Anna", age: 28, gender: "female", isStudent: false },
];

render();

// Task 1: Display the name of the youngest person

// Task 2: Display the average age in months

// Task 3: Display a list of names of all people
// (e.g "Bob, Alice, Philip, Sam, Anna")

// Task 4: Allow editing the data on the html page.
// (Adding/Removing new rows is not required)
function changeHandler(event, index) {
  const { name, value } = event.target;
  data[index][name] = value;
  render();
}
function render() {
  const container = document.getElementById("form-container");
  const person = document.getElementById("youngest-person"),
    average = document.getElementById("average-age"),
    people = document.getElementById("people-list");
  // Clear previous contents of the container
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  let yPerson = { age: 0, name: "" },
    avg = 0,
    peopleList = "";

  data.forEach(({ age, name, ...rest }, index) => {
    addNameInput(index);
    addAgeInput(index);
    addGenderSelect(index);
    addIsStudentCheckbox(index);
    addLineBreak();
    avg += Number(age);
    if (yPerson.age === 0) yPerson = { age, name, ...rest };
    if (age < yPerson.age) yPerson = { age, name, ...rest };

    if (data.length === index + 1) peopleList += name;
    else peopleList += `${name}, `;
  });
  const averageAgeInMonths = Number(avg) / data.length;
  if (person && average && people) {
    person.innerHTML = yPerson.name;
    average.innerHTML = Math.round(averageAgeInMonths * 12) + " months";
    people.innerHTML = peopleList;
  }
}

function addNameInput(index) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = data[index].name;
  input.name = "name";
  input.onchange = (e) => changeHandler(e, index);
  addFormElement(input);
}

function addAgeInput(index) {
  const input = document.createElement("input");
  input.type = "number";
  input.name = "age";
  input.value = data[index].age;
  input.onchange = (e) => changeHandler(e, index);
  addFormElement(input);
}

function addGenderSelect(index) {
  const input = document.createElement("select");
  input.value = data[index].gender;
  input.onchange = (e) => changeHandler(e, index);

  for (const gender of ["male", "female"]) {
    const option = document.createElement("option");
    option.value = gender;
    option.text = gender;
    input.name = "gender";
    option.selected = gender === data[index].gender;
    input.appendChild(option);
  }
  addFormElement(input);
}

function addIsStudentCheckbox(index) {
  const element = document.createElement("input");
  element.type = "checkbox";
  element.checked = data[index].isStudent;
  element.name = "isStudent";
  element.onchange = () => console.log(`isStudent changed`);
  addFormElement(element);
}

function addLineBreak() {
  const element = document.createElement("br");
  addFormElement(element);
}

function addFormElement(element) {
  const container = document.getElementById("form-container");
  container.appendChild(element);
}
