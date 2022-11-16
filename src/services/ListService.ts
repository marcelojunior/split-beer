import { ListItem } from "@/models/ListItem";
import { ListModel } from "@/models/ListModel";
import { ListRepository } from "@/repository/ListRepository";

export class ListaService {

    listaRepository: ListRepository;

    constructor() {
        this.listaRepository = new ListRepository();
    }

    save(model: ListModel) {
        this.listaRepository.save(model);
    }

    get(uid: string): ListModel | null {
        return this.listaRepository.get(uid);
    }

    addItem(model: ListModel, item: ListItem){
        this.listaRepository.addItem(model, item);
    }

    removeItem(model: ListModel, item: ListItem){
        this.listaRepository.removeItem(model, item);
    }
}