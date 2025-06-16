export interface Serializable<T> {
    fromJSON(obj: any): T;
}