<template>
  <div>
    <header id="botao-superior">
      
      <button id="btnNoovo" type="button" class="btn btn-success" @click="$root.$emit('open-ModalNovo')" >+ Novo</button>
      <button id="btnExcluir" type="button" class="btn btn-danger" @click="DeleteTodosProdutos()">Excluir Todos</button>
      <ModalNovo></ModalNovo>
     
     
    </header>

    <div class="gerenciar_produto">
      <h4>Gerenciar Produto</h4>
       <input class="InputP" type="text" placeholder="Pesquisar nome do produto"/>
        <button type="button" class="btn btn-primary" >Pesquisar</button>
     
      <div class="custom-table-responsive coolTable" id="checkboxes">
        <table v-if="produtos.length > 0" class="table custom-table">
          <thead>
            <tr>
              <th scope="col">SELECT</th>
              <th scope="col">CÓDIGO  
                <button  @click="ordernarCodigo"><i class="gg-arrows-exchange-alt-v"></i></button>
                </th>
              <th scope="col">NOME
                 <button  @click="ordernarNome"><i class="gg-arrows-exchange-alt-v"></i></button>
              </th>
              <th scope="col">PREÇO
                 <button  @click="ordernarPreco"><i class="gg-arrows-exchange-alt-v"></i></button>
              </th>
              <th scope="col">CATEGORIA
                 <button  @click="ordernarCategoria"><i class="gg-arrows-exchange-alt-v"></i></button>
              </th>
              <th scope="col">STATUS
                 <button  @click="ordernarStatus"><i class="gg-arrows-exchange-alt-v"></i></button>
              </th>
              <th scope="col">OPÇÕES</th>
            </tr>
          </thead>

          <tbody>
            <tr  v-for="produto of produtos" :key="produto.id" cope="row">
               <td class="center">
               <label class="control control--checkbox">
                <input type="checkbox" v-model="apagarProdutos" :value="produto.id">
                <div class="control__indicator"></div>
                </label>
              </td>

              <td>{{produto.codigo}}</td>
              <td>{{produto.nome}}</td>
              <td>{{produto.preco}}</td>
              <td>{{produto.categoria}}</td>
               <td>{{produto.status}}</td>
               <td>
              <button type="button"  class="btn btn-info">Editar</button>
              <button id="btnExcluir" @click="deleteById(produto)" type="button" class="btn btn-warning">Excluir</button>
          
            </td>
            
            </tr>
          </tbody>

          
        </table >

        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import ModalNovo from './components/ModalNovo.vue';
import Produtos from "./services/Produtos";

export default {
  components: { ModalNovo},
  data() {
    return {
      produtos: [],
      apagarProdutos: [],
    };
  },

  mounted() {
    //Pegar todos os dados que tem no BD e lista no VUE
    Produtos.listar().then((response) => {
      this.produtos = response.data;
     
      console.log(response.data);
    });
  }, 

  methods:{

    

  
  // Deletar todos os produtos
    DeleteTodosProdutos(){
      if(confirm("Quer mesmo deletar todos os produtos? Tem certeza?")){
       Produtos.deleteProduto().then((response) => {
         console.log(response)
         alert('Produtos apagados!');
       })
       .catch(e=>{
            console.log(e);
          })
      } else {
         alert('Cancelado')

      }

    },

  //Deletar pelo Id
     deleteById(produto){
        if(confirm("Tem certeza que vai exluir esse produto?")){
          Produtos.deleteProduto(produto.id);
          alert('Produto apagado!');
           window.location.reload();
        } else{
          alert('Cancelado.')
        }
      },

    // Complemento de Editar pelo Id pegando o Select
      deleteProduto(){
        if(this.apagarProdutos.length === 0){
          alert('Nenhum produto selecionado!');
        } else if(confirm("Tem certeza?")){
            this.apagarProdutos.forEach(id => {
            Produtos.deleteProduto(id);
            })
            alert('Produtos apagados!');
             window.location.reload();
          } else{
            alert('Cancelado.')
          }
      },


      //Ordenação
     ordernarNome() {
      this.produtos.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
    ordernarCodigo() {
      this.produtos.sort((a, b) => (a.code > b.code ? 1 : -1));
    },
    ordernarPreco() {
      this.produtos.sort((a, b) => (a.price > b.price ? 1 : -1));
    },
    ordernarCategoria() {
      this.produtos.sort((a, b) => (a.category > b.category ? 1 : -1));
    },
    ordernarStatus() {
      this.produtos.sort((a, b) => (a.status > b.status ? 1 : -1));
    },
 
  },
};
</script>

<style scoped>
header {
  background-color: rgb(244, 244, 252);
  margin: 20px;
}
#btnNovo{
  display: inline-block;
}

#btnExcluir{
display: inline-block;
margin-left: 10px;
  
}
.gerenciar_produto {
  background-color: rgb(244, 244, 252);
  margin: 20px;
}

h4 {
  margin: 30px;
  display: inline-block;
}

.InputP {
  display: inline-block;
  margin-left: 750px;
  border-radius: 5px;
  border: none;
  border: 1px solid #000000;
}

.pesq {
  cursor: pointer;
  padding: 5px;
  outline: none;
  display: inline-block;
}

.gg-arrows-exchange-alt-v {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 14px;
  height: 16px;
}
.gg-arrows-exchange-alt-v::after,
.gg-arrows-exchange-alt-v::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 2px;
  background: currentColor;
  border-radius: 4px;
}
.gg-arrows-exchange-alt-v::before {
  height: 6px;
  transform: rotate(-45deg);
  box-shadow: 13px -2px 0;
  top: 10px;
  left: 2px;
}
.gg-arrows-exchange-alt-v::after {
  height: 12px;
  box-shadow: -4px 4px 0;
  right: 4px;
}
</style>
    

