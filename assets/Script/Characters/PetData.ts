export default class PetData {
    id: string;
    hurts: {
        tumors: string[];
        thorns: string[];
        scratch: string[];
    };
    animations: {
        idle: string[];
        fun: string[];
        eat: string[];
    };
}
