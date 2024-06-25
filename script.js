document.getElementById('search').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const language = document.getElementById('language').value;

    fetchBooks({ title, author, year, language });
});

document.getElementById('topRated').addEventListener('click', () => {
    fetchBooks({ sortBy: 'rating', limit: 10 });
});

document.getElementById('mostDownloaded').addEventListener('click', () => {
    fetchBooks({ sortBy: 'downloads', limit: 10 });
});

async function fetchBooks(filters) {
    let url = 'https://gutendex.com/books/?page=2';
    if (filters.title) url += `title=${filters.title}&`;
    if (filters.author) url += `author=${filters.author}&`;
    if (filters.year) url += `year=${filters.year}&`;
    if (filters.language) url += `language=${filters.language}&`;
    if (filters.sortBy) url += `sortBy=${filters.sortBy}&`;
    if (filters.limit) url += `limit=${filters.limit}&`;

    const response = await fetch(url);
    const books = await response.json();
    displayBooks(books);
}

function displayBooks(books) {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        
        bookElement.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.year}</p>
            <p>${book.language}</p>
        `;
        
        booksContainer.appendChild(bookElement);
    });
}
