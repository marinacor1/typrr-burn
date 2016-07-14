class Painter {

removeInstructions() {
  $('.how-to-text').fadeOut(300, function() {
    $(this).text("");
  });
}
}




var painter = new Painter();

module.exports = painter;
