/// <reference path="../typings/jquery/jquery.d.ts" />

import { Component, OnInit, Injectable  } from '@angular/core';
import { Http, Response     } from '@angular/http';
import { Observable         } from 'rxjs';
import { Watcher            } from './watcher';
import { logger             } from './logger.component';
import { lsHelper           } from './localStorage-helper';
import { annoConfig         } from './watchers.config'
import 'rxjs/add/operator/toPromise';

interface Announcement {
    href: string;
    title: string;
    link: string;
    keyword?: string;
}

@Component({
    selector:       'anno-watcher',
    templateUrl:    'app/anno-watcher.component.html',
    styleUrls:      [`app/anno-watcher.component.css`],
})

@Injectable()
export class AnnoWatcherComponent extends Watcher implements OnInit {

    public items: Announcement[];

    readonly url_domain: string = "http://www.hfjjzd.gov.cn";
    readonly href_annos: string = "/zhuzhan/jwgk/";

    constructor(private http: Http) {
        super(annoConfig);
    }

    ngOnInit(): void {
        this.start();
    }

    test(): void {
        //查询公告
        // logger.log("开始查询交警公告", "info");
        let url: string = this.url_domain + this.href_annos;
        this.http.get(url).toPromise()
            .then(res => {
                let arr: Announcement[] = [];
                $(res.text()).find(".liebiangaoqilaile2_kaishil2 ul li a").each((i, a) => {
                    let href = a.getAttribute("href");
                    arr.push({ "href": href, "title": a.textContent, "link": this.url_domain + href });
                });
                this.items = arr;

                //通知
                let foundList: Announcement[] = [];
                for (let a of arr) {
                    //关键字
                    for (let w of this.keywords) {
                        if (a.title.indexOf(w) >= 0) {
                            //是否已读
                            if (!this.getIsRead(a.href)) {
                                a.keyword = w;
                                foundList.push(a);
                            }
                        }
                    }
                }
                logger.log("查询交警公告完成", "info");
                //发出通知
                if (foundList && foundList.length > 0) {
                    for(let a of foundList) {
                        logger.log(`交警公告发现关键字：[${a.keyword}]`, "success");
                        this.notify("交警公告", a.title, (n) =>{
                            window.open(a.link);
                            this.setIsRead(a.href);
                            n.close();
                        });
                    }
                }
            }).catch(err => { logger.log(err.message, "error") });
    }

    /**
     * 判断公告是否已读
     * @param {string} href 公告相对链接
     * @returns {boolean} 是否已读
     */
    getIsRead(href: string): boolean {
        var arr = lsHelper.readAll("read");
        for (var i = 0; i < arr.length; i++) {
            var u = arr[i];
            if (href == u) {
                return true;
            }
        }
        return false;
    }

    /**
     * 设置公告为已读
     * @param {string} href 公告相对链接
     */
    setIsRead(href: string): void {
        lsHelper.add("read", href);
    }

    /**
     * 打开交警公告源页面
     */
    public openOriginPage(): void {
        window.open(this.url_domain + this.href_annos);
    }
}