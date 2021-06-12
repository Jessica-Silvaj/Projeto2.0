import { http } from './config';

export default {

    //Caminho Principal
    listar: () => {
        return http.get('/produtos');
    },

    //Criar e salvar novos Produtos
    salvar: (produto) => {
        return http.post('/produto', produto);
    },
    //Apagar pelo Id
    deleteProduto(id) {
        return http.delete(`/produto/${id}`);
    },

    //Apagar todos os Produtos
    apagarTodos: () => {
        return http.delete('/produto');
    }

}