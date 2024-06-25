// scripts.js

document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.getElementById('searchButton');
  const filterButton = document.getElementById('filterButton');
  const booksContainer = document.getElementById('booksContainer');

  const apiUrl = 'https://gutendex.com/books/';

  async function searchBooks(title) {
    try {
      const response = await fetch(`${apiUrl}?search=${title}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function filterBooks(filters) {
    try {
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
    } catch (error) {
      console.error(error);
      return [];
    }
  }

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

  searchButton.addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') {
      alert('Por favor, digite um título de livro');
      return;
    }
    const books = await searchBooks(searchInput
