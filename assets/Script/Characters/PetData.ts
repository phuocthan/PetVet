export class AttachBone {
    bone: string;
    angle: number;
}

export default class PetData {
    id: string;
    hurts: {
        tumors: AttachBone[];
        thorns: AttachBone[];
        scratch: AttachBone[];
    };
    animations: {
        idle: string[];
        fun: string[];
        eat: string[];
    };
}
