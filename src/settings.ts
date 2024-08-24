import { App, PluginSettingTab, Setting } from 'obsidian'
import TtrpgAudioControllerPlugin from './main'
import { TtrpgAudioControllerSettings } from './types'

export const DEFAULT_SETTINGS: TtrpgAudioControllerSettings = {
  mySetting: 'default',
}

export class TtrpgAudioControllerSettingTab extends PluginSettingTab {
  plugin: TtrpgAudioControllerPlugin

  constructor(app: App, plugin: TtrpgAudioControllerPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this

    containerEl.empty()

    new Setting(containerEl)
      .setName('Setting #1')
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder('Enter your secret')
          .setValue(this.plugin.settings.mySetting)
          .onChange(async (value) => {
            this.plugin.settings.mySetting = value
            await this.plugin.saveSettings()
          }),
      )
  }
}
