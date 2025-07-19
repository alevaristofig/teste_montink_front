import axios from "axios";

const useProduto = () => {

    const buscarProduto = async(id: number) => {
        let response = axios.get(`http://localhost:8000/api/erp_gerenciamento/produto/${id}`,{
                            /*headers: {
                                "Authorization": `Bearer ${token}`,                
                            }*/
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {                            
                            return false;
                        });

        return response;
    }

    return { buscarProduto };
}

export default useProduto;