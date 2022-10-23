
export class RoomData {
    type: string;
    petState: string;
    quests: string[];
    items: string[];
}

export default class LevelData {
    petId: string;
    rooms: RoomData[];

    public static parseFrom(json: any): LevelData {
        const levelData = json as LevelData;
        return levelData;
    }
}