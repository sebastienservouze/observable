import { Subject, Subscription } from "rxjs";

export interface Section {
    title: string;
    codeBlocs: { [key: string]: string };
    userCount$?: Subject<number>;
    users?: any[];
    console?: string[];
    subscriptions?: Subscription[];
}