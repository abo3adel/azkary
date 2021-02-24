class Sound {
    private audio: any;

    constructor() {
        this.audio = null;
    }

    public async addFile(path: string, id: string) {
        this.audio = new Audio(path);

    }

    public play(assetId: string) {
        this.audio.play({assetId});
    }
}

const sound = new Sound();
export default sound;
