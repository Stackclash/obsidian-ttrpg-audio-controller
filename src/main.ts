import { Plugin } from 'obsidian'
import { TtrpgAudioManagerSettings } from './types'
import { TtrpgAudioManagerSettingTab } from './settings'
import { DEFAULT_SETTINGS } from './constants'

export default class TtrpgAudioManagerPlugin extends Plugin {
  settings: TtrpgAudioManagerSettings

  async onload() {
    await this.loadSettings()

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new TtrpgAudioManagerSettingTab(this.app, this))
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}
