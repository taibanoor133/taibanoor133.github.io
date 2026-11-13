document.documentElement.classList.add('js')

window.LINKS={linkedin:"https://www.linkedin.com/in/taibajamil00",github:"https://github.com/taibanoor133",email:"taibanoor926@gmail.com"};

(function(){
 var c=document.getElementById('waves'),x=c.getContext('2d'),w,h,t=0,dpr=Math.min(devicePixelRatio||1,2);
 function size(){w=c.width=innerWidth*dpr;h=c.height=innerHeight*dpr}
 size();addEventListener('resize',size);
 var still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function draw(){
  x.clearRect(0,0,w,h);
  for(var i=0;i<6;i++){
   x.beginPath();
   var base=h*(.25+i*.13),amp=h*(.05+i*.012);
   for(var px=0;px<=w;px+=12){
    var y=base+Math.sin(px/w*3.2+t*.35+i*1.1)*amp+Math.sin(px/w*7+t*.2-i)*amp*.4;
    px?x.lineTo(px,y):x.moveTo(px,y);
   }
   var g=x.createLinearGradient(0,0,w,0);
   g.addColorStop(0,'rgba(209,209,209,0)');g.addColorStop(.5,'rgba(209,209,209,'+(.16-i*.015)+')');g.addColorStop(1,'rgba(255,255,255,0)');
   x.strokeStyle=g;x.lineWidth=(1.5+i*.3)*dpr;x.shadowColor='rgba(255,255,255,.25)';x.shadowBlur=18*dpr;x.stroke();
  }
  t+=.012;if(!still)requestAnimationFrame(draw);
 }
 draw();
})();

(function(){
 var still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function build(p){var t=p.textContent.trim(),chars=[];p.textContent='';
  var sr=document.createElement('span');sr.className='sr';sr.textContent=t;
  var v=document.createElement('span');v.setAttribute('aria-hidden','true');
  t.split(' ').forEach(function(w,i,a){var ws=document.createElement('span');ws.className='w';
   w.split('').forEach(function(c){var s=document.createElement('span');s.className='c';s.textContent=c;ws.appendChild(s);chars.push(s)});
   v.appendChild(ws);if(i<a.length-1)v.appendChild(document.createTextNode(' '))});
  p.appendChild(sr);p.appendChild(v);return chars}
 document.querySelectorAll('[data-chap]').forEach(function(ch){
  var lines=[].slice.call(ch.querySelectorAll('.type')).map(build),
      fig=ch.querySelector('.sfig'),late=ch.querySelectorAll('.late'),cur=document.createElement('i');cur.className='cur';
  function showAll(){if(fig)fig.classList.add('show');ch.classList.add('active');lines.forEach(function(l){l.forEach(function(c){c.classList.add('on')})});late.forEach(function(e){e.classList.add('show')})}
  if(still){showAll();return}
  function typeLine(chars,speed,done){var i=0;(function step(){if(i>=chars.length)return done();
   var c=chars[i++];c.classList.add('on');c.after(cur);
   var d=speed+Math.random()*speed*.45;if(/[.,—]/.test(c.textContent))d+=290;setTimeout(step,d)})()}
  function run(n){if(n===0)ch.classList.add('active');
   if(n>=lines.length){late.forEach(function(e){e.classList.add('show')});setTimeout(function(){cur.classList.add('done')},1100);return}
   lines[n][0].before(cur);
   setTimeout(function(){typeLine(lines[n],n?46:86,function(){setTimeout(function(){run(n+1)},440)})},n?260:320)}
  function startChapter(){
   if(fig){fig.classList.add('show');setTimeout(function(){run(0)},1200);}
   else{run(0);}
  }
  if(!('IntersectionObserver' in window)){showAll();return}
  var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){io.disconnect();startChapter()}},{rootMargin:'0px 0px -14% 0px',threshold:.14});
  io.observe(ch);
 });
 /* subtle dreamy pointer parallax on story floats */
 var story=document.getElementById('story'),floats=story?story.querySelector('.floats'):null;
 if(story&&floats&&!still){
  story.addEventListener('pointermove',function(e){
   var r=story.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;
   floats.style.transform='translate3d('+(dx*-18).toFixed(1)+'px,'+(dy*-18).toFixed(1)+'px,0)';
  },{passive:true});
 }
})();

