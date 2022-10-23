export class AttachBone {
    bone: string;
    angle: number;
}

export type PetState = 'IDLE_FUN' | 'IDLE_SAD' | 'FUN' | 'EAT';

export default class PetData {
    id: string;
    bones: {
        tumor: AttachBone[];
        thorn: AttachBone[];
        scratch: AttachBone[];
        plate: AttachBone;
        tongue: AttachBone;
        mouth: AttachBone;
    };
    animations: {
        idle: string[];
        fun: string[];
        eat: string[];
    };
}
