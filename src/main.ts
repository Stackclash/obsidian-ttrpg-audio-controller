import { Plugin } from 'obsidian'
import { TtrpgAudioControllerSettings } from './types'
import { DEFAULT_SETTINGS, TtrpgAudioControllerSettingTab } from './settings'

export default class TtrpgAudioControllerPlugin extends Plugin {
  settings: TtrpgAudioControllerSettings

  async onload() {
    await this.loadSettings()

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new TtrpgAudioControllerSettingTab(this.app, this))
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}
