// Stolen from https://stackoverflow.com/a/26454035
function GetLatestReleaseInfo() {
  $.getJSON(
    "https://api.github.com/repos/Woukie/WoukieBox2/releases/latest"
  ).done(function (release) {
    UpdateDownloadButton(release, ".exe", $(".setup"));
    UpdateDownloadButton(
      release,
      "Portable.zip",
      "portable.zip",
      $(".portable")
    );
  });
}

function UpdateDownloadButton(release, assetExtension, element) {
  let asset = release.assets.find((asset) =>
    asset.name.endsWith(assetExtension)
  );
  let releaseInfo =
    "Version: " +
    release.tag_name.substring(1) +
    "\nFile size: " +
    (asset.size / 1024 / 1024).toFixed(2) +
    " MB" +
    "\nRelease date: " +
    new Date(asset.updated_at).toLocaleDateString("en-CA") +
    "\nDownload count: " +
    asset.download_count.toLocaleString();

  element.attr("href", asset.browser_download_url);
  element.attr("title", releaseInfo);
}

GetLatestReleaseInfo();
