import axios from "axios";

const usePedido = () => {

    const pesquisarEndereco = async(cep: string) => {
        let response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`,{
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

    return { pesquisarEndereco };
}

export default usePedido;