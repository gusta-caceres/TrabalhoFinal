const BASE_URL = `http://localhost:1337`;

async function carregarDados(colecao) {
    const resposta = await fetch(BASE_URL + colecao);
    const dados = await resposta.json();
    return dados;
}

async function buscarLanches() {
    const lanches = await carregarDados("/products")
    return lanches;
    
}

async function buscarAperitivos() {
    const aperitivos = await carregarDados("/flavors")
    return aperitivos;
    
}

async function buscarLanchesPromocao(chave, valor) {
    const lanchesPromo = await carregarDados(`/products?${chave}=${valor}`)
    return lanchesPromo;
}

async function incluirLanchesPromocao() {
  const lanches = await buscarLanchesPromocao("promotion", "true"),
  containerPromocao = document.querySelector(".featured__container");
  for(const lanche of lanches){
      const { name, price, image} = lanche,
      preco = price.toLocaleString("pt-br", { style: "currency", currency: "BRL"})
      containerPromocao.innerHTML +=`
      <article class="juice">
          
          <img src="${BASE_URL}${image.url}" alt="" class="juice__img" />
          <span class="juice__name">${name}</span>
          <span class="juice__price">${preco}</span>
          <a href="#" class="button-light"
            >Adicionar ao carrinho <i class="bx bx-right-arrow-alt button-icon"></i
          ></a>
        </article>
      `
  }
}

async function incluirTiposAperitivos() {
    const aperitivos = await buscarAperitivos(),
    containerAperitivos = document.querySelector(".tropicais__container");
    for(const aperitivo of aperitivos){
        const { name } = aperitivo
        containerAperitivos.innerHTML +=`
        <article class="juice">
            <span class="juice__name">${name}</span>
            <a href="#" class="button-light">
              Veja todos
              <i class="bx bx-right-arrow-alt button-icon"></i>
            </a>
          </article>
        `
    }
}
async function incluirLanches(){
  const lanches = await buscarLanches(),
  containerLanches = document.querySelector(".featured__containerr");
  for(const lanche of lanches){
      const { name, price, image} = lanche,
      preco = price.toLocaleString("pt-br", { style: "currency", currency: "BRL"})
      containerLanches.innerHTML +=`
      <article class="juice">
          <img src="${BASE_URL}${image.url}" alt="" class="juice__img" />
          <span class="juice__name">${name}</span>
          <span class="juice__price">${preco}</span>
          <a href="#" class="button-light"
            >Adicionar ao carrinho <i class="bx bx-right-arrow-alt button-icon"></i
          ></a>
        </article>
      `
  }
}
incluirLanchesPromocao();
incluirTiposAperitivos();
incluirLanches();