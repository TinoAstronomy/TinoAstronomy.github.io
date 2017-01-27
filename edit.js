var config = {
  apiKey: "AIzaSyB4jzEEWgy0V_LHMoE8gnC9E_HXZTxcY7U",
  authDomain: "websitedata-8fff2.firebaseapp.com",
  databaseURL: "https://websitedata-8fff2.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "767987928887"
};
firebase.initializeApp(config);
var db = firebase.database();

$(document).ready(function() {
  var password = prompt("What is the password?");
  if(password != null && password == "Astronomy$2015!") {
    $("#dashboard").css('opacity', '1');
  }
  $('#message-body').trigger('autoresize');
  $('#message-body').val("@header:\n@author:\n@profile:\n@title:\n@date:\n\n#Add a paragraph between hash signs.#\n\n@img: Astro2.png\n@sub: add subtitles to images\n\n#Add another paragraph#\n");
  $('#send').click(function() {
    db.ref('/posts').push($('#message-body').val());
    Materialize.toast("Announcement uploaded!", 1000);
    $('#message-body').val("@header:\n@author:\n@profile:\n@title:\n@date:\n\n#Add a paragraph between hash signs.#\n\n@img: Astro2.png\n@sub: add subtitles to images\n\n#Add another paragraph#\n");
  });
});
