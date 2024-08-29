export interface AudioFolderSettings {
  folderPath: string
  volume: number
  loop: boolean
}

export interface PlaylistSettings {
  name: string
  volume: number
  loop: boolean
  audioPaths: string[]
}

interface SceneAudioSettings {
  audioPath: string
  volume: number
}

export interface SceneSettings {
  name: string
  audioSettings: SceneAudioSettings[]
}

export interface TtrpgAudioControllerSettings {
  audioFolders: AudioFolderSettings[]
  playlists: PlaylistSettings[]
  scenes: SceneSettings[]
}
