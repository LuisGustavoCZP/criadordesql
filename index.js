const filename = 'ingredients';
const table = 'public.item';
const structure = ['name', 'icon', 'desc'];

const fs = require('fs');
const data = JSON.parse(fs.readFileSync(`./datas/${filename}.json`));
//console.log(data);

 const sql = data.reduce((prev, curr) => 
{
    return prev + `INSERT INTO ${table} (${structure.reduce((p, c, i) => p += '"'+c+'"' + (i==structure.length-1?"":","), "")}) VALUES (${structure.reduce((p, c, i) => p += "'"+curr[c]+"'" + (i==structure.length-1?"":","), "")});\n`;
}, '');

//console.log(sql);
fs.writeFileSync(`./sqls/${filename}.sql`, sql);