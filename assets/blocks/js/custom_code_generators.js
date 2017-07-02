Blockly.JavaScript['statement_start'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '[\n' + value_next_statement.substring(0, value_next_statement.length - 2) + '\n]';
  return code;
};

Blockly.JavaScript['statement_walk_right'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"WalkRight"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_walk_left'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"WalkLeft"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_walk_up'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"WalkUp"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ATOMIC];
};

Blockly.JavaScript['statement_walk_down'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"WalkDown"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_run_right'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"RunRight"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_run_left'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"RunLeft"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_run_up'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"RunUp"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_run_down'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"RunDown"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_attack'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"Attack"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_jump'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"Jump"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_turn'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"Turn"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_repeat'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var number_repeat_count = block.getFieldValue('repeat_count');
  var value_loop = Blockly.JavaScript.valueToCode(block, 'loop', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"RepeatStart","count":' + number_repeat_count + '},\n' +
    value_loop + '{"name":"RepeatEnd"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_condition_if'] = function(block) {
  var value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var value_condition_true = Blockly.JavaScript.valueToCode(block, 'condition_true', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"name":"IfStart","condition":' + eval(value_condition) + '},\n';
  code += value_condition_true;
  code += '{"name":"IfEnd"},\n' + value_next_statement;

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_end'] = function(block) {
  var code = '';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
