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
  if (!window.formatPicsLiaScript) {
    setTimeout(ghspic, 100)
    return
  }
  send.lia("LIASCRIPT: " + formatPicsLiaScript('@0'));
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

## Use in LiaScript

### Loading


### Chemical formulae in the Text

### Chemical Eqations


### GHS pictograms


### H and P Statements


## License
This project is published to the terms of the [CC-BY Attribution 4.0 International Deed](https://creativecommons.org/licenses/by/4.0/).
