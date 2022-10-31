export class AttachBone {
    type: string;
    angle: number;
}

export type PetState = 'IDLE_FUN' | 'IDLE_SAD' | 'FUN' | 'EAT';

export default class PetData {
    id: string;
    bones: { [key: string]: AttachBone };
    animations: { [key: string]: string[] };
}
