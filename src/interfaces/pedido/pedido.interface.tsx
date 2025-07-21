export interface IPedido {
    id:         number,
    id_usuario:   number,
    produtos:       string,    
    valor_total:   number,
    quantidade:   number,
    valor_frete:   number,
    desconto:   number,
    endereco:   string,
    status:   string,
    created_at: string,
    updated_at: string
}