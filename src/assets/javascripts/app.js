const ul = document.querySelector(".post");
const form = document.querySelector("form");
const input = document.querySelectorAll(".data");
let filterValue;
let filterMode = false;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input[0].value;
  const number = input[1].value;
  const categorie = input[2].value;

  input.forEach((element) => {
    element.value = "";
  });

  addBlog(value, number, categorie);
  displayBlog();
});

const todos = [
  {
    text: "je suis un blog",
    editMode: false,
    number: "0400000000",
    categorie: "blue",
  },
  {
    text: "ok test salut commet ca va ?",
    editMode: false,
    number: "0400000000",
    categorie: "blue",
  },
];

const displayBlog = () => {
  const totosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createBlogEditElement(todo, index);
    } else {
      return CreateBlogElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...totosNode);
};

const CreateBlog = (todo, index) => {
  const li = document.createElement("li");
  li.classList.add("post__el");
  const div = document.createElement("div");
  const buttonDelete = document.createElement("button");

  buttonDelete.classList.add("button-modif");

  const buttonEdit = document.createElement("button");

  buttonEdit.classList.add("button-modif");

  buttonDelete.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteBlog(index);
  });

  buttonEdit.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });

  li.innerHTML = `
    <div>
    <p>${todo.text}</p>
    <p>${todo.number}</p>
    </div>

    `;
  switch (todo.categorie) {
    case "blue":
      li.style.background = "var(--color-blue)";
      break;
    case "red":
      li.style.background = "var(--color-red)";
      break;
    case "green":
      li.style.background = "var(--color-green)";
      break;
  }

  div.append(buttonEdit, buttonDelete);
  li.append(div);

  return li;
};
const CreateBlogElement = (todo, index) => {
  if (filterMode === true) {
    if (todo.categorie === filterValue) {
      return CreateBlog(todo, index);
    } else {
      return "";
    }
  } else {
    return CreateBlog(todo, index);
  }
};

let displayCategorie = true;
const addBlog = (text, number, categorie) => {
  todos.push({
    text,
    number,
    categorie,
  });
};

const deleteBlog = (index) => {
  todos.splice(index, 1);
  displayBlog();
};

const createBlogEditElement = (todo, index) => {
  const li = document.createElement("li");
  li.classList.add("post__el");
  li.classList.add("post__el--edit");

  const div = document.createElement("div");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.value = todo.text;

  const inputNumber = document.createElement("input");
  inputNumber.type = "number";
  inputNumber.value = todo.number;

  const inputSelect = document.createElement("select");
  inputSelect.innerHTML = `
    <option value="blue">blue</option>
    <option value="red">red</option>
    <option value="green">green</option>
 `;

  const divb = document.createElement("div");
  divb.classList.add("buttonEditContent");
  const buttonSave = document.createElement("button");
  buttonSave.innerText = "save";
  const buttonCancel = document.createElement("button");
  buttonCancel.innerText = "cancel";

  buttonCancel.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  buttonSave.addEventListener("click", (event) => {
    editBlog(index, inputText, inputNumber, inputSelect);
  });

  divb.append(buttonCancel, buttonSave);
  div.append(inputText, inputNumber, inputSelect);
  li.append(div, divb);
  return li;
};

const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode;
  displayBlog();
};

const editBlog = (index, inputText, inputNumber, inputSelect) => {
  todos[index].text = inputText.value;
  todos[index].number = inputNumber.value;
  todos[index].categorie = inputSelect.value;
  todos[index].filter = true;

  todos[index].editMode = false;
  displayBlog();
};

const buttonFilter = document.querySelectorAll(".buttonFilter");

for (let i = 0; i < buttonFilter.length; i++) {
  buttonFilter[i].addEventListener("click", (e) => {
    filterMode = true;
    filterValue = buttonFilter[i].innerText;
    displayBlog();
  });
}

const buttonFIlterRemove = document
  .querySelector(".buttonFIlterRemove")
  .addEventListener("click", (e) => {
    filterMode = false;

    displayBlog();
  });

displayBlog();
