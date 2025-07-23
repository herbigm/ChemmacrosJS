async function INITchemmacros() {
    const formulae = document.querySelectorAll(".chemmacros");
    for (const f of formulae) {
        let k = interpretChemmacros(f.innerText);
        f.innerHTML = k;
    }

    const reaction = document.querySelectorAll(".chemreaction");
    for (const f of reaction) {
        let k = interpretChemmacros(f.innerText);
        f.innerHTML = k;
    }

    const reactions = document.querySelectorAll(".chemreactions");
    for (const f of reactions) {
        f.style.display = "grid";
        let equations = f.innerText.split("\\\\");
        f.innerHTML = "";
        for (const eqn of equations) {
            let parts = eqn.split("&");
            for (let i = 0; i < parts.length; i++) {
                let span = document.createElement("span");
                span.classList.add("eqnc" + i);
                span.innerHTML = interpretChemmacros(parts[i]);
                f.appendChild(span);
            }
            let span = document.createElement("span");
            span.classList.add("eqncounter");
            f.appendChild(span);
        }
    }

    const ghspics = document.querySelectorAll(".ghspicContainer");
    for (const f of ghspics) {
        const whichOnes = f.dataset.pics.split(/\s+/);
        for (const type of whichOnes) {
            let pic = document.createElement("img");
            pic.classList.add("ghspic");
            switch (type) {
                case "explos":
                    pic.src = "img/ghs/ghs01.svg";
                    f.appendChild(pic);
                    break;
                case "flame":
                    pic.src = "img/ghs/ghs02.svg";
                    f.appendChild(pic);
                    break;
                case "flame-O":
                    pic.src = "img/ghs/ghs03.svg";
                    f.appendChild(pic);
                    break;
                case "bottle":
                    pic.src = "img/ghs/ghs04.svg";
                    f.appendChild(pic);
                    break;
                case "acid":
                    pic.src = "img/ghs/ghs05.svg";
                    f.appendChild(pic);
                    break;
                case "skull":
                    pic.src = "img/ghs/ghs06.svg";
                    f.appendChild(pic);
                    break;
                case "exclam":
                    pic.src = "img/ghs/ghs07.svg";
                    f.appendChild(pic);
                    break;
                case "health":
                    pic.src = "img/ghs/ghs08.svg";
                    f.appendChild(pic);
                    break;
                case "aqpol":
                    pic.src = "img/ghs/ghs09.svg";
                    f.appendChild(pic);
                    break;
            }
        }
    }

    const clp = document.querySelectorAll(".clpstatements");
    for (const f of clp) {
        f.classList.add("hpstatements");
        let res = await fetch("https://raw.githubusercontent.com/mhchem/hpstatements/refs/heads/master/clp/hpstatements-"+lang+"-latest.json");
        let all = await res.json();
        let value = text;
        t = t.trim();
        if (t == 'H') {
            let H = [];
            let satzListe = value.matchAll(/((EUH|H|P)?\d{3}[ifdDF]*\s*\+?\s*){1,3}(\[.*?\])?/g);
            for (const satz of satzListe) {
                let list = satz[0].match(/(\d{3}[ifdDF]*)/g);
                if (satz[2] == "EUH" || list[0].startsWith("0")) {
                    value = "EUH" + list[0];
                } else {
                    value = "H" + list.join("+H");
                }if (satz[3]) {
                    value += satz[3];
                }
                H.push(value);
            }
            H.sort();
            H = [...new Set(H)];
            for (let h of H) {
                let replacement = "";
                let m = h.match(/\[(.*?)\]/);
                if (m) {
                    replacement = m[1].split(/\s*;\s*/gui);
                    h = h.replace(m[0], "");
                }
                let dt = document.createElement("span");
                dt.classList.add("clpDT");
                dt.textContent = h;
                f.appendChild(dt);
                let dd = document.createElement("span");
                dd.classList.add("clpDD");
                if (replacement == "") {
                    dd.textContent = all["statements"]["latest/"+lang+"/" + h];
                } else {
                    let ctx = all["statements"]["latest/"+lang+"/" + h];
                    for (const r of replacement) {
                        ctx = ctx.replace(/<.*?>/ui, r);
                    }
                    dd.textContent = ctx;
                }
                f.appendChild(dd);
            }
        } else if (t == "P") {
            let P = [];
            let satzListe = value.matchAll(/((?:EUH|H|P)?\d{3}[ifdDF]*\s*\+?\s*){1,3}(\[.*?\])?/g);
            for (const satz of satzListe) {
                let list = satz[0].match(/(\d{3}[ifdDF]*)/g);
                value = "P" + list.join("+P");
                if (satz[2]) {
                    value += satz[2];
                }
                P.push(value);
            }
            P.sort();
            P = [...new Set(P)];

            for (let p of P) {
                let replacement = "";
                let m = p.match(/\[(.*?)\]/);
                if (m) {
                    replacement = m[1].split(/\s*;\s*/gui);
                    p = p.replace(m[0], "");
                }
                let dt = document.createElement("span");
                dt.classList.add("clpDT");
                dt.textContent = p;
                f.appendChild(dt);
                let dd = document.createElement("span");
                dd.classList.add("clpDD");
                if (replacement == "") {
                    dd.textContent = all["statements"]["latest/"+lang+"/" + p];
                } else {
                    let ctx = all["statements"]["latest/"+lang+"/" + p];
                    for (const r of replacement) {
                        ctx = ctx.replace("…", r);
                    }
                    dd.textContent = ctx;
                }
                f.appendChild(dd);
            }
        } else {
            console.log("Hä!?!");
        }
    }
}

