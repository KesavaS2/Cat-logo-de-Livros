document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const filterButton = document.getElementById('filterButton');
    const booksContainer = document.getElementById('booksContainer');

    // URL base da API
    const apiUrl = 'https://gutendex.com/books/';

    // Função para buscar livros pelo título
    async function searchBooks(title) {
        const response = await fetch(`${apiUrl}?search=${title}`);
        const data = await response.json();
        return data.results;
    }

    // Função para exibir os livros na página
    function displayBooks(books) {
        booksContainer.innerHTML = '';
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Autor:</strong> ${book.authors.length ? book.authors[0].name : 'Desconhecido'}</p>
                <p><strong>Idioma:</strong> ${book.languages.length ? book.languages[0] : 'Desconhecido'}</p>
                <p><strong>Downloads:</strong> ${book.download_count}</p>
            `;
            booksContainer.appendChild(bookElement);
        });
    }

    // Evento para buscar livros pelo título
    searchButton.addEventListener('click', async () => {
        const searchInput = document.getElementById('searchInput').value;
        const books = await searchBooks(searchInput);
        displayBooks(books);
    });

    // Função para buscar livros com filtros
    async function filterBooks(filters) {
        const { author, language, genre } = filters;
        let query = '';

        if (author) {
            query += `&author=${author}`;
        }
        if (language) {
            query += `&languages=${language}`;
        }
        if (genre) {
            query += `&topic=${genre}`;
        }

        const response = await fetch(`${apiUrl}?${query}`);
        const data = await response.json();
        return data.results;
    }

    // Evento para filtrar livros
    filterButton.addEventListener('click', async () => {
        const filterAutor = document.getElementById('filterAutor').value;
        const filterIdioma = document.getElementById('filterIdioma').value;
        const filterGenero = document.getElementById('filterGenero').value;
        const filters = {
            author: filterAutor,
            language: filterIdioma,
            genre: filterGenero,
        };
        const books = await filterBooks(filters);
        displayBooks(books);
    });
});
