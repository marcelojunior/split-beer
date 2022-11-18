import { ListItem } from "@/models/ListItem";
import { ListModel } from "@/models/ListModel";
import { ListRepository } from "@/repository/ListRepository";

export class ListaService {

    listaRepository: ListRepository;

    constructor() {
        this.listaRepository = new ListRepository();
    }

    save(model: ListModel): Promise<ListModel> {
        return this.listaRepository.save(model)
    }

    get(uid: string): Promise<ListModel> {
        return this.listaRepository.get(uid);
    }

    addItem(model: ListModel, item: ListItem): Promise<ListModel> {
        if (item.value === 0) {
            item.value = undefined;
        }

        return this.listaRepository.addItem(model, item);
    }

    removeItem(model: ListModel, item: ListItem): Promise<ListModel> {
        return this.listaRepository.removeItem(model, item);
    }

    pay(item: ListItem, value: number): Promise<ListItem> {
        return this.listaRepository.pay(item, value)
    }
}