function interpretChemmacros(text) {
    let parts = text.split(/\s+/gi);
    for (let i = 0; i < parts.length; i++) {
        parts[i] = parts[i].trim();
        // replace . and * as middle dot
        parts[i] = parts[i].replaceAll(/\s*[\.\*]\s*/gui, "&middot;");
        // superscript with ^
        parts[i] = parts[i].replaceAll(/\s*\^\{([\d\+\-\S]+)\}\s*/gui, "<sup class=\"chemmacrosSuper\">$1</sup>");
        parts[i] = parts[i].replaceAll(/\s*\^([\d\+\-\S]{1})\s*/gui, "<sup class=\"chemmacrosSuper\">$1</sup>");
        // superscript of charge
        parts[i] = parts[i].replaceAll(/(\S)([+\-]){1}$/gui, "$1<sup class=\"chemmacrosSuper\">$2</sup>");
        // numbers after element symbols
        parts[i] = parts[i].replaceAll(/\s*([A-Z]{1}[a-z]?|\)|\})(\d+)\s*/gui, "$1<sub class=\"chemmacrosSub\">$2</sub>");
        // subscript after _
        parts[i] = parts[i].replaceAll(/_\{([^\{\}]+)\}/gui, "<sub class=\"chemmacrosSub\">$1</sub>");
        parts[i] = parts[i].replaceAll(/_([^\{\}]{1})/gui, "<sub class=\"chemmacrosSub\">$1</sub>");

        //arrows
        parts[i] = parts[i].replaceAll(/(\\rightarrow|->)/gui, "&xrarr;");
        parts[i] = parts[i].replaceAll(/(\\uparrow|\^)/gui, "&uparrow;");
        parts[i] = parts[i].replaceAll(/(\\downarrow|v)/gui, "&downarrow;");
        parts[i] = parts[i].replaceAll(/(\\leftrightarrows|<=>)/gui, "&rlarr;");
        // clean up
        parts[i] = parts[i].replaceAll("</sup><sup class=\"chemmacrosSuper\">", "");
        parts[i] = parts[i].replaceAll("</sub><sup class=\"chemmacrosSuper\">", "</sub><sup class=\"chemmacrosSuperBack\">");
    }
    text = parts.join(" ");
    return text;
}