(function(){
  var still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  /* mobile nav */
  var nt=document.getElementById('navToggle'),nl=document.getElementById('navLinks');
  function closeNav(){if(!nl||!nt)return;nl.classList.remove('open');nt.setAttribute('aria-expanded','false');nt.setAttribute('aria-label','Open menu')}
  if(nt&&nl){
    nt.addEventListener('click',function(){var open=nl.classList.toggle('open');nt.setAttribute('aria-expanded',open?'true':'false');nt.setAttribute('aria-label',open?'Close menu':'Open menu')});
    nl.addEventListener('click',function(e){if(e.target.tagName==='A')closeNav()});
    document.addEventListener('click',function(e){if(nl.classList.contains('open')&&!nl.contains(e.target)&&!nt.contains(e.target))closeNav()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nl.classList.contains('open')){closeNav();nt.focus()}});
  }
  /* scroll progress + back to top */
  var bar=document.getElementById('progress'),top=document.getElementById('toTop');
  function onScroll(){
    var h=document.documentElement,st=h.scrollTop||document.body.scrollTop,max=h.scrollHeight-h.clientHeight;
    if(bar)bar.style.width=(max>0?st/max*100:0)+'%';
    if(top){if(st>600)top.classList.add('show');else top.classList.remove('show')}
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(top)top.addEventListener('click',function(){scrollTo({top:0,behavior:still?'auto':'smooth'})});
  /* reveal on scroll */
  var els=document.querySelectorAll('.stat,.why>div,.skill,.cert-i,.edu,.head,.about .wrap>div,.contact h2,.contact .lede,.contact .btns,.contact .round,.shot,.card');
  if(els.length){
    if(still||!('IntersectionObserver' in window)){for(var i=0;i<els.length;i++)els[i].classList.add('revealed')}
    else{
      var sel='.stat,.why>div,.skill,.cert-i,.edu,.head,.about .wrap>div,.contact h2,.contact .lede,.contact .btns,.contact .round,.shot,.card';
      for(var i=0;i<els.length;i++){var e=els[i],p=e.parentElement,idx=0;
        for(var j=0;j<p.children.length;j++){if(p.children[j]===e)break;if(p.children[j].matches&&p.children[j].matches(sel))idx++}
        e.style.transitionDelay=Math.min(idx,6)*80+'ms'}
      var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('revealed');io.unobserve(en.target)}})},{rootMargin:'-10% 0px -10% 0px',threshold:.08});
      for(var i=0;i<els.length;i++)io.observe(els[i]);
    }
  }
  /* contact links */
  var L=window.LINKS||{};
  var btns=document.querySelectorAll('[data-link]'),shown=0;
  for(var i=0;i<btns.length;i++){
    var b=btns[i],key=b.getAttribute('data-link'),v=(L[key]||'').trim();
    if(v){
      if(key==='email'&&v.indexOf('@')>-1&&v.indexOf('mailto:')!==0)v='mailto:'+v;
      b.href=v;b.target='_blank';b.rel='noopener noreferrer';shown++;
    }else{b.remove()}
  }
  var note=document.querySelector('.contact-note');
  if(note&&shown===0)note.hidden=false;
})();
window.T_JAY_API = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:8001/chat" // optional local FastAPI backend
  : "/api/chat"; // Cloudflare Pages Function — Gemini key stays server-side as a secret

