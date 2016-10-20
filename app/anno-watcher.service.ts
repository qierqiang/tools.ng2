
import { Injectable         } from '@angular/core';
import { Http, Response     } from '@angular/http';
import { Observable         } from 'rxjs';

@Injectable()
export class AnnoWatcherService {

    constructor(private http: Http) { }

    getAnnouncements(): Promise<JQuery> {
        let url: string = "http://www.hfjjzd.gov.cn/zhuzhan/jwgk/";
        return this.http.get(url).toPromise()
            .then(res => $(res).find(".liebiangaoqilaile2_kaishil2 ul li a"))
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('查询交警公告失败！', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}