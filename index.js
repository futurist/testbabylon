var babylon = require('babylon')
var t = require('babel-types')
var traverse = require('babel-traverse')['default']
var gen = require('babel-generator')['default']
const transProp = require('babel-plugin-transform-member-expression-literals')


var code = 'function square(n) { \
  typeof window; \
  e.name=234; \
  return n * n; \
}\n var n=2;';

var ast = babylon.parse(code, {sourceType:'module', plugins:['transform-member-expression-literals', 'trailingFunctionCommas','objectRestSpread', "transform-define", {
    "process.env.NODE_ENV": "production",
    "typeof window": "object"
  }]});

traverse(ast, {
  enter(path) {
    if (t.isIdentifier(path.node, { name: "n" })) {
      path.node.name = "x";
    }
  }
})

console.log(gen(ast, {compact:false, retainLines:true}))



const template = require('babel-template')

const tTest = template(`
  NAME.PROP=PROP;
`, {sourceType: "module", plugins:['transform-member-expression-literals']})

const ast2 = tTest({
  NAME: t.identifier('obj'),
  PROP: t.identifier('var')
})
console.log(ast2)
console.log(gen(ast2, null).code)



console.log(require("babel-core").transform(' \
abc; \
process.env.NODE_ENV === "development"; \
typeof global; \
typeof window === "object"; '
, {
  plugins: ['transform-member-expression-literals',"transform-define", {  }]
}).code )
