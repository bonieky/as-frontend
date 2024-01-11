import { Person } from "./Person";

export type PersonComplete = Person & {
    cpf: string;
    id_event: number;
    id_group: number;
}