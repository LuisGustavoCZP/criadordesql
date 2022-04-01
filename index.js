const fs = require('fs');

//console.log(data);

function columns (params) 
{
    return params.reduce((p, c, i) => p += '"'+c+'"' + (i==params.length-1?"":","), "");
}

function values (element, params) {
    return params.reduce((p, c, i) => 
    {
        let e = element[c];
        if(!typeof(e).length)
        {
        }
        else if(typeof e === 'string')
        {
            //console.log(e);
            if(e.startsWith('i')) e = parseInt(e.slice(1))+1;
            else if(e.startsWith('p')) e = `${parseInt(e.slice(1))+12}`;
            else if(e.startsWith('c')) e = `${parseInt(e.slice(1))+35}`;
        }
        else 
        {
            const p = e;
            e = '';
            p.forEach((element, i) => 
            {
                //console.log(element);
                if(element.startsWith('i')) e += parseInt(element.slice(1))+1;
                else if(element.startsWith('p')) e += `${parseInt(element.slice(1))+12}`;
                else if(element.startsWith('c')) e += `${parseInt(element.slice(1))+35}`;
                if(i<p.length-1) e += "','";
            });
        }
        p += "'"+ e +"'" + (i==params.length-1?"":",");
        return p;
    }, "");
}

function jsontosql (filename, table, structure) 
{
    const data = JSON.parse(fs.readFileSync(`./datas/${filename}.json`));
    const sql = data.reduce((prev, curr) => 
    {
        return prev + `INSERT INTO ${table} (${columns(structure)}) VALUES (${values(curr, structure)});\n`;
    }, '');
    fs.writeFileSync(`./sqls/${filename}.sql`, sql);
}

jsontosql('recipes', 'public.recipe', ['level', 'id_result', 'id_items']);
//jsontosql('ingredients', 'public.item', ['name', 'icon', 'desc']);
/* function redosql (filename, columns)
{
    const sql = fs.readFileSync(`./sqls/${filename}.sql`, 'utf8');
    //console.log(sql);
    const lines = sql.split(";\n");
    lines.forEach(line => {
        //console.log(line);
        if(line != '') 
        {
            let startIndex = line.indexOf("VALUES (");
            startIndex = line.indexOf("(", startIndex)+1;
            const values = line.slice(startIndex, line.length-1);

            let valueArray = values.split(",");
            valueArray.forEach(value => {
                const index = line.indexOf(values);
                
                console.log(line.slice(index));
            });
            //console.log(values);
        }
    });
} */

//redosql("recipes", [0, 2, 3]);

//console.log(sql);
