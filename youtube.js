$(document).ready(function(){

  function listVideos(query, maxResults) {
    $.ajax({
      type:"GET",
      url:'http://gdata.youtube.com/feeds/videos/',
      data: {
        'q':query,
        'start-index':'1',
        'max-results':maxResults,
        'alt':'json-in-script',
        'format':'1',
        'orderby': 'published'
      },
      dataType:'jsonp',

      success: function(data) {
        var html = '';
        if(data.feed.openSearch$totalResults.$t > 0){
         var entries = data.feed.entry;
         for(var i=0;i<entries.length;i++){

           var video_url = entries[i]['media$group']['media$content'][0]['url'];
           var title = entries[i]['media$group']['media$title']['$t'];
           var duration = entries[i]['media$group']['yt$duration']['seconds'];
           var published_date = new Date(entries[i]['published']['$t']).toLocaleDateString();
           if (entries[i]['yt$statistics']) {
            var views = entries[i]['yt$statistics']['viewCount'];
           } else {
            var views = 'Undefined';
           }
           var thumbnail_url = entries[i]['media$group']['media$thumbnail'][0]['url'];

           html += '<a href="' + video_url + '" target="_blank">';
           html += '<p class="title">'+ title +'</p>';
           html += '<p>Duration: ' + toHHMMSS(duration) + '</p>';
           html += '<p>Published: ' + published_date + '</p>';
           html += '<p>Views: ' + commafy(views) + '</p>';
           html += '<img src="' + thumbnail_url + '"/>';
           html += '</a>';        
         }
        }else{
         html += "<p>not found</p>";
        }
        document.getElementById("search-container").innerHTML = html;
      },
     
      error: function(){
        alert('Damnnnn... An error occured, try again!');
      }
    });
  }

  // Add comma to make the number readable
  // http://stackoverflow.com/a/6785438/477958
  function commafy( num ) {
      var str = num.toString().split('.');
      if (str[0].length >= 5) {
          str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
      }
      if (str[1] && str[1].length >= 5) {
          str[1] = str[1].replace(/(\d{3})/g, '$1 ');
      }
      return str.join('.');
  }

  // Time formatting
  //http://stackoverflow.com/questions/6312993/javascript-seconds-to-time-with-format-hhmmss
  function toHHMMSS(seconds) {
    var sec_num = parseInt(seconds, 10); 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
  }

  // Search videos
  $('#search-button').on('click', function(){
    var query = document.getElementById("query").value;
    var maxResults = 40;

    listVideos(query, maxResults);
  });

});




