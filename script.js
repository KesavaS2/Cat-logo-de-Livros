// API endpoint and key
const apiEndpoint = "https://api.isbndb.com/v2/books";
const apiKey = "YOUR_API_KEY";

// Function to search for books
function searchBooks(title, author, genre, year) {
    const params = {};
    if (title) {
        params.title = title;
    }
    if (author) {
        params.author = author;
    }
    if (genre) {
        params.genre = genre;
    }
    if (year) {
        params.year = year;
    }
    fetch(`${apiEndpoint}?${new URLSearchParams(params)}`, {
        headers: {
            "Authorization": `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const bookList = data.books;
        const display = new Display();
        display.add(bookList);
    })
    .catch(error => console.error(error));
}

// Function to delete a book entry
function deleteItem(index) {
    const listItems = localStorage.getItem("listItems");
    if (listItems == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(listItems);
    }
    listArray.splice(index, 1);
    localStorage.setItem("listItems", JSON.stringify(listArray));
    showList();
}

// Function to show the book list
function showList() {
    const listItems = localStorage.getItem("listItems");
    if (listItems == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(listItems);
    }
    const display = new Display();
    display.add(listArray);
}

// Event listener for form submit
const form = document.getElementById("mylibraryform");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const year = document.getElementById("year").value;
    searchBooks(title, author, genre, year);
});

// Initialize the book list
showList();
