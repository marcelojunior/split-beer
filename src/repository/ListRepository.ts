import { ListItem } from "@/models/ListItem";
import { ListModel } from "@/models/ListModel";

export class ListRepository {
    save(model: ListModel): Promise<ListModel> {
        return new Promise<ListModel>((resolve) => {
            const storageLists = localStorage.getItem('lists');
            let lists = [];
            if (storageLists){
                lists = JSON.parse(storageLists);
            }            

            const idx = lists.findIndex((m: ListModel) => m.uid === model.uid)
            if (idx > -1){
                lists.splice(idx, 1)
            }

            lists.push(model);
            localStorage.setItem('lists', JSON.stringify(lists));
            resolve(model)
        })
    }

    get(uid: string): Promise<ListModel> {
        return new Promise<ListModel>((resolve) => {
            const storageLists = localStorage.getItem('lists');
            if (!storageLists) {
                resolve({} as ListModel);
            }

            const lists = JSON.parse(storageLists as string);
            const storageItem = lists.find((m: ListModel) => m.uid === uid);

            if (!storageItem){
                resolve({} as ListModel);
            }

            resolve(<ListModel>storageItem)
        })
    }

    addItem(model: ListModel, item: ListItem): Promise<ListModel> {
        item.id = 1;
        if (model.items.length > 0) {
            item.id = (Math.max(...model.items.map(m => m.id)) + 1)
        }
        model.items.push({ ...item })
        return this.save(model);
    }

    removeItem(model: ListModel, item: ListItem): Promise<ListModel> {
        const idx = model.items.findIndex(m => m.id === item.id);
        model.items.splice(idx, 1);
        return this.save(model);
    }

    pay(item: ListItem, value: number): Promise<ListItem> {
        return new Promise<ListItem>((resolve) => {
            item.value = value;
            resolve(item)
        })
    }
}