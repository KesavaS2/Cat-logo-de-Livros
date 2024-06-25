const apiUrl = 'https://gutendex.com/books/';
constbookList = document.getElementById('book-list');
const filters = document.querySelector('.filters');
const bestBooksButton = document.getElementById('best-books');
const mostDownloadedButton = document.getElementById('most-downloaded');

filters.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const author = document.getElementById('author').value;
    const language = document.getElementById('language').value;
    fetchBooks(title, year, author, language);
});

bestBooksButton.addEventListener('click', () => {
    fetchBooks(null, null, null, null, 'rating');
});

mostDownloadedButton.addEventListener('click', () => {
    fetchBooks(null, null, null, null, 'downloads');
});

function fetchBooks(title, year, author, language, sort) {
    let url = apiUrl;
    if (title) {
        url += `title=${title}&`;
    }
    if (year) {
        url += `year=${year}&`;
    }
    if (author) {
        url += `author=${author}&`;
    }
    if (language) {
        url += `language=${language}&`;
    }
    if (sort) {
        url += `sort=${sort}&`;
    }
    url += `page=1`;
    fetch(url)
       .then(response => response.json())
       .then(data => {
            bookList.innerHTML = '';
            data.results.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <img src="${book.formats['image/jpeg']}">
                    <span>${book.title}</span>
                    <span>by ${book.authors[0].name}</span>
                    <span>(${book.language})</span>
                `;
                bookList.appendChild(li);
            });
        })
       .catch(error => console.error(error));
}
