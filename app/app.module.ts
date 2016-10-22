import { NgModule               } from '@angular/core';
import { BrowserModule          } from '@angular/platform-browser';
import { HttpModule             } from '@angular/http';

import { AppComponent           } from './app.component';
import { DashboardComponent     } from './dashboard.component';
import { LoggerComponent        } from './logger.component';
import { TodoWatcherComponent   } from './todo-watcher.component';
import { AnnoWatcherComponent   } from './anno-watcher.component';
import { WaterReminderComponent } from './water-reminder.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, 
                  DashboardComponent, 
                  LoggerComponent, 
                  TodoWatcherComponent, 
                  AnnoWatcherComponent,
                  WaterReminderComponent],
  bootstrap:    [ AppComponent ],
})

export class AppModule { }
