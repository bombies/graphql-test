import { SpotifyAPI } from "./datasources/spotify-api";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    Mutation: {
        addItemsToPlaylist: async (
            _,
            { input },
            { dataSources: { spotifyAPI } }
        ) => {
            try {
                const response = await spotifyAPI.addItemsToPlaylist(input);
                if ("snapshot_id" in response)
                    return {
                        code: 200,
                        success: true,
                        message: "Tracks added to playlist!",
                        playlistId: response.snapshot_id,
                    };
                else throw Error("snapshot_id property not found!");
            } catch (e) {
                return {
                    code: 500,
                    success: false,
                    message: `Something went wrong: ${e}`,
                    playlistId: null,
                };
            }
        },
    },
    AddItemsToPlaylistPayload: {
        playlist: ({ playlistId }, _, { dataSources: { spotifyAPI } }) => {
            return spotifyAPI.getPlaylist(playlistId);
        },
    },
    Query: {
        featuredPlaylists: (_, __, { dataSources }) =>
            dataSources.spotifyAPI.getFeaturedPlaylists(),
        playlist: (_, { id: playlistId }, { dataSources }) =>
            dataSources.spotifyAPI.getPlaylist(playlistId),
    },
    Playlist: {
        tracks: ({ tracks, id }, _, { dataSources }) => {
            if ("items" in tracks)
                return tracks.items.map(({ track }) => track);
            return dataSources.spotifyAPI.getTracks(id);
        },
    },
    Track: {
        durationMs: (parent) => parent.duration_ms,
    },
};
