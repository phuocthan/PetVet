export type UseItemType = 'SEQUENCE' | 'FREE';

export class AttachBone {
    name: string;
    angle: number;
}

export class TargetData {
    item: string;
    bones: AttachBone[];
}

export class RoomData {
    type: string;
    state: string;
    targets: TargetData[];
    useType: UseItemType;
}

export type AnimationData = { [key: string]: string[] };

export default class LevelData {
    petId: string;
    animations: AnimationData;
    rooms: RoomData[];

    public static parseFrom(json: any): LevelData {
        const levelData = json as LevelData;
        return levelData;
    }
}
