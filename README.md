<!--

author:  Dr. Marcus Herbig
email:   marcus.herbig@chemie.tu-freiberg.de

version: 0.5

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
    send.lia("LIASCRIPT: <div class=\"chemreaction\">" +interpretChemmacros('@0') + "</div>")
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
    send.lia("LIASCRIPT: " +formatReactions(`@'0`))
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
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/4/4a/GHS-pictogram-explos.svg\" alt=\"explosive\" class=\"ghspic\">\n";
              break;
          case "flame":
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/6/6d/GHS-pictogram-flamme.svg\" alt=\"flammable\" class=\"ghspic\">\n";
              break;
          case "flame-O":
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/e/e5/GHS-pictogram-rondflam.svg\" alt=\"oxidizing\" class=\"ghspic\">\n";
              break;
          case "bottle":
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/6/6a/GHS-pictogram-bottle.svg\" alt=\"gas under pressure\" class=\"ghspic\">\n";
              break;
          case "acid":
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/a/a1/GHS-pictogram-acid.svg\" alt=\"corrosive\" class=\"ghspic\">\n";
              break;
          case "skull":
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/5/58/GHS-pictogram-skull.svg\" alt=\"acutely toxic\" class=\"ghspic\">\n";
              break;
          case "exclam":
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/c/c3/GHS-pictogram-exclam.svg\" alt=\"irritating\" class=\"ghspic\"-->\n";
              break;
          case "health":
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/2/21/GHS-pictogram-silhouette.svg\" alt=\"harmful\" class=\"ghspic\">\n";
              break;
          case "aqpol":
              ret += "<img src=\"https://upload.wikimedia.org/wikipedia/commons/b/b9/GHS-pictogram-pollu.svg\" alt=\"hazadrous for the environment\" class=\"ghspic\">\n";
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

## Syntax
The syntax is quite simple, there are only some rules:

* the fist character after ^ will be superscripted
* all characters in {} after ^ will be superscripted
* the first character after _ will be subscripted
* all characters in {} after _ will be subscripted
* Numbers after brackets, parenthesis and element symbols will be subscripted
* &plus; and &minus; after brackets, parenthesis and element symbols will be superscripted
* . and * will be interpreted as &middot;
* equations will be splitted at whitespaces and interpreted in parts

### Arrows
| Code | Result |
|:---:|:---:|
| -> | &srarr; |
| ^ (with whitespaces around) | &uparrow; |
| v (with whitespaces around) | &downarrow; |
| <=> | &rlarr; |

### Examples
```html
Al2O3
K4[Fe(CN)6]
2 H2 + O2 -> 2 H2O
H2 + I2 <=> 2 HI
CuSO4 . 5 H2O
```

## Use in Vanilla JavaScript

## Loading
Jut include the script and stylefile in the header of your HTML document.

```html
<!--
<link rel="stylesheet" href="style_chemmacros.css">
<script src="chemmacros.js"></script>
-->
```

### Chemical formulae in the Text
All elements of the class *chemmacros* will be interpreted and replaced by the formula inside.

```html
<span class="chemmacros">Al2(SO4)3</span>
```

### Chemical Equations
All elements of the class *chemreaction* and *chemreactions* will be interpreted and replaced by the formula inside. The second class is for aligned and numbered multiline equations.

```html
<span class="chemreaction">HCl_{(g)} + NH_{3(g)} -> NH_4Cl_{(s)} </span>

<div class="chemreactions">
  HCl_{(g)} + NH_{3(g)} &-> NH_4Cl_{(s)}\\
  2 H2 + O2 &-> 2 H2O
</div>
```

When using the *chemreaction* class, no numbering of the equation or alignment will be done while the use of the *chemreactions* class the equations will be aligned accordin to the position of & and euqations will be enummerated.

### GHS pictograms
Any element of the class *ghspicContainer* will be filled with the pictograms. Add all pictogram identifiers in the data-pics attribute.
```html
<span class="ghspicContainer" data-pics="exclam flame"></span>
```

### H and P Statements
Any element of the class *clpstatements* will be filled with the statements. Add all statements in the *data-hstatements* and *data-pstatements* attributes. You may add another langugae than englisch setting the *data-lang* attribute. 

```html
<span class="clpstatements" data-hstatements="302​‐​331​‐​315​‐​319​‐​351​‐​361d​‐​336​‐​372​‐​412" data-pstatements="201​‐​273​‐​301+312+330​‐​302+352​‐​304+340+311​‐​308+313" data-lang="sv"></span>

```

You can fill gaps in the statements by adding the filling in brackets after the statement. If there are multiple gaps, you can split them using ";". It is possible to simply remove gaps by passing nothing in the brackets:

```html
<span class="clpstatements" data-hstatements="370[Liver;]"></span>

```

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

### Chemical Equations
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

You can fill gaps in the statements by adding the filling in brackets after the statement. If there are multiple gaps, you can split them using ";". It is possible to simply remove gaps by passing nothing in the brackets:

```
@hstatements(370[Liver;])
```

## License
This project is published to the terms of the [CC-BY Attribution 4.0 International Deed](https://creativecommons.org/licenses/by/4.0/).
