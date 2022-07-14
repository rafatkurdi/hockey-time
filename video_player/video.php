
<html lang="cs">
<head>
<meta charset="utf-8" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet" href="//assets.livebox.cz/flowplayer/7.2.5/skin/skin.css">
<link rel="stylesheet" href="//play.elh.livebox.cz/css/vod-clip.css">
<script src="//assets.livebox.cz/jquery-1.11.1.min.js"  type="text/javascript"></script>
    <script type="text/javascript">
/* <![CDATA[ */


if(window.location.hostname!="dev.hokej.cz" && window.location.pathname!="/tv/hokejka/elh")
{
	//document.write(unescape("%3Cscript src='https://publisher.caroda.io/videoPlayer/caroda.min.js?ctok=0323d82660232006462908c08f' crossorigin='anonymous' defer type='text/javascript'%3E%3C/script%3E"));
}




document.write(unescape("%3Cscript src='//play.elh.livebox.cz/js/vod-clip.js?__toka"+
		"' type='text/javascript'%3E%3C/script%3E"));
  
/* ]]> */
    </script> 
<style>
.flowplayer .fp-color-play {
  fill: #f00;
}
/* .flowplayer .fp-play
{
	background-image: url(http://test.hokejcz.s6.esports.cz/images/youtube-play.svg);
} */
.flowplayer .fp-pause {
  display: none;
}
svg:hover path{
	fill: #000000;
}

.flowplayer .fp-play svg {
  /*height: 0;*/
}
</style>
<title>ELH Live Player</title>
</head>

<body style="width:100%; margin:0; border:0;">
	<!-- <select id="quality"><option value="auto">AUTO</option><option value="single-1">Single 1080p</option><option value="single-2">Single 720p</option>
<option value="single-3">Single 480p</option><option value="single-4">Single 360p</option></select><button id="send" type="button" >OK</button> -->
	<div id="lbx"></div>
	<script type="text/javascript">
	let url = window.location.href;
	let paramaters = (new URL(url)).searchParams;
	var playlist = paramaters.get("playlist") ;

	console.log("Playlist", JSON.parse(playlist) )
	
	function playVideo(){
		setTimeout(() => {
			var container = document.getElementById("lbx");
			if (typeof flowplayer(container) != "undefined") {
        	    flowplayer(container).load({
        	        sources: [{
        	            live: true,
        	            type: "application/x-mpegurl",
        	            src: "",
        	            name: "LIVE"
        	        }]
        	    });
        	    flowplayer(container).stop();
        	    flowplayer(container).unload();
        	    flowplayer(container).shutdown();
        	}
			LiveboxVODPlayer.vod({
				dom_id: 'lbx',
				playlist: playlist,
				quality: 0,
				auth: '_any_|1644592728|05092d0e1a5246d1cac9b2aa1ec56d6298782987',
				poster: 'https://drive.google.com/uc?export=view&id=1m2M_fncJ1PPospFWSibOB3Ii0AmwiEru',
				related: "something",
				autostart: true,
				mute: false
			});
		}, 200);
	}
	
	$( document ).ready(function() {
		if(playlist){
			try{
				playVideo()
			}
			catch{
				playVideo()
			}
		}
		
		/* $("#send").click(function() { */
			//var j = JSON.parse($("#json").val());
			//console.log(j);

		/* }); */


		console.log("ready")
	});

	</script>
	<script src="https://publisher.caroda.io/videoPlayer/caroda.min.js?ctok=0323d82660232006462908c08f" crossorigin="anonymous" defer></script>
</body>
</html>
