import { App, Modal, Setting, Events } from 'obsidian'
import { PlaylistSettings } from '../types'
import { AudioFileSuggester } from 'src/suggesters/AudioFileSuggester'

export default class PlaylistModal extends Modal {
  settings: PlaylistSettings
  events: Events
  index: number

  constructor(app: App) {
    super(app)
    this.events = new Events()
  }

  onOpen(): void {
    this.setTitle('Playlist Settings')
    this.events.trigger('playlist-modal-open')
    this.contentEl.empty()
    this.display()
  }

  onClose(): void {
    this.events.trigger('playlist-modal-close', { settings: this.settings, index: this.index })
  }

  loadSettings(settings: PlaylistSettings, index: number): void {
    this.settings = settings
    this.index = index
  }

  reload(): void {
    this.contentEl.empty()
    this.display()
  }

  display(): void {
    const { contentEl } = this
    new Setting(contentEl).setName('Volume').addSlider((slider) => {
      slider
        .setLimits(0, 100, 1)
        .setDynamicTooltip()
        .setValue(this.settings.volume)
        .onChange((value) => {
          this.settings.volume = value
        })
    })

    new Setting(contentEl).setName('Loop Playlist').addToggle((toggle) => {
      toggle.setValue(this.settings.loop).onChange((value) => {
        this.settings.loop = value
      })
    })

    new Setting(contentEl).setName('Audio Files').setHeading()

    this.settings.audioPaths.forEach((value, index) => {
      const setting = new Setting(contentEl)
        .addSearch((search) => {
          new AudioFileSuggester(this.app, search.inputEl)
          search
            .setPlaceholder('Enter Audio File Path')
            .setValue(value)
            .onChange((value) => {
              this.settings.audioPaths[index] = value
            })
        })
        .addExtraButton((button) => {
          button.setIcon('chevron-up').onClick(() => {
            if (index - 1 >= 0) {
              const item = this.settings.audioPaths.splice(index, 1)[0]
              this.settings.audioPaths.splice(index - 1, 0, item)
              this.reload()
            }
          })
        })
        .addExtraButton((button) => {
          button.setIcon('chevron-down').onClick(() => {
            if (index + 1 < this.settings.audioPaths.length) {
              const item = this.settings.audioPaths.splice(index, 1)[0]
              this.settings.audioPaths.splice(index + 1, 0, item)
              this.reload()
            }
          })
        })
        .addExtraButton((button) => {
          button
            .setIcon('cross')
            .setTooltip('Remove')
            .onClick(() => {
              this.settings.audioPaths.splice(index, 1)
              this.reload()
            })
        })
      setting.settingEl.addClass('setting-input-full-width')
    })
    new Setting(contentEl).addButton((button) => {
      button.setButtonText('Add Audio File').onClick(() => {
        this.settings.audioPaths.push('')
        this.reload()
      })
    })
  }
}
