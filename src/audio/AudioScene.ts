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
    
    get state(): string {
        const state = this.audioFiles[0].state
        return this.audioFiles.every(audioFile => state === audioFile.state) ? state : ''
    }
    
    play(): void {
        if (this.state !== 'playing') {
            this.audioFiles.forEach(audioFile => {
                audioFile.play()
            })
        } 
    }

    pause(): void {
        if (this.state === 'playing') {
            this.audioFiles.forEach(audioFile => {
                audioFile.play()
            })
        }
    }

    stop(): void {
        if (this.state === 'playing') {
            this.audioFiles.forEach(audioFile => {
                audioFile.play()
            })
        }
    }
} 