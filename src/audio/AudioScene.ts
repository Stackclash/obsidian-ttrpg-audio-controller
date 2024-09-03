import AudioFile from './AudioFile'
import { SceneAudioSettings } from '../types'
import { App } from 'obsidian'

export default class AudioScene {
  name: string = ''
  audioFiles: AudioFile[] = []

  constructor(app: App, name: string, audioSettings: SceneAudioSettings[]) {
    this.name = name
    audioSettings.forEach(setting => {
      this.audioFiles.push(new AudioFile(app, setting.audioPath, setting.volume, true))
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
        audioFile.pause()
      })
    }
  }

  stop(): void {
    if (this.state === 'playing') {
      this.audioFiles.forEach(audioFile => {
        audioFile.stop()
      })
    }
  }
}
