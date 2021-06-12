const newBtn = document.querySelector("#new-book");
const formContainer = document.querySelector("#form-container");
const display = document.querySelector("#display");
let submitBtn;
let library = [];

newBtn.addEventListener("click", createForm);


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; //? "read" : "not read yet";
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    if (!bookExists(newBook)) {
        library.push(newBook);
    }
}

function displayBooks () {
    if (display.textContent) {
        display.textContent = "";
    }

    for (let i = 0; i < library.length; i++) {
        divCard = document.createElement("div");
        divCard.setAttribute("id", `card-${i}`);
        divCard.classList.add("cards");
        h2Title = document.createElement("h2")
        h2Title.textContent = library[i].title;
        paraAuthor = document.createElement("p")
        paraAuthor.textContent = `Author: ${library[i].author}`;
        paraPages = document.createElement("p");
        paraPages.textContent = `Pages: ${library[i].pages}`;
        paraRead = document.createElement("p");
        paraRead.textContent = `Read: ${library[i].read}`;
        divCard.appendChild(h2Title);
        divCard.appendChild(paraAuthor);
        divCard.appendChild(paraPages);
        divCard.appendChild(paraRead);
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("del-buttons");
        deleteBtn.setAttribute("id", `${i}`);
        deleteBtn.textContent = "Delete";
        let changeBtn = document.createElement("button");
        changeBtn.classList.add("change-buttons");
        changeBtn.setAttribute("id", `change-${i}`);
        changeBtn.textContent = "Change Status";
        divCard.appendChild(changeBtn);
        divCard.appendChild(deleteBtn);
        display.appendChild(divCard);
    }

    changeBtns = document.querySelectorAll(".change-buttons");
    changeBtns.forEach(btn => btn.addEventListener("click", changeStatus));
    delBtns = document.querySelectorAll(".del-buttons");
    delBtns.forEach(btn => btn.addEventListener("click", deleteCard));
}

function createForm() {
    inputArray = ["title", "author", "pages"];
    formContainer.textContent = "";
    const form = document.createElement("form");
    form.setAttribute("id", "form");
    //make a loop that takes title, author, pages and append the inputs and labels to form
    for (let i = 0; i < inputArray.length; i++) {
        let titleLabel = document.createElement("label");
        let titleInput = document.createElement("input");
        titleLabel.setAttribute("for", `${inputArray[i]}`);
        titleLabel.textContent = `${inputArray[i]}`;
        titleInput.setAttribute("id", `${inputArray[i]}`);
        titleInput.setAttribute("type", "text");
        form.appendChild(titleLabel);
        form.appendChild(titleInput);
    }
    
    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.textContent = "Have you read the book?:"
    fieldset.appendChild(legend);
    
    statusArray = ["yes", "no"];
    for (let i = 0; i < statusArray.length; i++) {
        let readLabel = document.createElement("label")
        readLabel.setAttribute("for", statusArray[i]);
        readLabel.textContent = statusArray[i];
        let readInput = document.createElement("input");
        readInput.setAttribute("type", "radio");
        readInput.setAttribute("id", statusArray[i]);
        readInput.setAttribute("name", "read-status");
        readInput.setAttribute("value", statusArray[i]);
        fieldset.appendChild(readLabel);
        fieldset.appendChild(readInput);
    }
    form.appendChild(fieldset);
    submit = document.createElement("button");
    submit.setAttribute("id", "submit-button");
    submit.textContent = "SUBMIT";
    formContainer.appendChild(form);
    formContainer.appendChild(submit);

    formContainer.classList.add("container");
    submitBtn = document.querySelector("#submit-button");
    submitBtn.addEventListener("click", createArray);
}

function createArray() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let isRead = document.querySelector("input[name='read-status']:checked").value;
    if (!title) {
        return
    }
    addBookToLibrary(title, author, pages, isRead);
    formContainer.textContent = "";
    displayBooks();
}

function bookExists(book) {
    let title = library.some((books) => books.title ===book.title);
    let author = library.some((books) => books.author ===book.author);
    let pages = library.some((books) => books.pages ===book.pages);

    return title && author && pages;
}

function deleteCard(e) {
    if (library.length === 1) {
        library.pop()
    } else {
        library.splice(e.target.id, 1);
    }
    
    //cardToDelete = document.querySelector(`#card-${e.target.id}`);
    //cardToDelete.remove();
    displayBooks();
}

function changeStatus() {
    if (paraRead.textContent.includes("yes")) {
        paraRead.textContent = "Read: no";
    } else {
        paraRead.textContent = "Read: yes";
    }
}