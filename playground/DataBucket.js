JSMpeg.DataBucket = (function () {
  "use strict";
  var DataBucket = function () {
    this.bits = null;
    this.leftoverBytes = null;
  };

  DataBucket.prototype.write = function (buffer) {
    if (this.leftoverBytes) {
      var totalLength = buffer.byteLength + this.leftoverBytes.byteLength;
      this.bits = new JSMpeg.BitBuffer(totalLength);
      this.bits.write([this.leftoverBytes, buffer]);
    } else {
      this.bits = new JSMpeg.BitBuffer(buffer);
    }
  };

  return DataBucket;
})();

JSMpeg.Player = (function () {
  "use strict";

  var Player = function (url, options) {
    this.options = options || {};

    this.source = new JSMpeg.Source.AjaxProgressive(url, options);
    options.streaming = false;

    // this.demuxer = new JSMpeg.Demuxer.TS(options);
    this.demuxer = new JSMpeg.DataBucket(options);
    this.source.connect(this.demuxer);

    this.source.start();

    this.paused = true;
    this.unpauseOnShow = false;
  };

  return Player;
})();
