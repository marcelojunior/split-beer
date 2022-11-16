import { ListItem } from "./ListItem";

export interface ListModel {
    value: number;
    description: string;
    uid: string;
    items: ListItem[]
}