(this.webpackJsonprimasapp=this.webpackJsonprimasapp||[]).push([[0],[,,,,function(e,n,t){},,function(e,n,t){},function(e,n,t){e.exports={rectangle:"RhymingWords_rectangle__hyijZ"}},function(e,n,t){e.exports={rectangle:"WordLabel_rectangle__2D6RD"}},,,,,function(e,n,t){},,function(e,n,t){"use strict";t.r(n);var c=t(1),l=t.n(c),r=t(5),a=t.n(r),i=(t(13),t(2)),o=t(6),u=t.n(o),s=["b","c","d","f","g","h","j","k","l","m","n","\xf1","p","q","r","s","t","v","w","x","y","z"],d=["a","\xe1","e","\xe9","i","\xed","o","\xf3","u","\xfa","\xfc"],p=["a","e","o","\xe1","\xe9","\xed","\xf3","\xfa"],g=["\xe1","\xe9","\xed","\xf3","\xfa"],f=["bl","br","ch","cl","cr","dr","fl","fr","gl","gr","ll","rr","pr","pl","tl","tr","kl","kr"],h=function(e){if(d.includes(e[0])){if(p.includes(e[0])&&p.includes(e[1]))return"hiato";if(d.includes(e[1]))return"diptongo";if(s.includes(e[1]))return"vowel-consonant"}if(s.includes(e[0])){if(s.includes(e[1]))return"double-consonant";if(d.includes(e[1]))return"consonant-vowel"}return"undefined"},j=function(e){e=e.toLowerCase();for(var n=[],t="",c=0;c<e.length;c++){if(e.length===c+1&&n.push(t+e[c]),e.length>=c+2){var l="".concat(e[c]).concat(e[c+1]),r=h(l),a=!1;if("hiato"===r){t+=l[0],n.push(t),t="";continue}if("double-consonant"===r){t=l,c++;continue}if("vowel-consonant"===r&&(t+=l[0]),"consonant-vowel"===r||"diptongo"===r||"vowel-consonant"===r){if("vowel-consonant"!==r&&(t+=l,c++,e.length>=c+2&&("diptongo"===h("".concat(l[1]).concat(e[c+1]))&&(t+=e[c+1],c++,e.length>=c+2&&"diptongo"===h("".concat(e[c]).concat(e[c+1]))&&(t+=e[c+1],c++)),"hiato"===h("".concat(l[1]).concat(e[c+1]))))){n.push(t),t="";continue}if(c+1===e.length-1){if("hiato"===h("".concat(e[c]).concat(e[c+1]))){n.push(t),n.push(e[c+1]);break}n.push("".concat(t).concat(e[c+1]));break}if(c++,e.length>=c+2){var i="".concat(e[c]).concat(e[c+1]);"double-consonant"===h(i)&&(e.length>=c+3?(d.includes(e[c+2])&&!f.includes(i)&&(t+=i[0],n.push(t),a=!0),s.includes(e[c+2])&&!f.includes("".concat(i[1]).concat(e[c+2]))&&(t+=i,n.push(t),a=!0,c++),s.includes(e[c+2])&&f.includes("".concat(i[1]).concat(e[c+2]))&&(t+=i[0],n.push(t),a=!0)):(t+=i,n.push(t),a=!0,c++))}a||(n.push(t),c--)}}t=""}return n[0]=n[0].replace(n[0][0],n[0][0].toUpperCase()),n},b=function(e){var n,t,c=j(e);1===c.length?(t=0,n="aguda"):c.some((function(e,n){return!!Array.from(e).some((function(e){return!!g.includes(e)&&(t=n,!0)}))}))?(t===c.length-1&&(n="aguda"),t===c.length-2&&(n="grave"),t===c.length-3&&(n="esdr\xfajula"),t<c.length-3&&(n="sobresdr\xfajula")):"n"===e[e.length-1]||"s"===e[e.length-1]||d.includes(e[e.length-1])?(n="grave",t=c.length-2):(n="aguda",t=c.length-1);return[n,t]},v=function(e){for(var n=function(e){e=e.toLowerCase();for(var n=0;n<e.length;n++)if(d.includes(e[n]))return n===e.length-1||s.includes(e[n+1])?"cima-simple":n+2<e.length&&d.includes(e[n+1])&&d.includes(e[n+2])?"triptongo":p.includes(e[n])?"diptongo-decreciente":"diptongo-creciente";return"undefined"}(e=e.toLowerCase()),t=0;t<e.length;t++)if(d.includes(e[t])){if("cima-simple"===n||"diptongo-decreciente"===n)return e.slice(t);if("diptongo-creciente"===n)return e.slice(t+1);if("triptongo"===n)for(var c=t;c<3;c++)if(p.includes(e[c]))return e.slice(c)}return""},m=function(e){e=e.toLowerCase();for(var n="",t=0;t<e.length;t++)d.includes(e[t])&&(g.includes(e[t])?n+=A(e[t]):n+=e[t]);return n},O=function(e){return e=(e=e.toLowerCase()).replaceAll("z","s").replaceAll("x","ks").replaceAll("ce","se").replaceAll("ci","si").replaceAll("c\xe9","s\xe9").replaceAll("c\xed","s\xed").replaceAll("ss","s").replaceAll("ch","x").replaceAll("h","").replaceAll("c","k").replaceAll("x","ch").replaceAll("que","ke").replaceAll("qu\xe9","k\xe9").replaceAll("qui","ki").replaceAll("qu\xed","k\xed").replaceAll("q","k").replaceAll("v","b").replaceAll("nb","mb").replaceAll("ge","je").replaceAll("gi","ji").replaceAll("g\xe9","j\xe9").replaceAll("g\xed","j\xed").replaceAll("gue","ge").replaceAll("gui","gi").replaceAll("gu\xe9","g\xe9").replaceAll("gu\xed","g\xed").replaceAll("\xfc","u").replaceAll("ll","y").replaceAll("w","u")},A=function(e){return"\xe1"===e?"a":"\xe9"===e?"e":"\xed"===e?"i":"\xf3"===e?"o":"\xfa"===e?"u":void 0},x=t(0);var w=function(e){var n=Object(c.useState)(""),t=Object(i.a)(n,2),l=t[0],r=t[1],a=Object(c.useState)(""),o=Object(i.a)(a,2);return o[0],o[1],Object(x.jsx)("form",{onSubmit:function(n){n.preventDefault(),e.submitHandler(j(l).join("-"),b(l)[0]),e.clearWord&&r("")},children:Object(x.jsx)("input",{className:u.a,maxLength:33,placeholder:"Digite una palabra",onChange:function(n){var t;r(n.target.value.trim()),null===(t=e.onChangeInput)||void 0===t||t.call(e,n.target.value.trim())},value:l,required:!0})})},k=(t(7),t(8)),C=t.n(k);var L=function(e){return Object(x.jsx)("div",{className:C.a.rectangle,children:e.word})};var S=t(4),q=t.n(S);var y=function(){var e=Object(c.useState)(""),n=Object(i.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(""),o=Object(i.a)(a,2),u=o[0],s=o[1],d=Object(c.useState)(""),p=Object(i.a)(d,2),g=p[0],f=p[1],h=Object(c.useState)(""),A=Object(i.a)(h,2),k=A[0],C=A[1],S=Object(c.useState)(""),y=Object(i.a)(S,2),_=y[0],N=y[1],R=function(){f(function(e,n){if(b(e)[0]===b(n)[0]){e=O(e),n=O(n);var t=j(e).slice(b(e)[1]),c=j(n).slice(b(n)[1]);if(t.join("").toLowerCase()===c.join("").toLowerCase())return"Rima perfecta";if(t[0]=v(t[0]),c[0]=v(c[0]),t.join("").toLowerCase()===c.join("").toLowerCase())return"Rima regular";var l=t.map((function(e){return m(e)})),r=c.map((function(e){return m(e)}));if(l.every((function(e,n){return e===r[n]})))return"Rima vaga"}return"No rima"}(k,_))};return Object(x.jsxs)(l.a.Fragment,{children:[Object(x.jsxs)("div",{className:q.a,children:[Object(x.jsx)("div",{children:Object(x.jsx)(w,{submitHandler:function(e,n){r(e),s(n)},clearWord:!0})}),Object(x.jsxs)("div",{children:[Object(x.jsx)(L,{word:t}),Object(x.jsx)(L,{word:u})]})]}),Object(x.jsxs)("div",{className:q.a,children:[Object(x.jsx)("div",{children:Object(x.jsx)(w,{submitHandler:R,onChangeInput:function(e){C(e)}})}),Object(x.jsx)("div",{children:Object(x.jsx)(w,{submitHandler:R,onChangeInput:function(e){N(e)}})}),Object(x.jsx)("div",{children:Object(x.jsx)(L,{word:g})})]})]})};a.a.render(Object(x.jsx)(l.a.StrictMode,{children:Object(x.jsx)(y,{})}),document.getElementById("root"))}],[[15,1,2]]]);
//# sourceMappingURL=main.2af858e3.chunk.js.map