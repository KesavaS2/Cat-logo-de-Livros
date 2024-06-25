const apiUrl = 'http://localhost:8080/livro';
const bookListElement = document.getElementById('book-list');
const filterFormElement = document.getElementById('filter-form');
const filterBtnElement = document.getElementById('filter-btn');

filterBtnElement.addEventListener('click', async (e) => {
    e.preventDefault();
    const filters = {};
    const formData = new FormData(filterFormElement);
    for (const [key, value] of formData) {
        if (value) {
            filters[key] = value;
        }
    }
    const response = await fetch(`${apiUrl}/filtrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters)
    });
    const books = await response.json();
    renderBookList(books);
});

async function renderBookList(books) {
    bookListElement.innerHTML = '';
    books.forEach((book) => {
        const bookElement = document.createElement('li');
        bookElement.textContent = `${book.title} - ${book.author}`;
        bookListElement.appendChild(bookElement);
    });
}

async function
