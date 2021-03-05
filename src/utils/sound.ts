export class Sound {
    private audio: any;

    constructor() {
        this.audio = null;
    }

    public async addFile(path: string, volume: number) {
        this.audio = new Audio(path);        
        this.audio.volume = volume;
    }

    public play(assetId: string) {
        this.audio.play({assetId});
    }
}

const sound = new Sound();
export default sound;
