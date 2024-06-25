const apiUrl = 'https://gutendex.com/books';

async function fetchBooks() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
}

function renderBookList(books) {
    const bookListElement = document.getElementById('book-list');
    bookListElement.innerHTML = '';
    books.forEach((book) => {
        const bookElement = document.createElement('li');
        bookElement.textContent = `${book.title} - ${book.authors[0].name}`;
        bookListElement.appendChild(bookElement);
    });
}

document.getElementById('filter-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const filters = new FormData(filterForm);
    const books = await fetchBooks(filters);
    renderBookList(books);
});

const filterForm = document.querySelector('filter-form');
