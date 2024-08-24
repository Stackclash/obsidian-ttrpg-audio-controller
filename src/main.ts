import { Editor, Notice, Plugin } from 'obsidian'
import { TtrpgAudioControllerSettings } from './types'
import { DEFAULT_SETTINGS, TtrpgAudioControllerSettingTab } from './settings'

export default class TtrpgAudioControllerPlugin extends Plugin {
  settings: TtrpgAudioControllerSettings

  async onload() {
    await this.loadSettings()

    // This creates an icon in the left ribbon.
    const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', () => {
      // Called when the user clicks the icon.
      new Notice('This is a notice!')
    })
    // Perform additional things with the ribbon
    ribbonIconEl.addClass('my-plugin-ribbon-class')

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    const statusBarItemEl = this.addStatusBarItem()
    statusBarItemEl.setText('Status Bar Text')

    // This adds an editor command that can perform some operation on the current editor instance
    this.addCommand({
      id: 'sample-editor-command',
      name: 'Sample editor command',
      editorCallback: (editor: Editor) => {
        console.log(editor.getSelection())
        editor.replaceSelection('Sample Editor Command')
      },
    })

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new TtrpgAudioControllerSettingTab(this.app, this))

    // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
    // Using this function will automatically remove the event listener when this plugin is disabled.
    this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
      console.log('click', evt)
    })

    // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
    this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000))
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}
