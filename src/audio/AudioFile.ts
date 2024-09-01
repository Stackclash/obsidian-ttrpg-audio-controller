import { TFile } from 'obsidian'

export default class AudioFile {
  tfile: TFile
  state: 'playing' | 'paused' | 'stopped' = 'stopped'
  audioEl: HTMLAudioElement

  constructor(audioPath: string, volume: number = .5, loop: boolean = false) {
    const tfile = TFile.vault.getFileByPath(audioPath)
    if (tfile) { 
      this.tfile = tfile
    } else {
      throw new Error('file does not exist')
    }  

    const audioElement = document.createElement('audio')
    audioElement.src = this.tfile.vault.getResourcePath(this.tfile)
    audioElement.volume = volume
    audioElement.loop = loop

    this.audioEl = audioElement
  }

  set volume(volume: number) {
    this.audioEl.volume = volume
  }

  get volume(): number {
    return this.audioEl.volume
  }

  set loop(loop: boolean) {
    this.audioEl.loop = loop
  }

  get loop(): boolean {
    return this.audioEl.loop
  }

  play(): void {
    this.audioEl.play()
    this.state = 'playing'
  }

  pause(): void {
    this.audioEl.pause()
    this.state = 'paused'
  }

  stop(): void {
    this.audioEl.pause()
    this.audioEl.currentTime = 0
    this.state = 'stopped'
  }
}
