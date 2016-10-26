/// <reference path="../typings/jquery/jquery.d.ts" />
import { Component, OnInit  } from '@angular/core';
import { Http, Response     } from '@angular/http';
import { Flower             } from './flower';

@Component({
    selector:       'water-reminder',
    templateUrl:    'app/water-reminder.component.html',
    styleUrls:      ['app/water-reminder.component.css'],
    // pipes:          [ReplacePipe]
})

export class WaterReminderComponent implements OnInit {

    public flowers: Flower[] = [
        new Flower("君子兰", 30, 20, 270, "f1", "浇水后必须放置于通风处", 3, false),
        new Flower("虎皮兰", 30, 20, 398, "f2", "一个月左右向土喷水", 3, false),
        new Flower("君子兰", 30, 20, 526, "f3", "浇水后必须放置于通风处", 3, false),
        new Flower("莲花竹", 4, 20, 654, "f4", "", 1, false),
        new Flower("虎皮兰", 30, 330, 286, "f5", "一个月左右向土喷水", 3, false),
        new Flower("虎皮兰", 30, 330, 414, "f6", "一个月左右向土喷水", 3, false),
        new Flower("发财树", 25, 330, 542, "f7", "浇水后必须放置于通风处", 5, false),
        new Flower("袖珍椰子", 4, 330 - 20, 670, "f8", "", 1, false),
        new Flower("常青藤", 4, 330 + 15, 670, "f9", "", 1, false),
        new Flower("金钱树", 30, 365, 286, "f10", "浇水后必须放置于通风处", 3, false),
        new Flower("竹竽", 4, 365, 414, "f11", "", 1, false),
        new Flower("竹柏", 4, 365, 542, "f12", "", 1, false),
        new Flower("兰花", 4, 365 + 15, 670, "f13", "", 1, false),
        new Flower("富贵树", 7, 160, 675, "f14", "", 2, true),
        new Flower("竹柏", 4, 347, 151, "f15", "", 1, false),
        new Flower("螺纹铁", 15, 438, 132, "f16", "", 2, true),
        new Flower("螺纹铁", 15, 228, 132, "f17", "", 2, true),
        new Flower("未名", 7, 525, 633, "f18", "", 2, false),
        new Flower("香龙血树", 7, 512, 414, "f19", "", 2, true),
        new Flower("测试", 3, 330, 190, "f20", "虚构出来用于测试的花", 1, false)];

        public toWater: Flower[]    = [];
        public hoverId: string      = "";
        public humidity: string     = "#错误#";
        
    constructor(private http: Http) { 
        for (let f of this.flowers)
        {
            f.x = f.x - 7;
        }
    }

    ngOnInit() { 
        //今日要浇水
        var nextWaterDay = this.getNextWorkDay(); //距离下次有人在这浇水的天数
        for (let f of this.flowers) {
            f.getWateredDate();
            if (f.wateredDaysToNow + nextWaterDay > f.period) {
                this.toWater.push(f);
            }
        }
        //湿度
        this.diplayHumidity();
    }

    /**
     * 显示湿度
     */
    diplayHumidity(): void {
        let url = "http://tianqi.2345.com/today-58321.htm";
        this.http.get(url).toPromise().then((res) => {
            let tmp = parseInt(res.text().match(/\d+%</)[0].replace("%<", ""));
            this.humidity = tmp + "%";
        });
    }

    /**
     * 标记已浇水
     * @param {string} id ID
     */
    water(id: string): void {
        if (confirm("浇过水了吗？")) {
            for (let f of this.flowers) {
                if (f.id === id) {
                    f.setWateredDate();
                    this.toWater.splice(this.toWater.indexOf(f), 1);
                    return;
                }
            }
        }
    }

    /**
     * 获取下一个工作日距离今天有几天, 大于8天则会返回9
     */
    private getNextWorkDay(): number {
        // API示例：
        // http://www.easybots.cn/api/holiday.php?d=20160905,20160910,20161007,20161008
        //查询未来8天
        let dates = [];
        let now = new Date();
        for (let i = 1; i < 9; i++) {
            let tmp = this.addDays(now, i);
            dates.push(tmp.getFullYear() + ("00" + (tmp.getMonth() + 1)).slice(-2) + ("00" + (tmp.getDate())).slice(-2));
        }
        var queryString = "";
        for (var i = 0; i < dates.length; i++) {
            queryString += dates[i] + ",";
        }
        queryString = queryString.slice(0, queryString.length - 1);
        var result = $.ajax({
            type: "GET",
            async: false,
            url: "http://www.easybots.cn/api/holiday.php?d=" + queryString,
            error: function (ex) {
                alert("查询节假日失败！请检查API是否可用。");
                throw ex;
            }
        }).responseText;
        var data = JSON.parse(result);
        for (var i = 0; i < dates.length; i++) {
            var d = dates[i];
            if (data[d] == 0) {
                return i + 1;
            }
        }
        return 9;
    }

    /**
     * 日期计算，在指定日期上增加特定天数
     */
    private addDays(date: Date, daysToAdd: number): Date {
        return new Date(date.getTime() + (daysToAdd * 1000 * 3600 * 24))
    }
}