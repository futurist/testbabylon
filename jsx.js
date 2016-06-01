var babylon = require('babylon');
var gen = require('babel-generator')['default']

var code = '\
function foo(\n \
        param1,\n \
        param2,\n \
    ) {}\n \
e.var = 12341234;\n \
var d=    <Outer>\
      <Inter    />\
    </Outer>\
';
var ast = babylon.parse(code, {
  sourceType: 'module',
  plugins: ['jsx','trailingFunctionCommas', 'transform-es3-member-expression-literals']
});

console.log(gen(ast, {compact:false, retainLines:true}).code)



console.log('\n\nprevent reserved words in obj props:',
            require("babel-core").transform("a.var=2342;", {
  plugins: ["transform-es3-member-expression-literals"]
}).code )
