// Setando constraints para o video
//alterado o facingMode para user muda para a camera frontal do celular
var constraints = { video: { facingMode: "environment" }, audio: false };
// Definindo Constants
const cameraView = document.querySelector("#video-camera-view");
const cameraOutput = document.querySelector("#img-camera-output");
const cameraSensor = document.querySelector("#canvas-camera-sensor");
const buttonCapture = document.querySelector("#button-capture");
const mobileDetected = document.querySelector("#device-detected");
const browserDetected = document.querySelector("#browser-detected");
const browserDetected2 = document.querySelector("#browser-detected2");
const imageName = document.querySelector("#image-name");

function loadApp() {
  browserCheck();
  browserCheck2();
  mobileAndTabletCheck();

  cameraLoad();
}

//Acessando a camera do device
function cameraLoad() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Algo deu errado.", error);
    });
}

//metodo de captura de foto
function capturePhoto() {
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  cameraOutput.src = cameraSensor.toDataURL("image/webp");
  cameraOutput.classList.add("photo-view");
  uploadFile();
}

function mobileAndTabletCheck() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  mobileDetected.textContent = "Mobile: " + check;
}

function browserCheck() {
  // Opera 8.0+
  if (
    (!!window.opr && !!opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(" OPR/") >= 0
  ) {
    browserDetected.textContent = "Browser Opera";
    return;
  }

  // Firefox 1.0+
  if (typeof InstallTrigger !== "undefined") {
    browserDetected.textContent = "Browser FireFox";
    return;
  }

  // Safari 3.0+ "[object HTMLElementConstructor]"
  if (
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && safari.pushNotification)
    )
  ) {
    browserDetected.textContent = "Browser Safari";
    return;
  }

  // Internet Explorer 6-11
  if (/*@cc_on!@*/ false || !!document.documentMode) {
    browserDetected.textContent = "Browser IE";
    return;
  }

  // Edge 20+
  if (
    !(/*@cc_on!@*/ (false || !!document.documentMode)) &&
    !!window.StyleMedia
  ) {
    browserDetected.textContent = "Browser Edge";
    return;
  }

  // Chrome 1 - 79
  if (
    !!window.chrome &&
    (!!window.chrome.webstore || !!window.chrome.runtime)
  ) {
    browserDetected.textContent = "Browser Chrome";
    return;
  }
  browserDetected.textContent = "Browser Not Detected";
}

function searchString(data) {
  for (var i = 0; i < data.length; i++) {
    var dataString = data[i].string;
    var dataProp = data[i].prop;
    this.versionSearchString = data[i].versionSearch || data[i].identity;
    if (dataString) {
      if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
    } else if (dataProp) return data[i].identity;
  }
}

function searchVersion(dataString) {
  var index = dataString.indexOf(this.versionSearchString);
  if (index == -1) return;
  return parseFloat(
    dataString.substring(index + this.versionSearchString.length + 1)
  );
}

function browserCheck2() {
  let dataBrowser = [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome",
    },
    {
      string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb",
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version",
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version",
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab",
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror",
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox",
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino",
    },
    {
      // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape",
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE",
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv",
    },
    {
      // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla",
    },
  ];

  let dataOS = [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows",
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac",
    },
    {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod",
    },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux",
    },
  ];

  let browser = searchString(dataBrowser) || "An unknown browser";
  let version =
    searchVersion(navigator.userAgent) ||
    this.searchVersion(navigator.appVersion) ||
    "an unknown version";
  let OS = searchString(dataOS) || "an unknown OS";

  ///// mobile
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  browserDetected2.textContent = `Browser: ${browser} version: ${version} OS:${OS}`;
}

function uploadFile() {
  var dataUrl = cameraSensor.toDataURL("image/jpeg");
  var blobBin = atob(dataUrl.split(",")[1]);
  var array = [];
  for (var i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  //var file = new Blob([new Uint8Array(array)], { type: "image/jpeg" });

  var file = new File([new Uint8Array(array)], "image.jpeg");

  var formdata = new FormData();
  formdata.append("data", file);
  
  //var url = "https://192.168.0.107:3000";
  //var url = "https://uploads-fileserver.herokuapp.com";
  var url = "https://djonathancit-upload-file-node.glitch.me";
  var xhr = new XMLHttpRequest();
  xhr.file = file; // not necessary if you create scopes like this
  xhr.addEventListener(
    "progress",
    function (e) {
      var done = e.position || e.loaded,
        total = e.totalSize || e.total;
      console.log(
        "xhr progress: " + Math.floor((done / total) * 1000) / 10 + "%"
      );
    },
    false
  );
  if (xhr.upload) {
    xhr.upload.onprogress = function (e) {
      var done = e.position || e.loaded,
        total = e.totalSize || e.total;
      console.log(
        "xhr.upload progress: " +
          done +
          " / " +
          total +
          " = " +
          Math.floor((done / total) * 1000) / 10 +
          "%"
      );
    };
  }
  xhr.onreadystatechange = function (e) {
    if (4 == this.readyState) {
      console.log(["xhr upload complete", e]);
    }
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      debugger;
      // Request finished. Do processing here.
      res=JSON.parse(this.response)
      imageName.textContent = res.data.name;
    }
  };
  xhr.open("post", `${url}/upload`, true);
  xhr.send(formdata);
}

// Add metodo para tirar foto no botão
buttonCapture.onclick = capturePhoto;
// Start the video stream when the window loads
window.addEventListener("load", loadApp, false);
