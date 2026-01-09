import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./MusicPlayer.css";

const MusicPlayer = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
      }
    }
  };

  // Expose play/pause methods to parent components
  useImperativeHandle(ref, () => ({
    play: () => {
      const audio = audioRef.current;
      if (audio && !isPlaying) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    },
    pause: () => {
      const audio = audioRef.current;
      if (audio && isPlaying) {
        audio.pause();
        setIsPlaying(false);
      }
    },
    toggle: () => {
      toggleMusic();
    },
    setTrackAndPlay: (src) => {
    console.log("Changing to track:", src);
    const audio = audioRef.current;
    if (audio) {
      audio.pause(); // stop current
      audio.src = src;
      audio.load();
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.error("Play failed:", e));
    }
  }
  }));

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
        <source src="/moosic.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        className="music-toggle"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? "⏸ Pause Music" : "🎵 Play Music"}
      </button>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";

export default MusicPlayer;
