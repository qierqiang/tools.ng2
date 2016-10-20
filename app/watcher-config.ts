export class WatherConfig {

    /**
     * Creates an instance of WatherConfig.
     * @param {string[]} keywords 关键词数组
     * @param {number} interval 查询时间间隔
     */
    constructor(public keywords: string[], public interval: number) { }
}