(function(){
 var tog=document.getElementById('tjayToggle'),panel=document.getElementById('tjayPanel'),
     cls=document.getElementById('tjayClose'),body=document.getElementById('tjayBody'),
     form=document.getElementById('tjayForm'),inp=document.getElementById('tjayInput'),
     prompts=document.getElementById('tjayPrompts');
 if(!tog||!panel||!body||!form||!inp)return;

 function setOpen(open){
  panel.hidden=!open;
  tog.setAttribute('aria-expanded',open?'true':'false');
  if(open)setTimeout(function(){inp.focus()},60);
 }
 tog.addEventListener('click',function(){setOpen(panel.hidden)});
 if(cls)cls.addEventListener('click',function(){setOpen(false)});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden)setOpen(false)});

 function addMsg(text,who){
  var d=document.createElement('div');
  d.className='tjay-msg '+who;
  text.split(/\n\n+/).forEach(function(para){
   var p=document.createElement('p');
   p.textContent=para.trim();
   if(p.textContent)d.appendChild(p);
  });
  body.appendChild(d);
  body.scrollTop=body.scrollHeight;
  return d;
 }

 function localReply(q){
  var s=q.trim().toLowerCase();
  if(/\b(assalam|salam|aoa|kya|kaise|kaisi|kese|batao|bataen|tum|aap|urdu)\b/i.test(s)){
   if(/\b(assalam|salam|aoa)\b/i.test(s)&&s.split(/\s+/).length<=5){
    return "Wa Alaikum Assalam! Welcome to Taiba Jamil's portfolio. Main T-JAY hoon, unka AI portfolio assistant.\n\nAap unke AI & Computer Vision projects, technical skills, certifications, ya internship availability ke baare mein kuch bhi pooch sakte hain. Batayein, main aapki kya madad karoon?";
   }
   return "Bilkul! Main T-JAY hoon, Taiba Jamil ka AI portfolio assistant.\n\nTaiba aik aspiring AI Solutions Developer hain (BSCS, expected 2027) jo AI Automation, n8n workflows, LLMs, RAG, Computer Vision (YOLO), aur modern web development par kaam karti hain. Unke projects mein Fire Detection, Object Detection, Heart Disease Prediction, AI Resume Analyzer aur ek RAG-Based Assistant shamil hain.\n\nAap kisi specific project, skill, ya unse contact karne ke baare mein pooch sakte hain!";
  }
  if(/^(hi+|hello+|hey+|hii+|helo+|yo+|good\s*(morning|afternoon|evening)|greetings|howdy)[!.,\s]*$/i.test(s)||/\b(how are you|how r u|how's it going|what's up)\b/i.test(s)){
   return "Hello! It's great to have you here. I'm T-JAY, Taiba Jamil's AI portfolio assistant.\n\nI'm doing great and ready to help you explore Taiba's work in AI automation, LLMs, RAG, computer vision, and web development. What would you like to know first—her projects, her tech stack, or her internship availability?";
  }
  if(/\b(who are you|what are you|your name|t-jay|tjay|what can you do)\b/i.test(s)){
   return "I'm T-JAY, Taiba Jamil's AI-powered portfolio assistant.\n\nMy job is to help recruiters, collaborators, and visitors explore Taiba's verified projects, technical toolkit, certifications, and how to connect with her for internships or projects.";
  }
  if(/\b(fire|object detection|yolo|computer vision|cv)\b/i.test(s)){
   return "Taiba has built two hands-on Computer Vision systems using YOLO and Python:\n\n• Fire Detection: Spots fire in images and video feeds to flag danger early.\n• Object Detection: Identifies and labels objects across images and video frames, trained and tested on annotated datasets.";
  }
  if(/\b(heart|disease|stanford|medical|classification)\b/i.test(s)){
   return "Her Heart Disease Prediction project applies Supervised Machine Learning (completed alongside Stanford Online's Supervised Machine Learning course) to predict heart disease likelihood from clinical features like age, blood pressure, and cholesterol.";
  }
  if(/\b(resume|analyzer|nlp)\b/i.test(s)){
   return "The AI Resume Analyzer (built with Python, NLP, and LLMs for her Google AI Professional Certificate) reads a resume, extracts skills and experience, evaluates job-match fit, and suggests targeted improvements.";
  }
  if(/\b(rag|assistant|document|retrieval)\b/i.test(s)){
   return "Her RAG-Based Assistant (currently in progress) answers questions grounded in a custom set of documents by retrieving the most relevant passages first and passing that context to an LLM for accurate responses.";
  }
  if(/\b(n8n|triage|email|workflow|automation|toolkit|faq|chatbot|matplotlib|dashboard)\b/i.test(s)){
   return "In automation and data workflows, Taiba has built:\n\n• Lead & Email Triage (n8n + LLMs, LearnKartS): Classifies and summarizes incoming messages, then routes them to a sheet, reply draft, or alert.\n• Smart FAQ Chatbot (Google AI Fundamentals): Answers business FAQs with a clean fallback.\n• Python Automation Toolkit (Certiport) & Data Insights Dashboard (Coursera Matplotlib).";
  }
  if(/\b(cert|certificate|certification|education|degree|bscs|university|study|2027)\b/i.test(s)){
   return "Taiba is pursuing a Bachelor of Science in Computer Science (expected graduation 2027) and holds 7 verified certifications:\n\n• Workflow with n8n (LearnKartS)\n• Google AI Professional Certificate & AI Fundamentals (Google)\n• Supervised Machine Learning (Stanford Online)\n• Plot Creation using Matplotlib (Coursera)\n• Python Certified (Certiport) & Web Developer Certificate.";
  }
  if(/\b(about|who is|taiba|background|story)\b/i.test(s)){
   return "Taiba Jamil is an aspiring AI Solutions Developer (BSCS, expected 2027) focused on building practical, intelligent technology.\n\nShe combines hands-on work in Computer Vision (YOLO), Machine Learning, LLMs, RAG, and n8n workflow automation with clean, responsive web development.";
  }
  if(/\b(project|projects|work|portfolio|built)\b/i.test(s)){
   return "Taiba's portfolio includes 9 focused projects:\n\n• Built: Fire Detection (YOLO), Object Detection (YOLO), Heart Disease Prediction, and AI Resume Analyzer.\n• In progress: RAG-Based Assistant.\n• Certificate projects: Lead & Email Triage (n8n + LLM), Data Insights Dashboard, Smart FAQ Chatbot, and Python Automation Toolkit.\n\nAsk me about any specific project if you'd like the technical details!";
  }
  if(/\b(tech|skill|skills|stack|tool|tools|python|language|languages)\b/i.test(s)){
   return "Taiba's verified toolkit spans three areas:\n\n• Generative AI & Agents: LLMs, RAG, AI Agents, Agentic AI, and n8n workflow automation.\n• ML & Computer Vision: Machine Learning, Deep Learning, Computer Vision, YOLO, and EDA.\n• Programming & Web: Python (Certiport certified), JavaScript, Matplotlib, and responsive website development.";
  }
  if(/\b(intern|internship|hire|job|available|work together|contact|email|gmail|linkedin|github|reach)\b/i.test(s)){
   return "Yes! Taiba is actively looking for internship opportunities and meaningful collaborations in AI, machine learning, automation, and web development.\n\nYou can reach her at taibanoor926@gmail.com, connect on LinkedIn (in/taibajamil00), or check her repositories on GitHub (@taibanoor133).";
  }
  return "Thanks for reaching out! I'm T-JAY, Taiba Jamil's AI portfolio assistant.\n\nI can share details on her AI & Computer Vision projects (like YOLO Fire Detection, AI Resume Analyzer, or her RAG Assistant), her Python/LLM/n8n tech stack, her 7 certifications, or how to contact her for internships. What would you like to explore?";
 }

 async function handleQuery(q){
  q=q.trim();
  if(!q)return;
  if(prompts)prompts.style.display='none';
  addMsg(q,'user');
  inp.value='';
  var typing=addMsg('Thinking...','bot');
  var api=(window.T_JAY_API||'').trim();
  if(api){
   try{
    var res=await fetch(api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q})});
    if(res.ok){
     var data=await res.json();
     if(data&&data.reply){typing.remove();addMsg(data.reply,'bot');return;}
    }
   }catch(err){}
  }
  setTimeout(function(){typing.remove();addMsg(localReply(q),'bot');},380);
 }
 form.addEventListener('submit',function(e){e.preventDefault();handleQuery(inp.value)});
 if(prompts){
  prompts.addEventListener('click',function(e){
   var btn=e.target.closest('button[data-q]');
   if(btn)handleQuery(btn.getAttribute('data-q'));
  });
 }
})();
