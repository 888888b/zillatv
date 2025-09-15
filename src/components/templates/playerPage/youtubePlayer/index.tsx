import { useEffect, useRef } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
};

type ComponentProps = {
  videoID: string;
};

export default function YouTubePlayer(props: ComponentProps) {
  const { videoID } = props;
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // criar a tag script e injetar o código da API do YouTube
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    //criar o player quando a API estiver pronta
    const loadYT = window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '100%',
        width: "100%",
        videoId: videoID,
        playerVars: {
          playsinline: 0,
          controls: 0,
          modestbranding: 0,
          rel: 0,
          showinfo: 0,
          fs: 0,
          disablekb: 0,
          iv_load_policy: 3,
          autoplay: 1
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      loadYT();
    } else {
      window.onYouTubeIframeAPIReady = loadYT;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    // limpeza ao desmontar o componente
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoID]);

  // iniciar o player assim que estiver pronto
  const onPlayerReady = (event: any) => {
    event.target.playVideo();
  };

  // exemplo: parar após 6 segundos
  let done = false;
  const onPlayerStateChange = (event: any) => {
  };

  const stopVideo = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
    };
  };

  return (
    <div className="pointer-events-none scale-150" ref={containerRef} />
  );
};
