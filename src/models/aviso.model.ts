export class Aviso {
    
    _id: string;
    title: string;
    comentario: string;
    
    static adatp(): Aviso {
        let aviso = new Aviso();
        aviso.title = "";
        aviso.comentario = "";
        return aviso;
    }    
}