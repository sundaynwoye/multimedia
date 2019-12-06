var tracks, video, statusDiv, subtitlesCaptionsDiv;

function init() {  
  video = document.querySelector("#myVideo");
  statusDiv = document.querySelector("#currentTrackStatuses");
  
  subtitlesCaptionsDiv = document.querySelector("#subtitlesCaptions");
  
  //tracks = video.textTracks;
  tracks = document.querySelectorAll("track");
  
  video.addEventListener('loadedmetadata', function() {
      console.log("metadata loaded");
    
      // define cue listeners for the tracks
      for(var i=0; i<tracks.length; i++) {
        var t = tracks[i].track;
        if(t.mode === "showing") {
           t.addEventListener('cuechange', logCue, false);
        }
      }
       
     
      // fill the log
      displayTrackStatus();
  });


}

function displayTrackStatus() {
   for(var i=0; i<tracks.length; i++) {
		var t = tracks[i].track;
        var mode = t.mode;
     
        if(mode === "disabled") {
          mode = "<span style='color:red'>" + t.mode + "</span>";
        } else if(mode === "showing") {
          mode = "<span style='color:green'>" + t.mode + "</span>";
        }
     appendToScrollableDiv(statusDiv, "track "+i+": " + t.label + " "+t.kind+" in "+mode+" mode");
   }
  
  
}

	function appendToScrollableDiv(div, text) {
	    var inner = div.innerHTML;
	    div.innerHTML = inner + text + "<br/>";
      div.scrollTop = div.scrollHeight;

	}



	function clearDiv(div) {
	    div.innerHTML = '';
	}

    function clearSubtitlesCaptions() {
      clearDiv(subtitlesCaptionsDiv);
    }
  
	function toggleTrack(i) {
		var t =  tracks[i].track;
switch (t.mode) {
			case "disabled":
				t.addEventListener('cuechange', logCue, false);
				t.mode = "hidden";
				break;
			case "hidden":
				t.mode = "showing";
				break;
			case "showing":	
				t.removeEventListener('cuechange', logCue, false);
				t.mode = "disabled";
				break;
		}
        clearDiv(statusDiv);
       displayTrackStatus();
		appendToScrollableDiv(statusDiv,"<br>" + t.label+" are now " +t.mode);
	}

	function logCue() {
      console.log("log cues");
		if(this.activeCues && this.activeCues.length) { 
			var t = this.activeCues[0].text;
			appendToScrollableDiv(subtitlesCaptionsDiv, "Active "+this.kind+" changed to: "+t);
		}
	}
