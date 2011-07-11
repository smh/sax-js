require(__dirname).test({
  xml : '<r><script type="text/javascript">document.write("<em>")</script></r>',
  expect : [
    ["opentag", {"name": "R","attributes": {}}],
    ["attribute", {name: "type",value: "text/javascript"}],
    ["opentag", {"name": "SCRIPT","attributes": {type: "text/javascript"}}],
    ["closetag", "SCRIPT"],
    ["closetag", "R"]
  ]
});

require(__dirname).test({
  xml : '<r><style type="text/css">document.write("<em>")</style></r>',
  expect : [
    ["opentag", {"name": "R","attributes": {}}],
    ["attribute", {name: "type",value: "text/css"}],
    ["opentag", {"name": "STYLE","attributes": {type: "text/css"}}],
//    ["text", 'document.write("em")'],
    ["closetag", "STYLE"],
    ["closetag", "R"]
  ]
});

require(__dirname).test({
  xml : '<r><script>x = "</script></r>',
  expect : [
    ["opentag", {"name": "R","attributes": {}}],
    ["opentag", {"name": "SCRIPT","attributes": {}}],
    ["closetag", "SCRIPT"],
    ["closetag", "R"]
  ]
});

require(__dirname).test({
  xml : '<r><script>x = </scriptandthenotherstuff></script></r>',
  expect : [
    ["opentag", {"name": "R","attributes": {}}],
    ["opentag", {"name": "SCRIPT","attributes": {}}],
    ["closetag", "SCRIPT"],
    ["closetag", "R"]
  ]
});

require(__dirname).test({
  xml : '<r><script>//<![CDATA[\n' +
        '  some stuff here\n' +
        '//]]></script>' +
        '<style>/* <![CDATA[ */\n' +
        '  css css css\n' +
        '/*]]>*/</style></r>',
  expect : [
    ["opentag", {"name": "R","attributes": {}}],
    ["opentag", {"name": "SCRIPT","attributes": {}}],
    ["opencdata"],
    ["cdata", "\n  some stuff here\n//"],
    ["closecdata"],
    ["closetag", "SCRIPT"],
    ["opentag", {"name": "STYLE","attributes": {}}],
    ["opencdata"],
    ["cdata", " */\n  css css css\n/*"],
    ["closecdata"],
    ["closetag", "STYLE"],
    ["closetag", "R"]
  ]
});

require(__dirname).test({
  xml : '<r><script>//<![CDATA[ don\'t close on embedded </script> tags within cdata sections]]></script></r>',
  expect : [
    ["opentag", {"name": "R","attributes": {}}],
    ["opentag", {"name": "SCRIPT","attributes": {}}],
    ["opencdata"],
    ["cdata", " don\'t close on embedded </script> tags within cdata sections"],
    ["closecdata"],
    ["closetag", "SCRIPT"],
    ["closetag", "R"]
  ]
});
