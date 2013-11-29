$(document).ready(function(){

  function listVideos(query, maxResults) {
    $.ajax({
      type:"GET",
      url:'http://gdata.youtube.com/feeds/videos',
      data: {
        'q':query,
        'start-index':'1',
        'max-results':maxResults,
        'alt':'json-in-script',
        'format':'1'
      },
      dataType:    'jsonp',

      success: function(data) {
        var html = '';
        if(data.feed.openSearch$totalResults.$t > 0){
         var entries = data.feed.entry;
         for(var i=0;i<entries.length;i++){
           html += '<a href="' + entries[i]['media$group']['media$content'][0]['url'] + '" target="_blank">';
           html += '<div class="slider">';
           html += '<img src="'+ entries[i]['media$group']['media$thumbnail'][0]['url']+'" class="active"/>';
           html += '<img src="'+ entries[i]['media$group']['media$thumbnail'][1]['url']+'"/>';
           html += '<img src="'+ entries[i]['media$group']['media$thumbnail'][2]['url']+'"/>';
           html += '<img src="'+ entries[i]['media$group']['media$thumbnail'][3]['url']+'"/>';
           html += '</div>';
           html += '</a>';         
         }
        }else{
         html += "<p>not found</p>";
        }
        document.getElementById("search-container").innerHTML = html;
      },
     
      error: function(){
        alert('An error occured, try again!');
      }
    });
  }

  // Search videos
  $('#search-button').on('click', function(){
    var query = document.getElementById("query").value;
    var maxResults = 40;

    listVideos(query, maxResults);
  });

});



