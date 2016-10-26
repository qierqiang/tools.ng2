export class Flower {

    private today:              any     = new Date();

    public wateredDate:         any     = new Date(2016, 7, 30);
    public wateredDaysToNow:    number  = 0;
    public wet:                 string  = "0%";
    public dry:                 string  = "100%";
    public description:         string  = "";
    public descriptionHtml:     string  = "";

    constructor(public name: string,
        public period: number,
        public x: number, 
        public y: number, 
        public id: string, 
        public note: string, 
        public offSet: number, 
        public isLarge: boolean) {
        this.today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    }

    /**
     * 取得上次浇水日期
     */
    getWateredDate(): void {
        let val = localStorage.getItem(this.id);
        if (val != undefined) {
            this.wateredDate = new Date(val);
            this.wateredDate = new Date(this.wateredDate.getFullYear(), this.wateredDate.getMonth(), this.wateredDate.getDate());
        }
        this.wateredDaysToNow = Math.round((this.today - this.wateredDate) / 1000 / 60 / 60 / 24);
        let days = (this.today - this.wateredDate) / 1000 / 60 / 60 / 24;
        if (days > (this.period + this.offSet)) {
            this.wet = "0%";
            this.dry = "100%";
        } else {
            let tmp = (days / (this.period + this.offSet)) * 100;
            this.dry = tmp + "%";
            this.wet = (100 - tmp) + "%";
        }
        this.updateDescription();
    }
    
    /**
     * 标记今天已浇水
     */
    setWateredDate(): void {
        localStorage.setItem(this.id, this.today.toString());
        this.getWateredDate();
    }
    
    /**
     * 更新描述信息
     */
    private updateDescription() {
        this.description = `${this.name}\t${this.id}\r\n\r\n上次浇水是${this.wateredDaysToNow}天前\r\n每${this.period}±${this.offSet}天浇一次`;
        if (this.note && this.note.length > 0) {
            this.description += "\r\n\r\n" + this.note;
        }
        this.descriptionHtml = this.description.replace("\r\n", "<br>",);
    }
}