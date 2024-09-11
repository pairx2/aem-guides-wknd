$(document).ready(function () {
  if ($("div").hasClass("pano")) {
    embedpano({
      swf: "files/tour.swf",
      xml: "/content/dam/corp/abbottcore/virtualtour/files/tour.xml",
      target: "pano",
      html5: "auto",
      mobilescale: 1.0,
      passQueryParameters: true,
      consolelog: true,
    });
  }
});
