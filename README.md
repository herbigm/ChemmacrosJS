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

## Syntax


## Use in Vanilla JavaScript

## Use in LiaScript

### Loading
Import this file like other LiaScript templates:

```html
<!--
import: https://raw.githubusercontent.com/herbigm/ChemmacrosJS/refs/heads/main/README.md
-->
```

### Chemical formulae in the Text
There is a macro for displaying formulae in HTML:

```html
@ch(`K3[Fe(CN)6]`)
```

Be carefull, if the formula contains comma or parenthesis, backticks are required around the formula.

### Chemical Eqations
There are two macros to define chemical equations in LiaScript:

```
@reaction(2 H2 + O2 -> 2 H2O)

@reactions(```
3 H2 + N2 &-> 2 NH3\\
4 NH3 + 5 O2 &-> 4 NO + 6 H2O
```)

```

When using the *reaction* macro, no numbering of the equation or alignment will be done while the use of the *reactions* macro the equations will be aligned accordin to the position of & and euqations will be enummerated. As for the formulae, if the code inside the reaction macro contains any parenthesis or comma, it has to be enclosed by backticks. 

### GHS pictograms
To include GHS pictograms in LiaScript, use the macro *ghspic* with the pic you want to include as argument, separated by whitespaces.

```html
@ghspic(explos flame flame-O bottle acid skull exclam health aqpol)
```

### H and P Statements
For displaying H and P statements, the mhchem repository is used: https://github.com/mhchem/hpstatements

There are three macros to include the sentences:

```
@hstatements(290-263-304)

@pstatements(310-305+351+338)

@statementsLangType(<lang>, <H|P>, <numbers>)

```

## License
This project is published to the terms of the [CC-BY Attribution 4.0 International Deed](https://creativecommons.org/licenses/by/4.0/).
