const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');
const decode = s => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"');
function run(saved, blocked = false) {
  const html = fs.readFileSync('index.html','utf8').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,'');
  const elements = new Map();
  const element = key => {
    if (!elements.has(key)) elements.set(key, {attributes:{},events:{},hidden:true,dataset:{},textContent:'',setAttribute(k,v){this.attributes[k]=v;},getAttribute(k){return this.attributes[k] || null;},addEventListener(k,fn){this.events[k]=fn;},closest(){return this;},contains(){return false;},focus(){}});
    return elements.get(key);
  };
  const buttons = ['en','es','zh'].map(code => Object.assign(element(code),{dataset:{language:code}}));
  element('.language-options').querySelectorAll = () => buttons;
  const nodes = [...html.matchAll(/>([^<>]+)</g)].map(x=>({textContent:decode(x[1]),parentElement:{closest:()=>null}}));
  const original = nodes.map(n=>n.textContent);
  let at = -1;
  const attrs = [...html.matchAll(/\b(alt|aria-label|title)="([^"]+)"/g)].map((x,i)=>{
    const el=element('attr'+i);el.attributes[x[1]]=decode(x[2]);el.closest=()=>null;return el;
  });
  const storage = {'alejandro-language':saved};
  const document = {body:{},documentElement:{dataset:{theme:'light'},lang:'en'},title:'Alejandro Cano — Mathematics',createTreeWalker:()=>({nextNode(){return ++at < nodes.length;},get currentNode(){return nodes[at];}}),querySelector:element,querySelectorAll:()=>attrs,addEventListener(){}};
  const context = {window:{},document,NodeFilter:{SHOW_TEXT:4,FILTER_REJECT:2,FILTER_ACCEPT:1},matchMedia:()=>({addEventListener(){}}),localStorage:{getItem(k){if(blocked)throw Error();return storage[k];},setItem(k,v){if(blocked)throw Error();storage[k]=v;}}};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('assets/translations.js','utf8'),context);
  vm.runInContext(fs.readFileSync('assets/languages.js','utf8'),context);
  const choose = language => element('.language-options').events.click({target:element(language)});
  for (const language of ['es','zh','en','zh','es','en']) {
    choose(language);
    assert.equal(document.documentElement.lang,language === 'zh' ? 'zh-Hans':language);
    nodes.forEach((node,i)=>assert.equal(node.textContent,language==='en'?original[i]:original[i].replace(original[i].trim(),context.window.siteMessages[original[i].trim()]?.[language==='es'?0:1] || original[i].trim())));
    assert.equal(element('.language-options').hidden,true);
    assert.equal(element(language).getAttribute('aria-pressed'),'true');
  }
  choose('es');
  document.documentElement.dataset.theme='dark';
  element('.theme-toggle').events.click();
  assert.equal(element('.theme-toggle').textContent,'Modo claro');
  element('#pause').setAttribute('aria-pressed','true');
  element('#pause').events.click();
  assert.equal(element('#pause').getAttribute('aria-label'),'Reanudar rotación');
  if (!blocked) assert.equal(storage['alejandro-language'],'es');
}
run('zh');run('invalid');run('en',true);
console.log('PASS: full text switching and restoration, language state, persistence, unavailable storage, theme and rotation labels.');
