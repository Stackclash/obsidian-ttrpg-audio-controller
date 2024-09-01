import AudioFile from './AudioFile'
import { SceneAudioSettings } from '../types'

export default class AudioScene {
    name: string
    audioFiles: AudioFile[]
    
    constructor(name: string, audioSettings: SceneAudioSettings[]) {
        this.name = name
        audioSettings.forEach(setting => {
            audioFiles.push(new AudioFile(setting.audioPath, setting.volume, true))
        })
    }
    
    // Maybe also pass back what file currently on
    get state(): string {
        
    }
    
    play(): void {
      
    }

    pause(): void {
      
    }

    stop(): void {
      
    }
} 