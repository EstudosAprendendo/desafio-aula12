const titulo = document.querySelector("#titulo");
const autor = document.querySelector("#autor");
const genero = document.querySelector("#genero");
const anoDePublicacao = document.querySelector("#anoDePublicacao");

const formulario = document.querySelector("#formulario");
const formulario2 = document.querySelector("#formulario2");

const pesquisar = document.querySelector("#pesquisar");
const resultado = document.querySelector("#resultado");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Compactando todas as informações do usuário em uma única variável
    const obj_livros = {
        titulo: titulo.value,
        autor: autor.value,
        genero: genero.value,
        anoDePublicacao: anoDePublicacao.value
    };

    // Exibindo as informações na tela
    const caixinha = document.createElement("div");
    caixinha.innerHTML = `
        <h2>Título: ${obj_livros.titulo}</h2>
        <p>Autor: ${obj_livros.autor}</p>
        <p>Gênero: ${obj_livros.genero}</p>
        <p>Ano de Publicação: ${obj_livros.anoDePublicacao}</p>
    `;
    resultado.appendChild(caixinha);

    // Salvar as informações no localStorage
    const lista = JSON.parse(localStorage.getItem("lista_livros")) || [];
    lista.push(obj_livros);
    localStorage.setItem("lista_livros", JSON.stringify(lista));
});

formulario2.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const pesquisa = pesquisar.value.toLowerCase();
    const lista_do_local_storage = JSON.parse(localStorage.getItem("lista_livros")) || [];
    
    const livrosFiltrados = lista_do_local_storage.filter(livro =>
        livro.titulo.toLowerCase().includes(pesquisa) ||
        livro.autor.toLowerCase().includes(pesquisa) ||
        livro.genero.toLowerCase().includes(pesquisa) ||
        livro.anoDePublicacao.toString().toLowerCase().includes(pesquisa)
    );

    exibirLivros(livrosFiltrados);
});

function exibirLivros(livros) {
    resultado.innerHTML = ''; // Limpar resultados anteriores

    if (livros.length === 0) {
        resultado.innerHTML = '<p>Nenhum livro encontrado.</p>';
        return;
    }

    livros.forEach(livro => {
        const caixinha = document.createElement("div");
        caixinha.innerHTML = `
            <h2>Título: ${livro.titulo}</h2>
            <p>Autor: ${livro.autor}</p>
            <p>Gênero: ${livro.genero}</p>
            <p>Ano de Publicação: ${livro.anoDePublicacao}</p>
        `;
        resultado.appendChild(caixinha);
    });
}

function carregarPagina() {
    const lista_do_local_storage = JSON.parse(localStorage.getItem("lista_livros")) || [];
    exibirLivros(lista_do_local_storage);
}

carregarPagina();