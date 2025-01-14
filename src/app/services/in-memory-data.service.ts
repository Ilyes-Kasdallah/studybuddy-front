import { InMemoryDbService } from "angular-in-memory-web-api";


export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let events = [
            { id: 1, start_date: "2024-11-16 09:00", end_date: "2024-11-16 13:00", text: "Event 1" },
            { id: 2, start_date: "2024-11-18 10:00", end_date: "2024-11-18 14:00", text: "Event 2" },
        ];


        return {events};
    }
}