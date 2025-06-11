let video1Base64 = "";
let video2Base64 = "";

function encodeVideo(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const base64 = e.target.result.split(',')[1];
    callback(base64);
  };
  reader.readAsDataURL(file);
}

document.getElementById('video1Input').addEventListener('change', function () {
  if (this.files[0]) {
    encodeVideo(this.files[0], base64 => video1Base64 = base64);
  }
});

document.getElementById('video2Input').addEventListener('change', function () {
  if (this.files[0]) {
    encodeVideo(this.files[0], base64 => video2Base64 = base64);
  }
});

function exportHTML() {
fetch('plec_template.txt')
    .then(response => response.text())
    .then(template => {
      const finalHtml = template
        .replace('%%VIDEO1%%', video1Base64)
        .replace('%%VIDEO2%%', video2Base64);

      const blob = new Blob([finalHtml], { type: "text/html" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "plec_final.html";
      a.click();
    })
    .catch(err => alert("Şablon dosya yüklenemedi: " + err));
}
