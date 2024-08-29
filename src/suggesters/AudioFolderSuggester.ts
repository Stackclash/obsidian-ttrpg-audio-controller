// Credits go to Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes

import { AbstractInputSuggest, App, TAbstractFile, TFolder } from 'obsidian'

export class AudioFolderSuggester extends AbstractInputSuggest<TFolder> {
  inputEl: HTMLInputElement

  constructor(app: App, inputEl: HTMLInputElement) {
    super(app, inputEl)
    this.inputEl = inputEl
  }

  getSuggestions(inputStr: string): TFolder[] {
    const abstractFolders = this.app.vault.getAllFolders()
    const folders: TFolder[] = []
    const lowerCaseInputStr = inputStr.toLowerCase()

    abstractFolders.forEach((file: TAbstractFile) => {
      if (file instanceof TFolder && file.path.toLowerCase().contains(lowerCaseInputStr)) {
        folders.push(file)
      }
    })

    return folders.slice(0, 1000)
  }

  renderSuggestion(folder: TFolder, el: HTMLElement): void {
    el.setText(folder.path)
  }

  selectSuggestion(folder: TFolder): void {
    this.inputEl.value = folder.path
    this.inputEl.trigger('input')
    this.close()
  }
}
