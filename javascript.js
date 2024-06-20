
// This is the constructor for a book object, creating variables for the title,
// author, number of pages, and whether it has been read
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (!this.read) {
            return `This book has not been read.`;
        }
        else {
            return `This book has been read.`;
        }
    }
}

// This function adds a new book to the array of book objects myLibrary
function addBookToLibrary(myLibrary, title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
}

// This function creates a new book card element to be added to the DOM and returns it
function createBookCard(newTitle, newAuthor, newPages, newRead) {
    const newBook = document.createElement("div");
    newBook.classList.add("book-card");
    const newTitleElement = document.createElement("h3");
    newTitleElement.classList.add("book-title");
    const newAuthorElement = document.createElement("h5");
    newAuthorElement.classList.add("author");
    const newPageElement = document.createElement("div");
    newPageElement.classList.add("pages");
    const newReadElement = document.createElement("div");
    newReadElement.classList.add("read");

    newTitleElement.textContent = newTitle;
    newAuthorElement.textContent = newAuthor;
    newPageElement.textContent = newPages;
    newReadElement.textContent = newRead;

    newBook.appendChild(newTitleElement);
    newBook.appendChild(newAuthorElement);
    newBook.appendChild(newPageElement);
    newBook.appendChild(newReadElement);

    return newBook;
}

function main() {
    const myLibrary = [];

    const bookContainer = document.querySelector(".container");
    const newBookButton = document.querySelector(".new-book-container");
    const newBookDialog = document.querySelector(".book-form");
    const closeBookDialog = document.querySelector("#close-button");
    const submitBookDialog = document.querySelector("#submit-button");

    const titleField = document.querySelector("#title");
    const authorField = document.querySelector("#author");
    const pagesField = document.querySelector("#number-of-pages");
    const readBox = document.querySelector("#has-read");

    // cause dialog element to show when new book button is clicked
    newBookButton.addEventListener("click", () => {
        newBookDialog.showModal();
    });

    // cause dialog element to close when close button is clicked
    closeBookDialog.addEventListener("click", () => {
        newBookDialog.close();
    });

    // make submit button for dialog element work to add a new book to the library
    submitBookDialog.addEventListener("click", (event) => {
        event.preventDefault();

        // create new variables for book properties
        let newTitle = titleField.value;
        let newAuthor = authorField.value;
        let newPages = pagesField.value;
        let newRead = readBox.checked;

        addBookToLibrary(myLibrary, newTitle, newAuthor, newPages, newRead);

        let books = document.getElementsByClassName("book-card");

        // clear previous books to loop through book array again
        while (books[0]) {
            books[0].remove();
        }

        // use for loop to loop through myLibrary array and create card for each book
        for (let i = 0; i < myLibrary.length; ++i) {
            let title = myLibrary[i].title;
            let author = myLibrary[i].author;
            let numPages = String(myLibrary[i].pages) + " pages";
            let read = myLibrary[i].info();
    
            const newBook = createBookCard(title, author, numPages, read);
    
            bookContainer.insertBefore(newBook, newBookButton);
        }

        // reset field values for new book
        titleField.value = "";
        authorField.value = "";
        pagesField.value = "";

        newBookDialog.close();
    });
}

main();