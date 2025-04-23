<!--

author:  Dr. Marcus Herbig
email:   marcus.herbig@chemie.tu-freiberg.de

version: 0.1

comment: This is a plugin for including chemical fomulas into LiaScript. The syntax is similar to the LaTeX package chemmacros.

link:      style_chemmacros.css

script:    chemmacros.js

@ch
<script run-once modify="false">
function chemmacros() {
  if (!window.interpretChemmacros) {
    setTimeout(chemmacros, 100)
    return
  }
    send.lia("HTML: " +interpretChemmacros('@0'))
}
chemmacros()
"LIA: wait"
</script>
@end

@reaction
<script run-once modify="false">
function chemmacros() {
  if (!window.interpretChemmacros) {
    setTimeout(chemmacros, 100)
    return
  }
    send.lia("HTML: <div class=\"chemreaction\">" +interpretChemmacros('@0') + "</div>")
}
chemmacros()
"LIA: wait"
</script>
@end

@reactions
<script run-once modify="false">
function chemmacros() {
  if (!window.interpretChemmacros) {
    setTimeout(chemmacros, 100)
    return
  }
    send.lia("HTML: " +formatReactions(`@'0`))
}
chemmacros()
"LIA: wait"
</script>
@end

@ghspic
<script run-once modify="false">
function ghspic() {
  if (!window.interpretChemmacros) {
    setTimeout(ghspic, 100)
    return
  }
  const text = '@0';
  const whichOnes = text.split(/\s+/);
  let ret = "";
  for (const type of whichOnes) {
      switch (type) {
          case "explos":
              ret += "![explosive](img/ghs/ghs01.svg)<!-- class=\"ghspic\"-->\n";
              break;
          case "flame":
              ret += "![flammable](img/ghs/ghs02.svg)<!-- class=\"ghspic\"-->\n";
              break;
          case "flame-O":
              ret += "![oxidizing](img/ghs/ghs03.svg)<!-- class=\"ghspic\"-->\n";
              break;
          case "bottle":
              ret += "![gas under pressure](img/ghs/ghs04.svg)<!-- class=\"ghspic\"-->\n";
              break;
          case "acid":
              ret += "![corrosive](img/ghs/ghs05.svg)<!-- class=\"ghspic\"-->\n";
              break;
          case "skull":
              ret += "![acutely toxic](img/ghs/ghs06.svg)<!-- class=\"ghspic\"-->\n";
              break;
          case "exclam":
              ret += "![irritating](img/ghs/ghs07.svg)<!-- class=\"ghspic\"-->\n";
              break;
          case "health":
              ret += "![harmful](img/ghs/ghs08.svg)<!-- class=\"ghspic\"-->\n";
              break;
          case "aqpol":
              ret += "![hazadrous for the environment](img/ghs/ghs09.svg)<!-- class=\"ghspic\"-->\n";
              break;
      }
  }
  send.lia("LIASCRIPT: " + ret);
}
ghspic()
"LIA: wait"
</script> 
@end

@signalword: <div class="signalword">@0</div>

@statementsLangType
<script run-once modify="false">
async function hpstatements() {
  if (!window.formatStatements) {
    setTimeout(hpstatements, 100)
    return
  }
  send.lia("HTML: " + await formatStatements('@0', '@1', `@'2`))
}
hpstatements()
"LIA: wait"
</script>
@end

@hstatements
  @statementsLangType(en, H, @'0)
@end

@pstatements
  @statementsLangType(en, P, @'0)
@end
-->

# ChemmacrosJS
This project aims to make the functions of the excellent LaTeX package *chemmacros* available for JavaScript and use in HTML. Integration in LiaScript (https://liascript.github.io/) is just as possible as use with vanilla JavaScript.

## Use in Vanilla JavaScript


## License
This project is published to the terms of the [CC-BY Attribution 4.0 International Deed](https://creativecommons.org/licenses/by/4.0/).
