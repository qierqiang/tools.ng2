/// <reference path="../typings/jquery/jquery.d.ts" />
import { Component, OnInit          } from '@angular/core';
import { Http, Response, Headers    } from '@angular/http';
import { Watcher                    } from './watcher';
import { logger                     } from './logger.component';
import { todoConfig                 } from './watchers.config';

@Component({
    selector:       'todo-watcher',
    templateUrl:    'app/todo-watcher.component.html',
    styleUrls:      [`app/todo-watcher.component.css`],
})


export class TodoWatcherComponent extends Watcher implements OnInit {

    public items: string[] = [];

    constructor(private http: Http) {
        super(todoConfig);
    }

    ngOnInit() { 
        this.start();
    }

    test(): void {
        // logger.log("开始查询待办", "info");
        //查询待办
        let data: string        = "{\"BaseOUGuid\": \"-1\",\"UserGuid\": \"8623cf12-b066-4dab-9d33-0a89e331a1d0\"}";
        let url: string         = "http://172.18.18.18/hftpframe_zx/EpointMetroNic/FrameAll_Metronic.aspx/GetWaithandleMessage";
        this.http.post(url, data, {headers: new Headers({'Content-Type': 'application/json'})}).toPromise()
            .then(res => {
                let arr: string[] = [];
                $(res).find("a").each(() => arr.push($(this).attr("title")));
                this.items = arr;
                //对比关键字
                for (let t of this.items) {
                    for (let w of this.keywords) {
                        if (t.indexOf(w) >= 0) {
                            let todo = this.seperateTitle(t);
                            this.notify(todo.title, todo.msg, (n) => n.close());
                            logger.log("发现待办，发出提醒。", "success");
                        }
                    }
                }
                logger.log("查询待办完成", "info");
            }).catch(err => { logger.log(err.message, "error") });
    }

    /**
     * 把待办信息中的标题与待办内容分离出来
     * @param {string} txt 待办信息文本
     * @returns {{ title: string, msg: string }} title:标题， msg:内容
     */
    seperateTitle(txt: string): { title: string, msg: string } {
        var title = txt.slice(txt.indexOf("【") + 1, txt.indexOf("】"));
        var msg = txt.slice(txt.indexOf("】") + 1);
        return { title: title, msg: msg };
    }
}