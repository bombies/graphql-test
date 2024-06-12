import { RESTDataSource } from "@apollo/datasource-rest";
import { AddItemsToPlaylistInput, Playlist, Track } from "../types";
import { PlaylistModel, SnapshotOrError, TrackModel } from "../models";

export class SpotifyAPI extends RESTDataSource {
    baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";

    async getFeaturedPlaylists() {
        const response = await this.get<{
            playlists: { items: PlaylistModel[] };
        }>("browse/featured-playlists");
        return response?.playlists?.items ?? [];
    }

    async getPlaylist(playlistId: string) {
        return this.get<PlaylistModel>(`playlists/${playlistId}`);
    }

    async getTracks(playlistId: string) {
        const response = await this.get<{ items: { track: TrackModel }[] }>(
            `playlists/${playlistId}/tracks`
        );
        return response?.items?.map(({ track }) => track) ?? [];
    }

    addItemsToPlaylist({ playlistId, uris }: AddItemsToPlaylistInput) {
        return this.post<SnapshotOrError>(`playlists/${playlistId}/tracks`, {
            params: {
                uris: uris.join(","),
            },
        });
    }
}
