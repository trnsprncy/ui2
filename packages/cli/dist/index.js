#! /usr/bin/env node
var I=`
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
`;import{Command as te}from"commander";import oe from"chalk-animation";var A=new te().name("hello-world").description("Prints a greeting message").argument("[components...]","the components to add").action(()=>{let e=oe.rainbow(I);setTimeout(()=>{e.stop()},5e3)});import{z as s}from"zod";var F=s.object({name:s.string(),dependencies:s.array(s.string()).optional(),devDependencies:s.array(s.string()).optional(),uiDependencies:s.array(s.string()).optional(),fileDependencies:s.array(s.string()).optional(),registryDependencies:s.array(s.string()).optional(),files:s.array(s.string()),type:s.enum(["components:demo","components:extension","components:example","components:library"])}),x=s.array(F),re=F.extend({files:s.array(s.object({name:s.string(),content:s.string()}))}),Je=s.array(re);import w from"fs";import k from"path";var P="@/components/ui/trnsprncy",y=k.join(process.cwd(),"components.json");function v(){return w.existsSync(y)?JSON.parse(w.readFileSync(y,"utf-8")):{}}var z=k.join(process.cwd(),"tsconfig.json");function se(){return w.existsSync(z)?JSON.parse(w.readFileSync(z,"utf-8")):{}}function $(){try{let n=se().compilerOptions?.paths||{};return!!n["@/*"]&&n["@/*"][0]==="./src/*"}catch(e){return console.error("Error parsing tsconfig:",e),!1}}var D={true:k.join(process.cwd(),"/src",P.replace("@","")),false:k.join(process.cwd(),P.replace("@",""))},ie=$()?"true":"false",m=D[ie];import{detect as ae}from"@antfu/ni";async function M(e){let n=await ae({programmatic:!0,cwd:e});return n==="yarn@berry"?"yarn":n==="pnpm@6"?"pnpm":n==="bun"?"bun":n??"npm"}var V=[{name:"banner-content",files:["library/banner/banner-content.tsx"],type:"components:library"},{name:"banner-shell",dependencies:["@radix-ui/react-slot","@trnsprncy/oss"],uiDependencies:["accordion","sooner"],registryDependencies:["banner-content"],fileDependencies:["utils","logic","hooks"],files:["library/banner/banner-shell.tsx","library/banner/logic/banner-trigger.tsx","library/banner/logic/banner-opt-base.tsx","library/banner/logic/banner-options.tsx","library/banner/logic/bare-banner-trigger.tsx","library/banner/logic/categorized-options.tsx","library/banner/utils/constants.ts","library/banner/utils/use-lock-body-scroll.ts"],type:"components:library"},{name:"banner-switch",registryDependencies:["switch-w-thumb"],files:["library/banner/banner-switch.tsx"],type:"components:library"},{name:"switch-w-thumb",dependencies:["@radix-ui/react-switch"],files:["library/banner/switch-w-thumb.tsx"],type:"components:library"},{name:"trnsprncy-button",uiDependencies:["button","popover"],fileDependencies:["utils"],files:["library/banner/trnsprncy-button.tsx","library/banner/utils/constants.ts"],type:"components:library"}];import ce from"fs";import{HttpsProxyAgent as pe}from"https-proxy-agent";import H from"node-fetch";import me from"path";var le="https://raw.githubusercontent.com/trnsprncy/ui/main",G=process.env.COMPONENTS_REGISTRY_URL??"https://trnsprncy.vercel.app",de=process.env.https_proxy?new pe(process.env.https_proxy):void 0;async function B(){try{return await(await H(`${G}/registry/index.json`,{agent:de})).json()}catch(e){throw console.log(e),new Error(`Failed to fetch registry from ${G}.`)}}async function N(e){let n=x.parse(V),r=new Set(e);e||(console.log("No components selected"),process.exit(1));let o=[];for(let c of e){let a=n.find(i=>i.name===c);if(!a){console.log(`Component ${c} not found in registry`);continue}if(o.push(a),a.registryDependencies){let i=await N(a.registryDependencies);for(let p of i)r.has(p.name)||o.push(...i)}}return o}async function U(e){try{let n=[],r=[];for(let o of e){let c=`${le}/packages/site/src/registry/alpha/${o}`,a=o.substring(o.indexOf("/",o.indexOf("/")+1)),i=await H(c);if(!i.ok)throw new Error(`Failed to fetch file '${o}': ${i.statusText}`);let p=await i.text();n.push(a),r.push(p)}return{filenames:n,contents:r}}catch(n){throw console.error("Error fetching files from GitHub:",n),n}}function W(e,n){let r=$()?"true":"false",o=D[r];if(e.length!==n.length){console.error("Number of file names and contents must be equal");return}try{e.forEach((c,a)=>{let i=me.join(o,c);ce.writeFileSync(i,n[a],"utf8")})}catch(c){console.error("Error creating files:",c)}}import S from"chalk";import{Command as ge}from"commander";import{execa as O}from"execa";import C from"fs";import L from"ora";import E from"path";import J from"prompts";import{z as u}from"zod";var _={info:e=>S.cyan.underline(e),success:e=>S.greenBright(e),error:e=>S.redBright(e),warning:e=>S.yellowBright(e)},fe=u.object({components:u.array(u.string()).optional(),yes:u.boolean(),overwrite:u.boolean(),cwd:u.string(),all:u.boolean(),path:u.string().optional()}),Y=new ge().name("add").description("Prints a greeting message").argument("[components...]","the components to add").option("-y, --yes","skip confirmation prompt.",!0).option("-o, --overwrite","overwrite existing files.",!1).option("-c, --cwd <cwd>","the working directory. defaults to the current directory.",process.cwd()).option("-a, --all","add all available components",!1).option("-p, --path <path>","the path to add the component to.").action(async(e,n)=>{let r=fe.parse({components:e,...n}),o=E.resolve(r.cwd),c=x.parse(await B()),a=r.all?c.map(t=>t.name):r.components;if(!r.components?.length){let{components:t}=await J({type:"multiselect",name:"components",message:"Which components would you like to add?",hint:"Space to select. A to toggle all. Enter to submit.",instructions:!1,choices:c.map(f=>({title:f.name,value:f.name,selected:r.all?!0:r.components?.includes(f.name)}))});a=t}a?.length||(L(_.warning(`no component was requested!
  exiting.....`)).fail(),process.exit(1));let i=await N(a);if(!r.yes){let{proceed:t}=await J({type:"confirm",name:"proceed",message:"Ready to install components and dependencies. Proceed?",initial:!0});t||process.exit(0)}C.existsSync(m+"/.gitkeep")&&C.unlink(m+"/.gitkeep",t=>{t&&console.error("Error deleting file:",t)});let p=L("Installing components...").start();for(let t of i){p.text=`Installing ${t.name}...`;let f=await M(o);if(t.uiDependencies?.length){p.stop();let{proceed:b}=await J({type:"confirm",name:"proceed",message:`${_.info(t.name)} requires the following shadcn-ui components ${_.info(t.uiDependencies.join(", "))} Proceed?`,initial:!0});b?(p.start(`installing ${t.uiDependencies.join(", ")} for ${t.name}...`),await O("npx",["shadcn-ui@latest","add",...t.uiDependencies,"--overwrite"],{cwd:o}),p.text=`Installing ${t.name}...`):(p.fail(`you need (${t.uiDependencies.join(", ")}) for ${t.name}!`),process.exit(0))}if(t.dependencies?.length&&await O(f,[f==="npm"?"install":"i",...t.dependencies],{cwd:o}),t.devDependencies?.length&&await O(f,[f==="npm"?"install":"add","-D",...t.devDependencies],{cwd:o}),t.fileDependencies)for(let b of t.fileDependencies)C.existsSync(E.join(m,b))||C.mkdirSync(E.join(m,b),{recursive:!0});let q=await U(t.files);W(q.filenames,q.contents),p.succeed(`installed ${t.name}`)}p.succeed("Done."),process.exit(0)});import ue from"figlet";function K(e){let n=ue.textSync(e,{font:"Small"});console.log(`
${n}
`)}import j from"chalk";import{Command as he}from"commander";import h from"fs";import l from"ora";import Q from"path";import ye from"prompts";import*as R from"semver";var d={info:e=>j.blueBright(e),success:e=>j.greenBright(e),error:e=>j.redBright(e),warning:e=>j.yellowBright(e)},be=`
  this alias will be added to your ${d.success("components.json")} file

    ${d.info(`"aliases": {
        "trnsprncy": "@/components/ui/trnsprncy"
      }`)}
`,g={greet:"Hello, There! Fellow frontend Fanatic!",missingPackages:"This project does not meet the minimum requirements:",outdatedPackages:"This project does not meet the minimum requirements:",noDependencies:`No dependencies found in ${d.success("package.json")} file.`,meetsRequirements:"This project meets the minimum requirements!",writeConfiguration:`Adding configuration alias to ${d.success("components.json")}.${be}  Proceed?`,configurationWritten:`Configuration written to ${d.success("components.json")}.`,operationAborted:`${d.error("Operation aborted. Configuration not saved.")}`,componentsFileNotChanged:"Components file will not be changed.",shadcnRequired:`shadcn ${d.success("components.json")} file in your project root is required before running this command`},xe=()=>{let e=v();return e?.aliases||(l(g.shadcnRequired).fail(),process.exit(1)),!!e.aliases?.trnsprncy},X=new he().name("init").description(g.greet).action(()=>{K("Initializing:"),xe()&&(l(`trnsprncy alias already exists in ${d.success("components.json")}`).fail(),process.exit(1)),Pe().then(e=>{e.missingPackages.length||e.outdatedPackages.length?(l(d.error(g.missingPackages)).fail(),console.log("Minimum Requirements:"),e.missingPackages.length>0&&console.log("\u2192 "+e.missingPackages.join(`
`)),e.outdatedPackages.length>0&&e.outdatedPackages.forEach(n=>{console.log(`\u2192 ${n.packageName}: installed ${n.installedVersion}, required ${n.requiredVersion}`)}),process.exit(1)):(l(g.meetsRequirements).succeed(),ke())}).catch(e=>{l(`Error checking required packages: ${e}`).fail()})}),Z=e=>(/^\^\d+$/.test(e)&&(e=e+".0.0"),e.replace(/[^0-9.]/g,"")),T={next:"^14.0.1"};async function we(){let e=Q.join(process.cwd(),"package.json"),n=JSON.parse(h.readFileSync(e,"utf-8"));if(!Object.keys(n.dependencies)?.length)return{};for(let r in n.dependencies)n.dependencies[r]=Z(n.dependencies[r]);return n.dependencies}async function ke(){let{confirmation:e}=await ye({type:"toggle",name:"confirmation",message:g.writeConfiguration,initial:!0,active:"yes",inactive:"no"});if(e){h.existsSync(y)||(l(g.shadcnRequired).fail(),process.exit(1));let n=v();n.aliases.trnsprncy=P,h.writeFileSync(y,JSON.stringify(n,null,2)),h.existsSync(m)||h.mkdirSync(m,{recursive:!0}),console.log(m);let r=Q.join(m,".gitkeep");h.writeFile(r,"",o=>{o&&console.error("Error writing file:",o)}),l(g.configurationWritten).succeed()}else l(g.operationAborted).fail()}async function Pe(){let e=await we();if(!Object.keys(e)?.length)return l(g.noDependencies).fail(),{missingPackages:Object.keys(T),outdatedPackages:[]};let n=[],r=[];l("checking for required packages...").succeed();for(let o in T){let c=e[o];if(!c)n.push(o);else{let a=Z(T[o]),i=c;i||n.push(o),!R.satisfies(i,a)&&R.lt(i,a)&&r.push({packageName:o,installedVersion:i,requiredVersion:a})}}return{missingPackages:n,outdatedPackages:r}}import Se from"fs";import ee from"path";import{fileURLToPath as Ce}from"url";var je=ee.dirname(Ce(import.meta.url)),ne={getContent(){let e=ee.resolve(je,"../","package.json");return JSON.parse(Se.readFileSync(e,"utf-8"))},get version(){let e=this.getContent(),{version:n}=e;return n||"0.0.0"}};import{Command as Re}from"commander";(async()=>{let e=new Re;e.name(">").description("\u26A1\uFE0F transparency/ui.").version(ne.version,"-v, --version","display the version number"),e.addCommand(X).addCommand(Y).addCommand(A),e.parse()})();
