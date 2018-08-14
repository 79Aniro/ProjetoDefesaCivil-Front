export class Endereco {

    public id: number;

    constructor(
        public id_endereco:string,
        public  nome:string,
        public  cep:string,
        public  bairro:string,
        public  regiao:string,
    ) {}

}