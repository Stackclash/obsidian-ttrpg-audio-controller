import AudioFile from './AudioFile'

export default class AudioPlaylist {
    name:  string
    volume: number
    loop: boolean
    audioFiles: AudioFile[]
    
    constructor(name: string, audioPaths: string[], volume: number, loop: boolean) {
        this.name = name
        this.volume = volume
        this.loop = loop
        audioPaths.forEach(path => {
            audioFiles.push(new AudioFile(path, volume))
        })
    }
    
    // Maybe also pass back what file currently on
    get state(): string {
        this.audioFiles.forEach(audioFile => {
            if (audioFile.state !== 'stopped') return audioFile.state
        })
        
        return 'stopped'
    }
    
    play(): void {
      
    }

    pause(): void {
      
    }

    stop(): void {
      
    }
} 