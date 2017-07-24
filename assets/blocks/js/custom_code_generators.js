Blockly.JavaScript['statement_start'] = function(block) {
    let value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
    return '[\n' + value_next_statement.substring(0, value_next_statement.length - 2) + '\n]';
};

Blockly.JavaScript['statement_end'] = function(block) {
    let code = '';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

let motionCodeGenerator = function(instruction) {
    return function(block) {
        let value_next_statement = Blockly.JavaScript.valueToCode(block, 'nextStatement', Blockly.JavaScript.ORDER_ATOMIC);
        let number_repeat_count = block.getFieldValue('repeat_count');
        let code = instruction.repeat(number_repeat_count) + value_next_statement;
        return [code, Blockly.JavaScript.ORDER_ATOMIC];
    };
};

Blockly.JavaScript['statement_walk_right'] = motionCodeGenerator('{"name":"WalkRight"},\n');
Blockly.JavaScript['statement_walk_left'] = motionCodeGenerator('{"name":"WalkLeft"},\n');
Blockly.JavaScript['statement_walk_up'] = motionCodeGenerator('{"name":"WalkUp"},\n');
Blockly.JavaScript['statement_walk_down'] = motionCodeGenerator('{"name":"WalkDown"},\n');
Blockly.JavaScript['statement_run_right'] = motionCodeGenerator('{"name":"RunRight"},\n');
Blockly.JavaScript['statement_run_left'] = motionCodeGenerator('{"name":"RunLeft"},\n');
Blockly.JavaScript['statement_run_up'] = motionCodeGenerator('{"name":"RunUp"},\n');
Blockly.JavaScript['statement_run_down'] = motionCodeGenerator('{"name":"RunDown"},\n');
Blockly.JavaScript['statement_attack'] = motionCodeGenerator('{"name":"Attack"},\n');
Blockly.JavaScript['statement_defense'] = motionCodeGenerator('{"name":"Defense"},\n');
Blockly.JavaScript['statement_standby'] = motionCodeGenerator('{"name":"Standby"},\n');
Blockly.JavaScript['statement_jump'] = motionCodeGenerator('{"name":"Jump"},\n');
Blockly.JavaScript['statement_jump_left'] = motionCodeGenerator('{"name":"JumpLeft"},\n');
Blockly.JavaScript['statement_jump_right'] = motionCodeGenerator('{"name":"JumpRight"},\n');
Blockly.JavaScript['statement_turn'] = function(block) {
  let value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  let code = '{"name":"Turn"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['statement_repeat'] = function(block) {
  let value_next_statement = Blockly.JavaScript.valueToCode(block, 'next_statement', Blockly.JavaScript.ORDER_ATOMIC);
  let number_repeat_count = block.getFieldValue('TIMES');
  let value_loop = Blockly.JavaScript.statementToCode(block, 'SUBSTACK');
  let code = '{"name":"RepeatStart","count":' + number_repeat_count + '},\n' +
    value_loop + '{"name":"RepeatEnd"},\n' + value_next_statement;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};