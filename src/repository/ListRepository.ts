import { ListItem } from "@/models/ListItem";
import { ListModel } from "@/models/ListModel";

export class ListRepository {
    save(model: ListModel){
        const storage = localStorage.setItem(`list-${model.uid}`, JSON.stringify(model));    
    }

    get(uid: string): ListModel | null {
        const storage = localStorage.getItem(`list-${uid}`);
        if (!storage){
            return null;
        }

        return JSON.parse(storage);
    }

    addItem(model: ListModel, item: ListItem){
        item.id = 1;
        if (model.items.length > 0){
            item.id = (Math.max(...model.items.map(m => m.id)) + 1)
        }
        model.items.push({...item})
        this.save(model);
    }

    removeItem(model: ListModel, item: ListItem){
        console.log(item)
        const idx = model.items.findIndex(m => m.id === item.id);
        console.log(idx)
        model.items.splice(idx, 1);
        this.save(model);
    }
}