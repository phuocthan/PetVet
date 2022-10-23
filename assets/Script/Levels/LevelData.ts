export type UseItemType = 'SEQUENCE' | 'FREE';

export class RoomData {
    type: string;
    petState: string;
    items: string[];
    useType: UseItemType;
}

export default class LevelData {
    petId: string;
    rooms: RoomData[];

    public static parseFrom(json: any): LevelData {
        const levelData = json as LevelData;
        return levelData;
    }
}