// equations
let i = 0; // counter
function formatReactions(text) {
    let f = document.createElement("div");
    f.classList.add("chemreactions");
    let equations = text.split("\\\\");
    for (const eqn of equations) {
        let parts = eqn.split("&");
        for (let i = 0; i < parts.length; i++) {
            let span = document.createElement("span");
            span.classList.add("eqnc" + i);
            span.innerHTML = interpretChemmacros(parts[i]);
            f.appendChild(span);
        }
        let span = document.createElement("span");
        // counter
        i++;
        span.classList.add("eqncounter");
        span.innerText = "(" + (i) + ")";
        f.appendChild(span);
    }
    return f.outerHTML;
}

async function formatStatements (lang, t, text) {
    let f = document.createElement("div");
    f.classList.add("hpstatements");
    let res = await fetch("https://raw.githubusercontent.com/mhchem/hpstatements/refs/heads/master/clp/hpstatements-"+lang+"-latest.json");
    let all = await res.json();
    let value = text;
    t = t.trim();
    if (t == 'H') {
        let H = [];
        let satzListe = value.matchAll(/((EUH|H|P)?\d{3}[ifdDF]*\s*\+?\s*){1,3}(\[.*?\])?/g);
        for (const satz of satzListe) {
            let list = satz[0].match(/(\d{3}[ifdDF]*)/g);
            if (satz[2] == "EUH" || list[0].startsWith("0")) {
                value = "EUH" + list[0];
            } else {
                value = "H" + list.join("+H");
            }if (satz[3]) {
                value += satz[3];
            }
            H.push(value);
        }
        H.sort();
        H = [...new Set(H)];
        for (let h of H) {
            let replacement = "";
            let m = h.match(/\[(.*?)\]/);
            if (m) {
                replacement = m[1].split(/\s*;\s*/gui);
                h = h.replace(m[0], "");
            }
            let dt = document.createElement("span");
            dt.classList.add("clpDT");
            dt.textContent = h;
            f.appendChild(dt);
            let dd = document.createElement("span");
            dd.classList.add("clpDD");
            if (replacement == "") {
                dd.textContent = all["statements"]["latest/"+lang+"/" + h];
            } else {
                let ctx = all["statements"]["latest/"+lang+"/" + h];
                for (const r of replacement) {
                    ctx = ctx.replace(/<.*?>/ui, r);
                }
                dd.textContent = ctx;
            }
            f.appendChild(dd);
        }
    } else if (t == "P") {
        let P = [];
        let satzListe = value.matchAll(/((?:EUH|H|P)?\d{3}[ifdDF]*\s*\+?\s*){1,3}(\[.*?\])?/g);
        for (const satz of satzListe) {
            let list = satz[0].match(/(\d{3}[ifdDF]*)/g);
            value = "P" + list.join("+P");
            if (satz[2]) {
                value += satz[2];
            }
            P.push(value);
        }
        P.sort();
        P = [...new Set(P)];

        for (let p of P) {
            let replacement = "";
            let m = p.match(/\[(.*?)\]/);
            if (m) {
                replacement = m[1].split(/\s*;\s*/gui);
                p = p.replace(m[0], "");
            }
            let dt = document.createElement("span");
            dt.classList.add("clpDT");
            dt.textContent = p;
            f.appendChild(dt);
            let dd = document.createElement("span");
            dd.classList.add("clpDD");
            if (replacement == "") {
                dd.textContent = all["statements"]["latest/"+lang+"/" + p];
            } else {
                let ctx = all["statements"]["latest/"+lang+"/" + p];
                for (const r of replacement) {
                    ctx = ctx.replace("…", r);
                }
                dd.textContent = ctx;
            }
            f.appendChild(dd);
        }
    } else {
        console.log("Hä!?!");
    }
    return f.outerHTML;
}


window.interpretChemmacros = interpretChemmacros;

window.INITchemmacros = INITchemmacros;

window.formatReactions = formatReactions;

window.formatStatements = formatStatements;


