import { App } from 'obsidian'
import AudioFile from './AudioFile'

export default class AudioPlaylist {
  name: string = ''
  volume: number = 0.5
  loop: boolean = false
  audioFiles: AudioFile[] = []

  constructor(app: App, name: string, audioPaths: string[], volume: number, loop: boolean) {
    this.name = name
    this.volume = volume
    this.loop = loop
    audioPaths.forEach(path => {
      this.audioFiles.push(new AudioFile(app, path, volume))
    })
  }

  // Maybe also pass back what file currently on
  get state(): string {
    this.audioFiles.forEach(audioFile => {
      if (audioFile.state !== 'stopped') return audioFile.state
    })

    return 'stopped'
  }

  getCurrentAudio(): number | null {
    this.audioFiles.forEach((audioFile, index) => {
      if (audioFile.state !== 'stopped') return index
    })

    return null
  }

  play(): void {
    if (this.state === 'paused') {
      const audioIndex = this.getCurrentAudio()
      if (audioIndex) this.audioFiles[audioIndex].play()
    } else if (this.state === 'stopped') {
      this.audioFiles[0].play()
    }
  }

  pause(): void {
    this.audioFiles.forEach(audioFile => {
      if (audioFile.state === 'playing') audioFile.pause()
    })
  }

  stop(): void {
    this.audioFiles.forEach(audioFile => {
      if (audioFile.state === 'playing') audioFile.stop()
    })
  }
}
