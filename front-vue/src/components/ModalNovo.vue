<template>
<div class="">

<!-- Modal + Novo -->
<div
      class="modal show fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      style="display: block"
      v-if="visible"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Detalhe do Produto
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="visible = false"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
            <form>
          
              <label class="Titulo">Nome: </label>
              <input type="text" v-model="produto.nome" placeholder="Escreva o Nome..."/>

              <label class="Titulo">Código: </label>
              <input type="text" v-model="produto.codigo" placeholder="Escreva o código..."/>

              <label class="Titulo">Preço: </label>
              <input type="number" step="0.01" min="0.01" v-model="produto.preco" placeholder="Escreva o preço..."/>
            

                 <!-- <label class="Titulo">Categoria: </label>
              <input type="text" v-model="produto.categoria" placeholder="Escreva a Categoria..."/>

                 <label class="Titulo">Status: </label>
              <input type="text" v-model="produto.status" placeholder="Escreva a Categoria..."/>            -->
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="visible = false"
            >
              Fecha
            </button>
            <button @click=" CadastrarProduto()" type="button" class="btn btn-primary">
              Salvar Produtos
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade show" v-if="visible"></div>
</div>

</template>


<script>

import Produtos from "../services/Produtos";

export default {
  data() {
    return {
      produtos: [],
      categoria: [],
      status: [],
      visible: false,
      produto: {
        nome: "",
        preco: "",
        codigo: "",
        categoria: "",
        status: "",
      },
    };
  },
   mounted() {
    // Produtos.ListCateg().then((response) => {
    //   this.categoria = response.data;
    // });

    // Produtos.ListStatus().then((response) => {
    //   this.status = response.data;
    // });
    
    this.listar();
  },

  methods:{
    listar(){
     Produtos.listar().then((response) => {
        this.produtos = response.data;
      });
    },
    CadastrarProduto (){
      Produtos.salvar(this.produto).then((response) => {
      this.produto = response.data;
      alert("Cadastrado com sucesso!")
       this.listar();
      this.errors = {};
      })
      .catch((e) => {
          this.errors = e.response.data.errors;
        });
    }
  },
  
  created() {
    this.$root.$on("open-ModalNovo", () => {
      this.visible = true;
    });
  },
};
</script>


<style scoped>

.Titulo {
  margin-left: 15px;
  margin-right: 5px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
}
input {
  height: 35px;
  flex-direction: column;
  margin-left: 2px;
  width: 460px;
  border-radius: 5px;
  border: none;
  border: 1px solid #000000;
}

</style>