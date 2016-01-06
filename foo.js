(function(d){

var $ = function(id){ return d.getElementById(id) };

function json2list(json){

    var divObj = document.getElementById("music");
    
    var result_container = d.createElement("div");
    result_container.className="result-container";
    result_container.style.padding="10px";
    result_container.style.width="280px";
    result_container.style.minHeight="100px";
    result_container.style.overflow = "hidden";
    result_container.style.borderRadius = "10px";
    result_container.style.backgroundColor = "#fff6e6";
    result_container.style.backgroundOpacity = "0.5";
    result_container.style.marginRight = "auto";
    result_container.style.marginLeft = "auto";
    result_container.style.marginTop = "10px";
    result_container.style.marginBottom = "10px";

    var container_left = d.createElement("div");
    container_left.className="container-left";
    container_left.style.float="left";
    container_left.style.width="100px";
    container_left.style.height="100px";
    container_left.style.marginRight="12px";

    var container_right = d.createElement("div");
    container_right.className="container-right";
    container_right.style.float="left";
    container_right.style.width="168px";

    var ul = d.createElement('div');
    ul.style.listStyleType = 'none';

    if (json['artworkUrl100']){
      var img = d.createElement('img');
      img.src = json['artworkUrl100'];
      img.style.borderRadius = "50px 50px 50px 50px";

      container_left.appendChild(img);

      var soso = d.createElement('div');
      soso.innerHTML = json['artistName'];
      soso.id = "soso";
      soso.style.marginLeft = "2px";
      container_right.appendChild(soso);
      
      var you = d.createElement('div');
      you.innerHTML = json['itemName'];
      you.id = "you";
      you.style.wordWrap = "break-word";
      you.style.marginLeft = "2px";
      container_right.appendChild(you);
    
      var ryubi = d.createElement('audio');
      ryubi.id = json['previewUrl'];
      ryubi.src = json['previewUrl'];
      container_right.appendChild(ryubi);

      var lowbox = d.createElement('div');
      lowbox.style.width = "168px";
      lowbox.style.marginTop = "10px";

      container_right.appendChild(lowbox);

      var play = d.createElement('a');
      play.innerHTML = '<input type="image" src="img/play.png" width="50px" onclick="document.getElementById(\'' + json['previewUrl'] + '\').play()">';
      lowbox.appendChild(play);

      var stop = d.createElement('a');
      stop.innerHTML = '<input type="image" src="img/stop.png" width="50px" onclick="document.getElementById(\'' + json['previewUrl'] + '\').pause()">';
      stop.style.marginLeft = "9px";
      stop.style.marginRight = "9px";
      lowbox.appendChild(stop);
     
      var tweet = d.createElement('a');
      tweet.innerHTML = '<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script><a href="http://twitter.com/share?url=soundsgood.moo.jp/&text=\'' + json['artistName'] + '\'の\'' + json['itemName'] + '\'を試聴しました！\'' + json['previewUrl'] + '\'&hashtags=SoundsGood"><img src="img/tweet.png" width="50px" height="25px"></a>';
      lowbox.appendChild(tweet);

      result_container.appendChild(container_left);
      result_container.appendChild(container_right);
      divObj.appendChild(result_container);

    }

    var keys = [];
    for (var keyName in json) {

      keys[keys.length] = keyName;
    }
    keys.sort();
    
    for (var i = 0, l = keys.length; i < l ; i++) {
      var keyName = keys[i];
      if (keyName.match(/artistName/) || keyName.match(/itemName/) || keyName.match(/trackId/) || keyName.match(/previewUrl/)) {
        var li = d.createElement('li');
        li.appendChild(d.createTextNode(''));
        
        ul.appendChild(li);
      }
    }
    return ul;
};

JSONP = {
  get:function(term){
    var url = 'http://ax.phobos.apple.com.edgesuite.net'
          + '/WebObjects/MZStoreServices.woa/wa/itmsSearch?'
          + ['output='   + 'json',
             'callback=' + 'JSONP.run',
             'country='  + 'JP',
             'entity='   + 'song',
             'lang='     + 'ja_jp',
             'term='     + encodeURIComponent(term)
          ].join('&');
    var scriptTag = d.createElement('script');
    scriptTag.charset = 'UTF-8';
    scriptTag.id = url;
    scriptTag.src = url;
    d.body.appendChild(scriptTag);
  },
  
  run:function(json){
    $('music').innerHTML = '';
    if (json.errorMessage){
         $('music').appendChild(json.errorMessage);
    }else{
      var ol = d.createElement('ol')
      ol.style.listStyleType = 'none';

      for (var i = 0, len = json.resultCount; i < 100; i++){
        if (!json.results[i]) continue;
        var li = d.createElement('li');
        li.appendChild(json2list(json.results[i]));
        ol.appendChild(li);
      }
    $('music').appendChild(ol)
    }
  }
};

})(document);