$(document).ready(function () {
  $("#sidebar-overlay").click(function () {
    closeSidebar()
  });

  $("#sidebar-button").click(function () {
    openSidebar()
  });

  function closeSidebar() {
    $(".sidebar").css("width", "0px")
    const overlay = $(".overlay");
    overlay.css("opacity", "0")
    overlay.css("pointer-events", "none")
  }

  function openSidebar() {
    $(".sidebar").css("width", "300px")
    const overlay = $(".overlay");
    overlay.css("opacity", "1")
    overlay.css("pointer-events", "initial")
  }
});
