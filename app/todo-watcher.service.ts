import { Injectable                 } from '@angular/core';
import { Http, Response, Headers    } from '@angular/http';
import { Observable                 } from 'rxjs';

@Injectable()
export class TodoWatcherService {

    constructor(private http: Http) { }

    getTodos(): Promise<string[]> {
        let data: string        = "{\"BaseOUGuid\": \"-1\",\"UserGuid\": \"8623cf12-b066-4dab-9d33-0a89e331a1d0\"}";
        let url: string         = "http://172.18.18.18/hftpframe_zx/EpointMetroNic/FrameAll_Metronic.aspx/GetWaithandleMessage";
        return this.http.post(url, data, {headers:new Headers({'Content-Type': 'application/json'})}).toPromise()
            .then(res => {
                let arr: string[] = [];
                $(res).find("a").each(() => arr.push($(this).attr("title")));
                return arr;
            }).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('查询待办失败！', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}