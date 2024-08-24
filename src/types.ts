export interface AudioFolderSettings {
  folderPath: string
  volume: number
  loop: boolean
}

export interface PlaylistSettings {
  name: string
  audioPaths: string[]
}

export interface SceneSettings {
  name: string
  audioPaths: string[]
}

export interface TtrpgAudioControllerSettings {
  audioFolderSettings: AudioFolderSettings[]
  playlists: PlaylistSettings[]
  scenes: SceneSettings[]
}
