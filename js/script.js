const hamburger=document.getElementById("hamburger"),mobileMenu=document.getElementById("mobileMenu");
hamburger?.addEventListener("click",()=>mobileMenu.classList.toggle("open"));
document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>mobileMenu.classList.remove("open")));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target)}
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

const counters=document.querySelectorAll("[data-count]");
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,target=Number(el.dataset.count);let value=0;
  const timer=setInterval(()=>{value+=Math.ceil(target/45);if(value>=target){value=target;clearInterval(timer)}el.textContent=value.toLocaleString()+"+"},30);
  counterObserver.unobserve(el);
}),{threshold:.8});
counters.forEach(el=>counterObserver.observe(el));

const questions=[
 {q:"What do you enjoy the most?",a:[["explore","⌕ Exploring new ideas"],["create","✦ Creating things"],["analyze","▥ Analyzing information"],["lead","♧ Leading and managing"]]},
 {q:"When solving a problem, you usually…",a:[["explore","Research different options"],["create","Try a new solution"],["analyze","Break it into data"],["lead","Ask people and coordinate"]]},
 {q:"Which project sounds most exciting?",a:[["explore","Discovering a new market"],["create","Designing something new"],["analyze","Finding patterns in data"],["lead","Running a small team"]]},
 {q:"What feels most rewarding?",a:[["explore","Learning something unknown"],["create","Making an idea real"],["analyze","Finding the right answer"],["lead","Helping people move forward"]]}
];
let qi=0;
const qEl=document.getElementById("question"),aEl=document.getElementById("answers"),nEl=document.getElementById("qNo"),pEl=document.getElementById("progress"),rEl=document.getElementById("result");
function renderQuestion(){
 const q=questions[qi];qEl.textContent=q.q;nEl.textContent=String(qi+1).padStart(2,"0");pEl.style.width=((qi+1)/questions.length*100)+"%";
 aEl.innerHTML=q.a.map(x=>`<button data-type="${x[0]}"><i>${x[1].split(" ")[0]}</i>${x[1].substring(x[1].indexOf(" ")+1)}</button>`).join("");
 aEl.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>answer(btn.dataset.type,btn)));
}
function answer(type,btn){
 aEl.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");
 const labels={explore:"Explorer",create:"Creator",analyze:"Analyst",lead:"Leader"};
 rEl.textContent=`आपका natural style ${labels[type]} की तरफ जाता है — next step में इसे skills और action से connect करें।`;
 setTimeout(()=>{if(qi<questions.length-1){qi++;renderQuestion()}},650);
}
renderQuestion();
document.getElementById("quizStart")?.addEventListener("click",()=>document.getElementById("quiz").scrollIntoView({behavior:"smooth"}));
