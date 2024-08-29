import { App, Events, Modal, Setting } from 'obsidian'
import { AudioFileSuggester } from 'src/suggesters/AudioFileSuggester'
import { SceneSettings } from 'src/types'

export default class PlaylistModal extends Modal {
  settings: SceneSettings
  events: Events
  settingIndex: number

  constructor(app: App) {
    super(app)
    this.events = new Events()
  }

  onOpen(): void {
    this.setTitle('Scene Settings')
    this.events.trigger('scene-modal-open')
    this.contentEl.empty()
    this.display()
  }

  onClose(): void {
    this.events.trigger('scene-modal-close', {
      settings: this.settings,
      index: this.settingIndex,
    })
  }

  loadSettings(settings: SceneSettings, index: number): void {
    this.settings = settings
    this.settingIndex = index
  }

  reload(): void {
    this.contentEl.empty()
    this.display()
  }

  display(): void {
    const { contentEl } = this

    const desc = document.createDocumentFragment()
    desc.append(
      'Settings for individual scenes. Each scene can have multiple audio files with their own volume settings.',
    )

    new Setting(contentEl).setDesc(desc)

    new Setting(contentEl).addButton((button) => {
      button
        .setIcon('play')
        .setTooltip('Test Scene')
        .onClick(() => {
          this.app.workspace.trigger('obsidian-ttrpg-audio-controller:play-scene', this.settings)
        })
      if (this.settings.audioSettings.length === 0) {
        button.setDisabled(true)
      }
    })

    this.settings.audioSettings.forEach((audioSetting, index) => {
      const setting = new Setting(contentEl)
        .addSearch((search) => {
          new AudioFileSuggester(this.app, search.inputEl)
          search
            .setPlaceholder('Enter Audio File Path')
            .setValue(this.settings.audioSettings[index].audioPath)
            .onChange((value) => {
              this.settings.audioSettings[index].audioPath = value
            })
        })
        .addSlider((slider) => {
          slider
            .setLimits(0, 100, 1)
            .setDynamicTooltip()
            .setValue(audioSetting.volume)
            .onChange((value) => {
              this.settings.audioSettings[index].volume = value
            })
        })
        .addExtraButton((button) => {
          button
            .setIcon('cross')
            .setTooltip('Remove')
            .onClick(() => {
              this.settings.audioSettings.splice(index, 1)
              this.reload()
            })
        })

      setting.settingEl.addClass('setting-search-input-width-100')
    })

    new Setting(contentEl).addButton((button) => {
      button.setButtonText('Add Audio File').onClick(() => {
        this.settings.audioSettings.push({
          audioPath: '',
          volume: 50,
        })
        this.reload()
      })
    })
  }
}
