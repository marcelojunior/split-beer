import { ListItem } from "@/models/ListItem";
import { ListModel } from "@/models/ListModel";
import { BaseRespoitory } from "./BaseRepository";

export class ListRepository extends BaseRespoitory {
    save(model: ListModel) : Promise<ListModel> {
        return new Promise<ListModel>((resolve, reject) => {
            this.post('/savelist', model).then(response => {
                const data = response.data;
                const storageLists = localStorage.getItem('lists');
                let lists = [];
                if (storageLists){
                    lists = JSON.parse(storageLists);
                }            
    
                const idx = lists.findIndex((m: ListModel) => m.uid === data.uid)
                if (idx > -1){
                    lists.splice(idx, 1)
                }
    
                lists.push(data);
                localStorage.setItem('lists', JSON.stringify(lists));
                resolve(data)
            }).catch((error) => {
                reject(error)
            })
        })
    }

    find(uid: string): Promise<ListModel> {

        return new Promise<ListModel>((resolve, reject) => {
            this.get(`/get/${uid}`).then((response) => {
                const data = response.data;
                if (!data){
                    resolve({} as ListModel);
                }

                resolve(data);
            }).catch((error) => {
                reject(error)
            })
        })
    }
}