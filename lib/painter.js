class Painter {

  removeInstructions() {
    $('.how-to-text').fadeOut(2000, function() {
      // $(this).text("");
      $(this).html("<div id='bird-logo'><img src='https://s3-us-west-1.ama" +
      "zonaws.com/ideabox/bird-logo.png' alt='Bird' " +
      "height='150' width='150'><div>");
    });
    $('.how-to-text').fadeIn(2000);
  }
}


var painter = new Painter();

module.exports = painter;
