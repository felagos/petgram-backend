import NodeCahe from "node-cache";
import { environment } from "@env";

export class Cache {

    private cache: NodeCahe;
    private readonly EXP: number = Number(environment.EXP_CACHE);

    constructor() {
        this.cache = new NodeCahe({ stdTTL: this.EXP, checkperiod: this.EXP * 0.2, useClones: false });
    }

    public setData<T>(key: string, data: T): boolean {
        return this.cache.set(key, data);
    }

    public getData<T>(key: string): T | null {
        return this.cache.get<T>(key) || null;
    }

    public isPresent(key: string): boolean {
        const data = this.cache.get(key);
        return data ? true : false;
    }

}

export default new Cache();