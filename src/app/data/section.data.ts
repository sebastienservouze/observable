import { BehaviorSubject, Subject } from "rxjs";
import { Section } from "../models/section.model";

const OBSERVABLE: Section = {
    title: 'OBSERVABLE',
    codeBlocs: {
        exemple: "/**\n * Exemple d'appel HTTP en angular\n */\ngetUserCount(): Observable<number> { \n    return httpClient.get<number>('http://mon-api.fr/user/count');\n}",
        subscribe: "// Abonnement à un observable\ngetUserCount().subscribe((userCount: number) => console.log(userCount + ' utilisateurs'));"
    },
}

const SUBJECT: Section = {
    title: 'SUBJECT',
    codeBlocs: {
        exemple: "users = Users[] = [];\nuserCount$ = new Subject<number>();\n\n// Abonnement\nuserCount$.subscribe((userCount: number) => console.log(userCount + ' utilisateurs');",
        essayer: "essayer(): void {\n  users.add(new User());\n\n  console.log('Emission de ' + user.length + ' utilisateurs.');\n  userCount$.next(users.length);\n}"
    },
    console: [],
    users: [],
    userCount$: new Subject<number>(),
    subscriptions: [],
}

const BEHAVIOR: Section = {
    title: 'BEHAVIOR SUBJECT',
    codeBlocs: {
        exemple: "behaviorSubject$ = new BehaviorSubject(defaultValue);",
        exemple2: "users: Users[] = [];\nuserCount$ = new BehaviorSubject(users.length);",
        exemple3: "essayer(): void {\n  userCount$.subscribe((userCount: number) => console.log(userCount + ' utilisateurs');\n}"
    },
    console: [],
    users: [],
    userCount$: new BehaviorSubject<number>(0),
    subscriptions: []
}

const SUBSCRIBE: Section = {
    title: 'SUBSCRIBE',
    codeBlocs: {
        essayer: "essayer(): void {\n  userCount$.subscribe((userCount: number) => console.log(userCount + ' utilisateurs');\n\n  users.push(new User());\n\n  console.log('Emission de ' + user.length + ' utilisateurs.');\n  userCount$.next(users.length);\n};"
    },
    console: [],
    users: [],
    userCount$: new Subject<number>(),
    subscriptions: []
}

const PIPE: Section = {
    title: 'PIPE',
    codeBlocs: {
        exemple: "userCount$.pipe(delay(1000)).subscribe((userCount: number) => {\n  console.log(userCount + ' utilisateurs');\n});",
        essayer: "essayer(): void {\n  users.push(new User());\n\n  console.log('Emission de ' + user.length + ' utilisateurs.');\n  userCount$.next(users.length);\n}"
    },
    console: [],
    users: [],
    userCount$: new Subject<number>(),
    subscriptions: []
}

const TAKE: Section = {
    title: 'TAKE',
    codeBlocs: {
        exemple: "userCount$.pipe(take(1)).subscribe((userCount: number) => {\n  console.log(userCount + ' utilisateurs');\n});",
        essayer: "essayer(): void {\n  users.push(new User());\n\n  console.log('Emission de ' + user.length + ' utilisateurs.');\n  userCount$.next(users.length);\n}"
    },
    console: [],
    users: [],
    userCount$: new Subject<number>(),
    subscriptions: []
}

export const SECTIONS: Section[] = [
    OBSERVABLE,
    SUBJECT,
    BEHAVIOR,
    SUBSCRIBE,
    PIPE,
    TAKE,
];