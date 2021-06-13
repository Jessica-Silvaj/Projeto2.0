<template>
    <div>
 
<!-- Modal -->
<div class="modal show fade" id="exampleModal" tabindex="-1" role="dialog" style="display: block" v-if="visible">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar Produto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="visible = false">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <table class="table table-custom separator">
        <thead>
                    <tr class="darken">  
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <div class="separator">

                <tbody>
                    
                </tbody>

                 </div>      

        </table>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="visible = false">Fecha</button>
        <button type="button" class="btn btn-primary">Salvar Alteração</button>
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
    name: "Modal",
     props: ['produto'],
    data(){
        return {
            visible: false,

              produtoEdit:{
                codigo: '',
                nome: '',
                preco: '',
                categoria: '',
                status: ''
            }
        }
        
    },
     mounted() {
    //Pegar todos os dados que tem no BD e lista no VUE
    Produtos.listar().then((response) => {
      this.produtos = response.data;
      console.log(response.data);
    });
  }, 

     created() {

    this.$root.$on("open-ModalEdit", () => {
      this.visible = true; 
    });
  }
}
</script>
