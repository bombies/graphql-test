export type PlaylistModel = {
    id: string;
    name: string;
    description: string;
    tracks: PlaylistTracks | FeaturedPlaylistTracks;
};

export type PlaylistTracks = {
    items: {
        track: TrackModel;
    }[];
};

export type FeaturedPlaylistTracks = {
    href: string;
    total: number;
};

export type TrackModel = {
    id: string;
    name: string;
    duration_ms: number;
    explicit: boolean;
    uri: string;
};

export type SnapshotOrError = {
    snapshot_id?: string;
    error?: string;
};

export type AddItemsToPlaylistPayloadModel = {
    code: number;
    success: boolean;
    message: string;
    playlistId?: string;
};
