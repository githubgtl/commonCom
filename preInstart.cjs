const fs = require('fs');
const path = require('path');
const { parse }=require('node-html-parser');
const { glob }= require('glob');
const urlRegex=require('url-regex');
const { mainModule } = require('process');
//获取外部链接的正则表达式
const urlPattern=/(https?:\/\/[^/]*)/i;
const urls = new Set();

async function search(){
    const files = await glob('dist/**/*.{html, css, js}') // 找css，js html的外连接

    for(const file of files){
        
        const source = fs.readFileSync(file, 'utf-8');
        const matches = source.match(urlRegex({strict: true}))
        console.log(matches, ",atches")
        if(matches){
            matches.forEach((url)=>
            {
                const match = url.match(urlPattern);
                console.log(match)
                if(match && match[1]){
                    urls.add(match[1]);
                }
            });
        }
    }
}

async function insertLinks(){
    const files = await glob('dist/**/*.html');
    const links =[...urls].map((url)=>`<link rel="dns-prefetch" href="${url}" />`).join('\n')
    for(const file of files){
        const html = fs.readFileSync(file, 'utf-8');
        const root =  parse(html);
        const head = root.querySelector('head');
        head.insertAdjacentHTML('afterbegin',links)
        fs.writeFileSync(file, root.toString());
    }
}

async function main(){
    await search()
    await insertLinks()
}
main()