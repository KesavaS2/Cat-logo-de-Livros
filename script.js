document.addEventListener('DOMContentLoaded', function() {
    // Simulação de dados de livros e autores
    const livros = [
        { titulo: 'Dom Casmurro', autor: 'Machado de Assis', idioma: 'Português', downloads: 1000 },
        { titulo: 'Emma', autor: 'Jane Alston', idioma: 'Inglês', downloads: 800 },
        // Adicione mais livros conforme necessário
    ];

    const autores = [
        { nome: 'Machado de Assis', nascimento: 1839, falecimento: 1908 },
        { nome: 'Jane Alston', nascimento: 1975, falecimento: null },
        // Adicione mais autores conforme necessário
    ];

    // Função para exibir livros
    function exibirLivros() {
        const livrosSection = document.getElementById('livros');
        livrosSection.innerHTML = '';
        livros.forEach(livro => {
            const livroDiv = document.createElement('div');
            livroDiv.innerHTML = `
                <h2>${livro.titulo}</h2>
                <p>Autor: ${livro.autor}</p>
                <p>Idioma: ${livro.idioma}</p>
                <p>Downloads: ${livro.downloads}</p>
            `;
            livrosSection.appendChild(livroDiv);
        });
    }

    // Função para exibir autores
    function exibirAutores() {
        const autoresSection = document.getElementById('autores');
        autoresSection.innerHTML = '';
        autores.forEach(autor => {
            const autorDiv = document.createElement('div');
            autorDiv.innerHTML = `
                <h2>${autor.nome}</h2>
                <p>Ano de Nascimento: ${autor.nascimento}</p>
                <p>Ano de Falecimento: ${autor.falecimento ? autor.falecimento : 'Vivo'}</p>
            `;
            autoresSection.appendChild(autorDiv);
        });
    }

    // Chamada inicial para exibir livros e autores
    exibirLivros();
    exibirAutores();
});
