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
        return this.listaRepository.find(uid);
    }

    addItem(model: ListModel, item: ListItem): Promise<ListModel> {
        if (item.value === 0) {
            item.value = undefined;
        }
        
        item.id = 1;
        if (model.items.length > 0) {
            item.id = (Math.max(...model.items.map(m => m.id)) + 1)
        }
        model.items.push({ ...item })

        return this.listaRepository.save(model);
    }

    removeItem(model: ListModel, item: ListItem): Promise<ListModel> {
        const idx = model.items.findIndex(m => m.id === item.id);
        model.items.splice(idx, 1);
        return this.save(model);
    }
}