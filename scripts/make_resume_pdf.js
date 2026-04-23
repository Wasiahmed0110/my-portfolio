const fs = require('fs');

const pngData = fs.readFileSync('D:/Uni/Portfolio/public/resume_img.png');
const width = pngData.readUInt32BE(16);
const height = pngData.readUInt32BE(20);
console.log('PNG dimensions:', width, 'x', height);

// Extract IDAT chunks
let idatData = Buffer.alloc(0);
let pos = 8;
while (pos < pngData.length - 4) {
  const chunkLen = pngData.readUInt32BE(pos);
  const chunkType = pngData.slice(pos + 4, pos + 8).toString('ascii');
  const chunkData = pngData.slice(pos + 8, pos + 8 + chunkLen);
  if (chunkType === 'IDAT') idatData = Buffer.concat([idatData, chunkData]);
  pos += 12 + chunkLen;
}

const bitDepth = pngData[24];
const colorType = pngData[25];
const hasAlpha = (colorType === 4 || colorType === 6);
const cs = (colorType === 0 || colorType === 4) ? '/DeviceGray' : '/DeviceRGB';
const comps = hasAlpha ? (colorType === 6 ? 3 : 1) : (colorType === 2 ? 3 : 1);
console.log('colorType:', colorType, 'bitDepth:', bitDepth, 'hasAlpha:', hasAlpha, 'IDAT:', idatData.length);

const pageW = 612, pageH = 792;
const scale = Math.min(pageW / width, pageH / height);
const iW = Math.round(width * scale);
const iH = Math.round(height * scale);
const ox = Math.round((pageW - iW) / 2);
const oy = Math.round((pageH - iH) / 2);

const pageStream = 'q ' + iW + ' 0 0 ' + iH + ' ' + ox + ' ' + oy + ' cm /Im1 Do Q';
const psBuf = Buffer.from(pageStream);

const parts = [];
const offs = {};

parts.push(Buffer.from('%PDF-1.4\n'));

offs[1] = parts.reduce((s, p) => s + p.length, 0);
parts.push(Buffer.from('1 0 obj\n<</Type/Catalog/Pages 2 0 R>>\nendobj\n'));

offs[2] = parts.reduce((s, p) => s + p.length, 0);
parts.push(Buffer.from('2 0 obj\n<</Type/Pages/Kids[3 0 R]/Count 1>>\nendobj\n'));

offs[3] = parts.reduce((s, p) => s + p.length, 0);
parts.push(Buffer.from('3 0 obj\n<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</XObject<</Im1 5 0 R>>>>>>\nendobj\n'));

offs[4] = parts.reduce((s, p) => s + p.length, 0);
parts.push(Buffer.from('4 0 obj\n<</Length ' + psBuf.length + '>>\nstream\n'));
parts.push(psBuf);
parts.push(Buffer.from('\nendstream\nendobj\n'));

offs[5] = parts.reduce((s, p) => s + p.length, 0);
const imgHdr = '5 0 obj\n<</Type/XObject/Subtype/Image/Width ' + width + '/Height ' + height + '/ColorSpace ' + cs + '/BitsPerComponent ' + bitDepth + '/Filter/FlateDecode/DecodeParms<</Predictor 15/Colors ' + comps + '/BitsPerComponent ' + bitDepth + '/Columns ' + width + '>>/Length ' + idatData.length + '>>\nstream\n';
parts.push(Buffer.from(imgHdr));
parts.push(idatData);
parts.push(Buffer.from('\nendstream\nendobj\n'));

const xrefOff = parts.reduce((s, p) => s + p.length, 0);
let xref = 'xref\n0 6\n0000000000 65535 f \n';
for (let i = 1; i <= 5; i++) xref += String(offs[i]).padStart(10, '0') + ' 00000 n \n';
xref += 'trailer\n<</Size 6/Root 1 0 R>>\nstartxref\n' + xrefOff + '\n%%EOF\n';
parts.push(Buffer.from(xref));

const pdf = Buffer.concat(parts);
fs.writeFileSync('D:/Uni/Portfolio/public/resume.pdf', pdf);
console.log('PDF created:', pdf.length, 'bytes at D:/Uni/Portfolio/public/resume.pdf');
