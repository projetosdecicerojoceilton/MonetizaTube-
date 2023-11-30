 window.onload = function() {

  
   let msg = document.getElementById("msg")

   let exibeMsg = false
  
  function listarEExecutarVideos(linkPlaylist) {
    const regex = /[?&]list=([^&]+)/;
    const match = linkPlaylist.match(regex);

    if (match && match[1]) {
      const playlistId = match[1];
      const key = 'AIzaSyCamz33adD2c_cSenIF85h1WiQCanF2jsc';
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${key}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const videoIds = data.items.map(item => item.snippet.resourceId.videoId);
          let currentIndex = 0;

          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          const firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

          window.onYouTubeIframeAPIReady = function () {
            const videoPlayer = document.getElementById('player'); // Elemento onde o player será inserido
            const player = new YT.Player(videoPlayer, {
              height:320,
              width: 350,
              playerVars: {
                autoplay: 1,
                enablejsapi: 1
              },
              events: {
                onReady: function (event) {
                  function playVideo(index) {
                    if (index < videoIds.length) {
                      event.target.loadVideoById(videoIds[index]);

                      
               

                      event.target.addEventListener('onStateChange', function (event) {
                        if (event.data === YT.PlayerState.PLAYING && exibeMsg == false) {
                         
                          setTimeout(() => {
                        event.target.pauseVideo();
                      msg.innerHTML = `Curta o vídeo <a href="youtube-video.html?v=${player.getVideoUrl()}" target="_blank"> Ir para youtube.com </a>`;
                      }, 15000);
                      
                      setTimeout(()=> {
                      msg.innerHTML=""
                      }
                       ,30000 )

                       exibeMsg = true
                         
                       
                         
                       }
                       if (event.data === YT.PlayerState.ENDED) {
                          playVideo(index + 1);
                          exibeMsg = false
                          count ++
                        }
                      });
                    } else {
                      console.log('Todos os vídeos foram reproduzidos.');
                    }
                  }

                  playVideo(currentIndex);
                }
              }
            });
          };
        })
        .catch(error => console.error('Erro ao buscar vídeos da playlist:', error));
    } else {
      console.error('Link da playlist do YouTube inválido.');
    }
  }

  const linkPlaylist = 'https://youtube.com/playlist?list=PL4l12TFbPFPKs8Ob_8qIDUU9JEuhPgDWp&si=VNXqWqVMQdNWODPe';
  listarEExecutarVideos(linkPlaylist);
};
