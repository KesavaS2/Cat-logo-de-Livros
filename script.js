$(document).ready(function() {
  // Função para buscar livros
  function buscarLivros(titulo, idioma) {
    $.ajax({
      type: "GET",
      url: "api/livros.php",
      data: { titulo: titulo, idioma: idioma },
      dataType: "json",
      success: function(data) {
        $("#lista-livros").empty();
        $.each(data, function(index, livro) {
          $("#lista-livros").append("<li>" + livro.titulo + " - " + livro.autor + " (" + livro.idioma + ") - " + livro.downloads + " downloads</li>");
        });
      }
    });
  }

  // Buscar livros quando o usuário digita algo no campo de busca
  $("#busca
