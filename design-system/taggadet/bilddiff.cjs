// Jämför två skärmdumpar pixel för pixel. Finns för att kunna påstå "identisk"
// om en refaktorering i stället för att gissa utifrån filstorlek — PNG-kodning
// kan skilja några hundra byte utan att en enda pixel har rört sig.
//
//   node design-system/taggadet/bilddiff.cjs <a.png> <b.png>
//
// Skriver en HTML med båda bilderna inbäddade som data-URI:er och ritar av dem
// på en canvas. Data-URI behövs: Edge headless här vägrar ladda <img> från
// sökväg. Resultatet hamnar i <pre id="ut"> och läses med --dump-dom.

const fs = require("fs");
const path = require("path");

const [a, b] = process.argv.slice(2);
if (!a || !b) {
  console.error("användning: node bilddiff.cjs <a.png> <b.png>");
  process.exit(1);
}

const b64 = (p) => fs.readFileSync(p).toString("base64");
const ut = path.join(path.dirname(a), "bilddiff.html");

const html = `<!doctype html><meta charset="utf-8">
<body style="margin:0"><pre id="ut">väntar</pre>
<script>
var A=new Image(),B=new Image(),kvar=2;
function klart(){
  if(--kvar)return;
  var c=document.createElement("canvas");c.width=A.width;c.height=A.height;
  var x=c.getContext("2d");
  x.drawImage(A,0,0);var da=x.getImageData(0,0,c.width,c.height).data;
  x.clearRect(0,0,c.width,c.height);x.drawImage(B,0,0);var db=x.getImageData(0,0,c.width,c.height).data;
  var n=0,x0=1e9,y0=1e9,x1=-1,y1=-1;
  for(var i=0;i<da.length;i+=4){
    if(da[i]!==db[i]||da[i+1]!==db[i+1]||da[i+2]!==db[i+2]){
      n++;
      var p=i/4,y=Math.floor(p/c.width),xx=p%c.width;
      if(xx<x0)x0=xx; if(xx>x1)x1=xx; if(y<y0)y0=y; if(y>y1)y1=y;
    }
  }
  document.getElementById("ut").textContent =
    "matt " + A.width + "x" + A.height + " mot " + B.width + "x" + B.height +
    "\\nolika pixlar: " + n +
    (n ? "\\nomrade: x " + x0 + "-" + x1 + ", y " + y0 + "-" + y1 : "  (identiska)");
}
A.onload=klart; B.onload=klart;
A.onerror=function(){document.getElementById("ut").textContent="A kunde inte lastas";};
B.onerror=function(){document.getElementById("ut").textContent="B kunde inte lastas";};
A.src="data:image/png;base64,${b64(a)}";
B.src="data:image/png;base64,${b64(b)}";
</script>`;

fs.writeFileSync(ut, html);
console.log(ut);
