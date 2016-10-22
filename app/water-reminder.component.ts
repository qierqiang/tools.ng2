/// <reference path="../typings/jquery/jquery.d.ts" />
import { Component, OnInit  } from '@angular/core';
import { Flower             } from './flower';

@Component({
    selector:       'water-reminder',
    templateUrl:    'app/water-reminder.component.html',
    styleUrls:      ['app/water-reminder.component.css']
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
        
    constructor() { }

    ngOnInit() { 
        this.locateFlowers();
    }

    private locateFlowers(): void {
        for (let f of this.flowers) {

        }
    }
}