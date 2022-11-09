import { Person } from "./person";

export class PersonPagination {
    count: number = 0;
    next: string = '';
    previous: string = ''; 
    results: Person[] = [];
}