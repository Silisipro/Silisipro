import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { videoPlaylist } from '../../../store/serviceSlice/servicegoogleSlice';

const PlaylistVideos = () => {
    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const { videoList, loading, error } = useSelector((state) => state.servicegoogle);
    console.log(videoList);
    
    useEffect(() => {
        if (playlistId) {
            dispatch(videoPlaylist({ playlistId, maxResults: 30 }));
        }
    }, [dispatch, playlistId]);

    return (
        <div>
            <h2 className="text-2xl text-white font-semibold mb-4">Videos in Playlist</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {videoList && videoList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videoList.map((video) => (
                        <div key={video.id} className="bg-white shadow-md truncate rounded-lg p-4">
                            <h3 className="truncate font-bold">{video.snippet.title}...</h3>
                            <p className="truncate">{video.snippet.description}</p>
                            <iframe
                                width="100%"
                                height="200"
                                src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={video.snippet.title}
                            ></iframe>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No videos found in this playlist.</p>
            )}
        </div>
    );
};

export default PlaylistVideos;
