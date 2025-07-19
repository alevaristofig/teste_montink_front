import axios from "axios";

const useCupom = () => {

    const buscarCupom = async(id: number) => {
        let response = axios.get(`http://localhost:8000/api/erp_gerenciamento/cupom/${id}`,{
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

    return { buscarCupom };
}

export default useCupom;