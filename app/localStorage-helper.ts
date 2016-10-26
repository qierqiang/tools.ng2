class LocalStorageHelper {

    /**
     * 查找指定的键名，如查找a,则会返回 a, a_1, a_2, ...
     * @param {string} name 名称
     * @returns {string[]} 键名
     */
    public find(name: string): string[] {
        name = name.toLowerCase();
        let arr: string[] = [];
        for (let i: number = 0; i < localStorage.length; i++) {
            let key: string = localStorage.key(i).toLowerCase();
            //全匹配则回调
            if (key === name) {
                arr.push(key);
            }
            //带序号也回调
            else if (key.indexOf("_") >= 0){
                if (key.substr(0, key.indexOf("_")) === name){
                    arr.push(key);
                }
            }
        }
        return arr;
    }

    /**
     * 查找某个键名的最大ID值，如：a键名最大值是a_12，则返回12
     * @param {string} key 键名
     * @returns {number} id值
     */
    public getMaxId(name: string): number {
        let id: number = 0;
        let arr = this.find(name);
        for (let key of arr) {
            if (key.indexOf("_") >= 0) {
                let tmp: number = parseInt(key.substr(key.indexOf("_") + 1));
                if (tmp > id){
                    id = tmp;
                }
            }
        }
        return id;
    }

    /**
     * 添加一条记录
     * @param {string} name 名称（键名前缀）
     * @param {string} val 记录内容
     * @returns {number} 添加的记录的id
     */
    public add(name: string, val: string): number {
        let id: number  = this.getMaxId(name) + 1;
        let key: string = name + "_" + id.toString();
        localStorage.setItem(key, val);
        return id;
    }

    /**
     * 清空指定名称的内容
     * @param {string} name 名称（键名前缀）
     */
    public clear(name: string): void {
        let arr = this.find(name);
        for (let key of arr) {
            localStorage.removeItem(key);
        }
    }

    /**
     * 读取指定名称的所有记录
     * 
     * @param {string} name 名称（键名前缀）
     * @returns {string[]} 数组
     */
    public readAll(name: string): string[] {
        let arr = this.find(name);
        let ret: string[] = [];
        for (let key of arr) {
            ret.push(localStorage.getItem(key));
        }
        return ret;
    }
}

export const lsHelper: LocalStorageHelper = new LocalStorageHelper();