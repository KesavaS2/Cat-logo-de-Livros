// Função para buscar livro por título na API Gutendex
async function buscarLivro() {
    const titulo = document.getElementById('titulo').value;
    const response = await fetch(`https://gutendex.com/books/?search=${titulo}`);
    const data = await response.json();
    const livros = data.results;

    exibirLivros(livros);
    exibirAutores(livros);
}

// Função para exibir livros
function exibirLivros(livros) {
    const livrosSection = document.getElementById('livros');
    livrosSection.innerHTML = '';
    livros.forEach(livro => {
        const livroDiv = document.createElement('div');
        livroDiv.innerHTML = `
            <h3>${livro.title}</h3>
            <p>Autor: ${livro.authors.length > 0 ? livro.authors[0].name : 'Desconhecido'}</p>
            <p>Idioma: ${livro.languages.length > 0 ? livro.languages[0] : 'Desconhecido'}</p>
            <p>Downloads: ${livro.download_count}</p>
        `;
        livrosSection.appendChild(livroDiv);
    });
}

// Função para exibir autores
function exibirAutores(livros) {
    const autoresSection = document.getElementById('autores');
    autoresSection.innerHTML = '';
    const autoresMap = new Map();

    livros.forEach(livro => {
        if (livro.authors.length > 0) {
            const autor = livro.authors[0];
            if (!autoresMap.has(autor.name)) {
                autoresMap.set(autor.name, autor);
            }
        }
    });

    autoresMap.forEach((autor, nome) => {
        const autorDiv = document.createElement('div');
        autorDiv.innerHTML = `
            <h3>${autor.name}</h3>
            <p>Ano de Nascimento: ${autor.birth_year ? autor.birth_year : 'Desconhecido'}</p>
            <p>Ano de Falecimento: ${autor.death_year ? autor.death_year : 'Desconhecido'}</p>
        `;
        autoresSection.appendChild(autorDiv);
    });
}
