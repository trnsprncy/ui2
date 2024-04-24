#! /usr/bin/env node
var E=`
                              .:---::-------------:::::::::::                             
                            :+*++++++++++====================:                            
                            =##*::..........................                              
                           .=+*+                                                          
                            -+++======--.     .-=-                                        
                             .-==========-.   :===.                                       
                                      :#*+=   :===.                                       
                                       ****   :===.                                       
                                       +***   :===.                                       
                                       ++++   :===.                                       
                                       ====   :=--.                                       
                                       ====   :---.                                       
                                       -=--   :---.                                       
                                       ----   .:::.                                       
                                       ----   .:::.                                       
                                       -:::   .:--.                                       
                                       ::::   -++*:                                       
                                       .::-=+*####                                        
                                        .-+*#%%%+                                         
                                           .::.                                           
                                                                                          
                                  trnsprncy coming soon!
`;import{Command as Q}from"commander";import X from"chalk-animation";var I=new Q().name("hello-world").description("Prints a greeting message").argument("[components...]","the components to add").action(()=>{let e=X.rainbow(E);setTimeout(()=>{e.stop()},5e3)});import{z as s}from"zod";var T=s.object({name:s.string(),dependencies:s.array(s.string()).optional(),devDependencies:s.array(s.string()).optional(),uiDependencies:s.array(s.string()).optional(),registryDependencies:s.array(s.string()).optional(),files:s.array(s.string()),type:s.enum(["components:ui","components:component","components:example","components:library"])}),y=s.array(T),Z=T.extend({files:s.array(s.object({name:s.string(),content:s.string()}))}),Oe=s.array(Z);import{detect as ee}from"@antfu/ni";async function q(e){let n=await ee({programmatic:!0,cwd:e});return n==="yarn@berry"?"yarn":n==="pnpm@6"?"pnpm":n==="bun"?"bun":n??"npm"}import u from"fs";import w from"path";var x="@/components/ui/trnsprncy",h=w.join(process.cwd(),"components.json");function j(){return u.existsSync(h)?JSON.parse(u.readFileSync(h,"utf-8")):{}}var A=w.join(process.cwd(),"tsconfig.json");function ne(){return u.existsSync(A)?JSON.parse(u.readFileSync(A,"utf-8")):{}}function k(){try{let n=ne().compilerOptions?.paths||{};return!!n["@/*"]&&n["@/*"][0]==="./src/*"}catch(e){return console.error("Error parsing tsconfig:",e),!1}}var D=e=>{u.mkdir(e,{recursive:!0},n=>{n&&console.error("Error creating directory:",n)})},P={true:w.join(process.cwd(),"/src",x.replace("@","")),false:w.join(process.cwd(),x.replace("@",""))};import te from"fs";import{HttpsProxyAgent as oe}from"https-proxy-agent";import M from"node-fetch";import re from"path";var se="https://raw.githubusercontent.com/trnsprncy/ui/main",F=process.env.COMPONENTS_REGISTRY_URL??"https://trnsprncy.vercel.app",ie=process.env.https_proxy?new oe(process.env.https_proxy):void 0;async function R(){try{return await(await M(`${F}/registry/index.json`,{agent:ie})).json()}catch(e){throw console.log(e),new Error(`Failed to fetch registry from ${F}.`)}}async function $(e){let n=y.parse(await R());e||(console.log("no components selected"),process.exit(1));let t=[];for(let o of e){let i=n.find(a=>a.name===o);if(i)t.push(i);else{console.log(`Component ${o} not found in registry`);continue}if(i.registryDependencies){let a=await $(i.registryDependencies);t.push(...a)}}return t}async function V(e){try{let n=[],t=[];for(let o of e){let i=`${se}/packages/site/src/registry/alpha/${o}`,a=o.substring(o.lastIndexOf("/")+1),c=await M(i);if(!c.ok)throw new Error(`Failed to fetch file '${o}': ${c.statusText}`);let g=await c.text();n.push(a),t.push(g)}return{filenames:n,contents:t}}catch(n){throw console.error("Error fetching files from GitHub:",n),n}}function z(e,n){let t=k()?"true":"false",o=P[t];if(e.length!==n.length){console.error("Number of file names and contents must be equal");return}try{e.forEach((i,a)=>{let c=re.join(o,i);te.writeFileSync(c,n[a],"utf8")})}catch(i){console.error("Error creating files:",i)}}import S from"chalk";import{Command as ae}from"commander";import{execa as v}from"execa";import G from"ora";import ce from"path";import N from"prompts";import{z as f}from"zod";var pe={info:e=>S.cyan.underline(e),success:e=>S.greenBright(e),error:e=>S.redBright(e),warning:e=>S.yellowBright(e)},me=f.object({components:f.array(f.string()).optional(),yes:f.boolean(),overwrite:f.boolean(),cwd:f.string(),all:f.boolean(),path:f.string().optional()}),H=new ae().name("add").description("Prints a greeting message").argument("[components...]","the components to add").option("-y, --yes","skip confirmation prompt.",!0).option("-o, --overwrite","overwrite existing files.",!1).option("-c, --cwd <cwd>","the working directory. defaults to the current directory.",process.cwd()).option("-a, --all","add all available components",!1).option("-p, --path <path>","the path to add the component to.").action(async(e,n)=>{let t=me.parse({components:e,...n}),o=ce.resolve(t.cwd),i=y.parse(await R()),a=t.all?i.map(r=>r.name):t.components;if(!t.components?.length){let{components:r}=await N({type:"multiselect",name:"components",message:"Which components would you like to add?",hint:"Space to select. A to toggle all. Enter to submit.",instructions:!1,choices:i.map(l=>({title:l.name,value:l.name,selected:t.all?!0:t.components?.includes(l.name)}))});a=r}a?.length||(G(pe.warning(`no component was requested!
  exiting.....`)).fail(),process.exit(1));let c=await $(a);if(!t.yes){let{proceed:r}=await N({type:"confirm",name:"proceed",message:"Ready to install components and dependencies. Proceed?",initial:!0});r||process.exit(0)}let g=G("Installing components...").start();for(let r of c){g.text=`Installing ${r.name}...`;let l=await q(o);if(r.uiDependencies?.length){g.stop();let{proceed:K}=await N({type:"confirm",name:"proceed",message:`to install ${r.name} you need (${r.uiDependencies.join(", ")}). Proceed?`,initial:!0});K?(g.start(`installing ${r.uiDependencies.join(", ")} for ${r.name}...`),await v("npx",["shadcn-ui@latest","add",...r.uiDependencies,"--overwrite"],{cwd:o}),g.text=`Installing ${r.name}...`):(g.fail(`you need (${r.uiDependencies.join(", ")}) for ${r.name}!`),process.exit(0))}r.dependencies?.length&&await v(l,[l==="npm"?"install":"add",...r.dependencies],{cwd:o}),r.devDependencies?.length&&await v(l,[l==="npm"?"install":"add","-D",...r.devDependencies],{cwd:o});let J=await V(r.files);z(J.filenames,J.contents)}g.succeed("Done."),process.exit(0)});import de from"figlet";function B(e){let n=de.textSync(e,{font:"Small"});console.log(`
${n}
`)}import C from"chalk";import{Command as ge}from"commander";import _ from"fs";import p from"ora";import le from"path";import fe from"prompts";import*as b from"semver";var m={info:e=>C.blueBright(e),success:e=>C.greenBright(e),error:e=>C.redBright(e),warning:e=>C.yellowBright(e)},ue=`
  this alias will be added to your ${m.success("components.json")} file

    ${m.info(`"aliases": {
        "trnsprncy": "@/components/ui/trnsprncy"
      }`)}
`,d={greet:"Hello, There! Fellow frontend Fanatic!",missingPackages:"This project does not meet the minimum requirements:",outdatedPackages:"This project does not meet the minimum requirements:",noDependencies:`No dependencies found in ${m.success("package.json")} file.`,meetsRequirements:"This project meets the minimum requirements!",writeConfiguration:`Adding configuration alias to ${m.success("components.json")}.${ue}  Proceed?`,configurationWritten:`Configuration written to ${m.success("components.json")}.`,operationAborted:`${m.error("Operation aborted. Configuration not saved.")}`,componentsFileNotChanged:"Components file will not be changed.",shadcnRequired:`shadcn ${m.success("components.json")} file in your project root is required before running this command`},he=()=>{let e=j();return e?.aliases||(p(d.shadcnRequired).fail(),process.exit(1)),!!e.aliases?.trnsprncy},U=new ge().name("init").description(d.greet).action(()=>{B("Initializing:"),he()&&(p(`trnsprncy alias already exists in ${m.success("components.json")}`).fail(),process.exit(1)),xe().then(e=>{e.missingPackages.length||e.outdatedPackages.length?(p(m.error(d.missingPackages)).fail(),console.log("Minimum Requirements:"),e.missingPackages.length>0&&console.log("\u2192 "+e.missingPackages.join(`
`)),e.outdatedPackages.length>0&&e.outdatedPackages.forEach(n=>{console.log(`\u2192 ${n.packageName}: installed ${n.installedVersion}, required ${n.requiredVersion}`)}),process.exit(1)):(p(d.meetsRequirements).succeed(),we())}).catch(e=>{p(`Error checking required packages: ${e}`).fail()})}),W=e=>(/^\^\d+$/.test(e)&&(e=e+".0.0"),e.replace(/[^0-9.]/g,"")),O={next:"^14.0.1"};async function ye(){let e=le.join(process.cwd(),"package.json"),n=JSON.parse(_.readFileSync(e,"utf-8"));if(!Object.keys(n.dependencies)?.length)return{};for(let t in n.dependencies)n.dependencies[t]=W(n.dependencies[t]);return n.dependencies}async function we(){let{confirmation:e}=await fe({type:"toggle",name:"confirmation",message:d.writeConfiguration,initial:!0,active:"yes",inactive:"no"});if(e){_.existsSync(h)||(p(d.shadcnRequired).fail(),process.exit(1));let n=j();n.aliases.trnsprncy=x,_.writeFileSync(h,JSON.stringify(n,null,2));let t=k()?"true":"false",o=P[t];D(o),p(d.configurationWritten).succeed()}else p(d.operationAborted).fail()}async function xe(){let e=await ye();if(!Object.keys(e)?.length)return p(d.noDependencies).fail(),{missingPackages:Object.keys(O),outdatedPackages:[]};let n=[],t=[];p("checking for required packages...").succeed();for(let o in O){let i=e[o];if(!i)n.push(o);else{let a=W(O[o]),c=i;c||n.push(o),!b.satisfies(c,a)&&b.lt(c,a)&&t.push({packageName:o,installedVersion:c,requiredVersion:a})}}return{missingPackages:n,outdatedPackages:t}}import ke from"fs";import L from"path";import{fileURLToPath as Pe}from"url";var Se=L.dirname(Pe(import.meta.url)),Y={getContent(){let e=L.resolve(Se,"../","package.json");return JSON.parse(ke.readFileSync(e,"utf-8"))},get version(){let e=this.getContent(),{version:n}=e;return n||"0.0.0"}};import{Command as Ce}from"commander";(async()=>{let e=new Ce;e.name(">").description("\u26A1\uFE0F transparency/ui.").version(Y.version,"-v, --version","display the version number"),e.addCommand(U).addCommand(H).addCommand(I),e.parse()})();
