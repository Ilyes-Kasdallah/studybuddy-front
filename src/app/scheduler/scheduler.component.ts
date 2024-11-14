import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { scheduler } from "dhtmlx-scheduler";
import { EventService } from "../services/event.service";


@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "scheduler",
    providers: [ EventService ],
    styleUrls: ['./scheduler.component.css'],
    templateUrl: './scheduler.component.html'
})


export class SchedulerComponent implements OnInit {
    @ViewChild("scheduler_here", {static: true}) schedulerContainer!: ElementRef;


    constructor(private eventService: EventService) { }


    ngOnInit() {
        scheduler.config.date_format = "%Y-%m-%d %H:%i";


        scheduler.init(this.schedulerContainer.nativeElement, new Date());


        if(!(scheduler as any).$_initOnce){
            (scheduler as any).$_initOnce = true;


            const dp = scheduler.createDataProcessor({
                event: {
                    create: (data: any) => this.eventService.insert(data),
                    update: (data: any) => this.eventService.update(data),
                    delete: (id: number) => this.eventService.remove(id),
                }
            });
        }


        this.eventService.get()
            .then((data) => {
                scheduler.parse(data);
            });
    }
}