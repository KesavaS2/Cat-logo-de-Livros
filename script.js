function buscarLivros() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const idioma = document.getElementById('idioma').value;

    let url = `https://gutendex.com/books`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let livrosLista = document.getElementById('livros-lista');
            livrosLista.innerHTML = '';
            data.forEach(livro => {
                let div = document.createElement('div');
                div.innerHTML = `<strong>Título:</strong> ${livro.title} <br>
                                 <strong>Autor:</strong> ${livro.authors.map(a => a.name).join(', ')} <br>
                                 <strong>Idioma:</strong> ${livro.languages.join(', ')} <br>
                                 <strong>Download:</strong> <a href="${livro.formats['text/html']}">Link</a> <br>`;
                livrosLista.appendChild(div);
            });
        });
}

function carregarTop10Livros() {
    fetch('/api/books/top10')
        .then(response => response.json())
        .then(data => {
            let top10Livros = document.getElementById('top10-livros');
            top10Livros.innerHTML = '';
            data.forEach(livro => {
                let div = document.createElement('div');
                div.innerHTML = `<strong>Título:</strong> ${livro.title} <br>
                                 <strong>Autor:</strong> ${livro.authors.map(a => a.name).join(', ')} <br>
                                 <strong>Idioma:</strong> ${livro.languages.join(', ')} <br>
                                 <strong>Download:</strong> <a href="${livro.formats['text/html']}">Link</a> <br>`;
                top10Livros.appendChild(div);
            });
        });
}

function carregarMaisBaixadosLivros() {
    fetch('/api/books/most_downloaded')
        .then(response => response.json())
        .then(data => {
            let maisBaixadosLivros = document.getElementById('mais-baixados-livros');
            maisBaixadosLivros.innerHTML = '';
            data.forEach(livro => {
                let div = document.createElement('div');
                div.innerHTML = `<strong>Título:</strong> ${livro.title} <br>
                                 <strong>Autor:</strong> ${livro.authors.map(a => a.name).join(', ')} <br>
                                 <strong>Idioma:</strong> ${livro.languages.join(', ')} <br>
                                 <strong>Download:</strong> <a href="${livro.formats['text/html']}">Link</a> <br>`;
                maisBaixadosLivros.appendChild(div);
            });
        });
}

document.addEventListener('DOMContentLoaded', function() {
    carregarTop10Livros();
    carregarMaisBaixadosLivros();
});
