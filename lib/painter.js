class Painter {

  removeInstructions() {
    $('.how-to-text').fadeOut(20, function() {
      // $(this).text("");
      $(this).html("<div id='bird-logo'><img src='https://github.com/jeneve/t" +
      "yprr-burn/blob/final-stylin/images/bird-logo.png?raw=true' alt='Bird' " +
      "height='150' width='150'><div>");
    });
    $('.how-to-text').fadeIn(20);
  }
}




var painter = new Painter();

module.exports = painter;
