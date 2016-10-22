

/*var paragraph = React.createClass({
  render: function() {
    return (<p>{this.props.text}</p>);
  }
});

var image = React.createClass({
  render: function() {
    return (<div class='image'>
              <img src={this.props.src} />
              <h6>{this.props.sub}</h6>
            </div>);
  }
});

var articleBody = React.createClass({
  render: function() {
    var parts = [];
    for(var elem in this.props.data) {
      if(elem.type == 'para') {
        parts.push(<paragraph text={elem.val} />);
      } else if(elem.type == 'image') {
        parts.push(<image src={elem.src} sub={elem.subtitle} />);
      }
    }
    return (<div class="article-body"> {parts} </div>);
  }
});

var heading = React.createClass({
  render: function() {
    return (<div class="heading">
      <h1 div="title">{this.props.data.title.val}</h1>
      <div class="article-data valign-wrapper">
        <img src={this.props.data.title.profile} class="circle profile" alt="" />
        <h6 class="valign">{this.props.data.title.author}</h6>
        <h6 class="valign">{this.props.data.title.date}</h6>
      </div>
    </div>);
  }
});

var article = React.createClass({
  render: function() {
    return (<div class="container article">
      <heading data={this.props.data} />
      <articleBody data={this.props.data} />
      <div >
        <a href="#" class=" button button-gray valign-wrapper"><i class="material-icons valign">keyboard_arrow_left</i>Return</a>
      </div>
    </div>);
  }
});

var page = React.createClass({
  render: function() {
    return (<div>
      <div class="parallax-container heading-img">
        <div class="parallax"><img src={this.props.data.title.header}/></div>
      </div>
      <article data={this.props.data} />
    </div>);
  }
});*/

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4jzEEWgy0V_LHMoE8gnC9E_HXZTxcY7U",
    authDomain: "websitedata-8fff2.firebaseapp.com",
    databaseURL: "https://websitedata-8fff2.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "767987928887"
  };
  firebase.initializeApp(config);

var url = window.location.href
var id = url.substring(url.indexOf("?") + 1);

var db = firebase.database();
var postData;
var inner;

//ReactDOM.render(<page data={postData} />, document.getElementById('body'));

$(document).ready(function() {
  if(url.indexOf("?") > 0) {
    $(".announces").hide();
    db.ref("/posts/" + id).once('value').then(function (snapshot) {
      postData = snapshot.val();
      inner =
        '<div class="parallax-container heading-img">' +
          '<div class="parallax"><img src="' + postData.title.header +'"></div>' +
        '</div>'+
        '<div class="container article">'+
          '<div class="heading">'+
            '<h1 div="title">'+ postData.title.val +'</h1>'+
            '<div class="article-data valign-wrapper">'+
              '<img src="'+postData.title.profile+'" class="circle profile" alt="" />'+
              '<h6 class="valign">'+postData.title.author+'</h6>'+
              '<h6 class="valign">'+postData.title.date+'</h6>'+
            '</div>'+
          '</div>'+
          '<div class="article-body">';

        snapshot.forEach(function(elem) {
          if(elem.val().type == 'para') {
            inner += '<p>'+elem.val().val+'</p>';
          } else if(elem.val().type == 'image') {
            inner += '<div class="image"><img src="' +elem.val().src+'" alt="" /><h6>'+elem.val().subtitle+'</h6></div>';
          }
        });

        inner += '</div><div ><a href="announcement.html" class=" button button-gray valign-wrapper"><i class="material-icons valign">keyboard_arrow_left</i>Return</a></div></div>';
      $("#body").append(inner);
      $("#ti").append(postData.title.val);
      $('.parallax').parallax();
    });
  } else {
    $("#ti").append("Announcements");
    var append = "";
    db.ref("/posts").once('value').then(function(snapshot) {
      snapshot.forEach(function(elem) {
        var app = "<div class='announcement'>";
        app += "<h2>"+elem.val().title.val+"</h2>";
        app += '<div class="article-data valign-wrapper">'+
          '<img src="'+elem.val().title.profile+'" class="circle profile" alt="" />'+
          '<h6 class="valign">'+elem.val().title.author+'</h6>'+
          '<h6 class="valign">'+elem.val().title.date+'</h6>';
        app += "<a class='right' href='announcement.html?"+ elem.key +"'>more</a></div></div>";
        append += app;
      });
      $("#all-announcements").append(append);
      $('.parallax').parallax();
    });
  }
  $(".button-collapse").sideNav();
});
