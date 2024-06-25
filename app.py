from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

GUTENDEX_API_URL = "https://gutendex.com/books/"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/books', methods=['GET'])
def get_books():
    params = {
        'search': request.args.get('titulo'),
        'languages': request.args.get('idioma'),
        'author': request.args.get('autor'),
        'topic': request.args.get('tema')
    }

    response = requests.get(GUTENDEX_API_URL, params=params)
    books = response.json().get('results', [])
    return jsonify(books)

@app.route('/api/books/top10', methods=['GET'])
def get_top10_books():
    # Nota: A API Gutendex não fornece uma lista de "melhores" livros, então vamos usar uma busca padrão e limitar a 10 resultados.
    response = requests.get(GUTENDEX_API_URL, params={'sort': 'popular'})
    books = response.json().get('results', [])[:10]
    return jsonify(books)

@app.route('/api/books/most_downloaded', methods=['GET'])
def get_most_downloaded_books():
    # Similar ao top10, vamos usar a API para buscar livros e ordenar por downloads.
    response = requests.get(GUTENDEX_API_URL, params={'sort': 'download'})
    books = response.json().get('results', [])[:10]
    return jsonify(books)

if __name__ == '__main__':
    app.run(debug=True)
