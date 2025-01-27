let a="Vitals, Attachment Upload";
let b=a.split(",").map(item => item.trim());
b.includes('Vitals')
console.log(b.includes('Attachment Upload'))


