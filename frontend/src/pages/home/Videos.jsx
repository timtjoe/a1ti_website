import { useState } from 'react';
import { Link } from 'react-router';
import { VIDEO_STORIES } from './videoData';
import styles from './Videos.module.css';

function getEmbedUrl(url) {
  if (!url) return '';
  try {
    const parsedUrl = new URL(url);
    if (!['youtu.be', 'youtube.com', 'www.youtube.com', 'm.youtube.com', 'www.youtube-nocookie.com'].includes(parsedUrl.hostname)) {
      return '';
    }
    const videoId = parsedUrl.hostname.includes('youtu.be')
      ? parsedUrl.pathname.slice(1)
      : parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').filter(Boolean).pop();
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '';
  } catch {
    return '';
  }
}

function VideoPlayer({ video, compact }) {
  const embedUrl = getEmbedUrl(video.youtubeUrl);

  return (
    <div className={styles.player}>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <img src={video.image} alt="" />
      )}
      <div className={styles.playerCaption}>
        <p>{video.category} · {video.author}</p>
        <h3>{video.title}</h3>
      </div>
      {!embedUrl && (
        <span className={styles.playIcon} aria-hidden="true">
          <span className="material-symbols-outlined">play_arrow</span>
        </span>
      )}
      {compact && <span className={styles.compactLabel}>A-1 videos</span>}
    </div>
  );
}

export function VideoExplorer({ fullPage = false }) {
  const visibleVideos = fullPage ? VIDEO_STORIES : VIDEO_STORIES.slice(0, 3);
  const [selectedVideo, setSelectedVideo] = useState(visibleVideos[0]);

  return (
    <section className={`${styles.section} ${fullPage ? styles.fullPage : ''}`} aria-labelledby={fullPage ? 'video-page-title' : 'video-section-title'}>
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>Watch</p>
            <h2 id={fullPage ? 'video-page-title' : 'video-section-title'}>
              {fullPage ? 'YouTube Shorts ad examples' : 'Short ad examples'}
            </h2>
          </div>
          {!fullPage && <Link to="/media/videos">More videos <span aria-hidden="true">→</span></Link>}
        </header>
        <div className={styles.explorer}>
          <div className={styles.videoList} role="list" aria-label="Choose a video">
            {visibleVideos.map((video) => (
              <button
                type="button"
                className={styles.videoItem}
                key={video.id}
                aria-current={selectedVideo.id === video.id ? 'true' : undefined}
                onClick={() => setSelectedVideo(video)}
              >
                <span className={styles.thumbnail}>
                  <img src={video.image} alt="" loading="lazy" />
                  <span className="material-symbols-outlined" aria-hidden="true">play_arrow</span>
                </span>
                <span className={styles.videoDetails}>
                  <strong>{video.title}</strong>
                  <span>{video.category} · {video.author}</span>
                </span>
              </button>
            ))}
          </div>
          <div className={styles.viewer} aria-live="polite">
            <VideoPlayer video={selectedVideo} compact={!fullPage} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoExplorer;
