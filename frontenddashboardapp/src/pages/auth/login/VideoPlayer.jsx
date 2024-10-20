import React, { useState } from 'react';



const VideoPlayer = ({ videoId }) => {

    
    const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <div>
        <iframe
          width="560"
          height="315"
          src={youtubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
  export default VideoPlayer;
  