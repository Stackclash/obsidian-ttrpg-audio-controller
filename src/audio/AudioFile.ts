import { TFile } from 'obsidian'

export default class AudioFile {
  tfile: TFile
  state: 'playing' | 'paused' | 'stopped' = 'stopped'
  audioEl: HTMLAudioElement

  constructor(tfile: TFile) {
    this.tfile = tfile

    const audioElement = document.createElement('audio')
    audioElement.src = this.tfile.vault.getResourcePath(this.tfile)

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
