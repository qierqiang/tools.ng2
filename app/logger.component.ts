import { Component, OnInit } from '@angular/core';

interface Log {
    time: string;
    content: string;
    type: string;
}

class LoggerProvider {
    log(content: string, type: string): void {
        LoggerComponent.log(content, type);
    }
}

@Component({
    selector:       'logger',
    templateUrl:    'app/logger.component.html',
    styleUrls:      ['app/logger.component.css']
})

export class LoggerComponent implements OnInit {

    private static logs: Log[] = [];

    public static log(content: string, type: string): void {
        let date = new Date();
        let time = ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2);
        LoggerComponent.logs.push({ time: time, content: content, type: type });
        switch (type) {
            // case "info": console.info(content); break;
            case "error": console.error(content); break;
            case "success":console.info(content); break;
            default: console.log(content); break;
        }
    }

    constructor() { }

    ngOnInit() { }

    public getLogs(): Log[] {
        return LoggerComponent.logs.reverse();
    }

    public clearLogs(): void {
        LoggerComponent.logs = [];
    }
}

export const logger = new LoggerProvider();