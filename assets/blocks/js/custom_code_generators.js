Blockly.JavaScript['statement_start'] = function(block) {
    let instruction = '[';
    let nextBlock = block.childBlocks_[0]
    instruction += Blockly.JavaScript[nextBlock.type](nextBlock)
    let len = instruction.length
    return instruction.substring(0, len - 1) + ']';
};

Blockly.JavaScript['statement_end'] = function(block) {
    return '';
};

let motionCodeGenerator = function(instruction) {
    return function(block) {
        let childBlocks = block.childBlocks_;
        let count = parseInt(childBlocks[0].inputList[0].fieldRow[0].text_);
        let currentBlockInstruction = instruction.repeat(count);
        if (childBlocks.length > 1){
            let nextBlock = childBlocks[1];
            currentBlockInstruction += Blockly.JavaScript[nextBlock.type](nextBlock);
        }
        return currentBlockInstruction;
    };
};

Blockly.JavaScript['statement_walk_right'] = motionCodeGenerator('{"name":"WalkRight"},');
Blockly.JavaScript['statement_walk_left'] = motionCodeGenerator('{"name":"WalkLeft"},');
Blockly.JavaScript['statement_walk_up'] = motionCodeGenerator('{"name":"WalkUp"},');
Blockly.JavaScript['statement_walk_down'] = motionCodeGenerator('{"name":"WalkDown"},');
Blockly.JavaScript['statement_run_right'] = motionCodeGenerator('{"name":"RunRight"},');
Blockly.JavaScript['statement_run_left'] = motionCodeGenerator('{"name":"RunLeft"},');
Blockly.JavaScript['statement_run_up'] = motionCodeGenerator('{"name":"RunUp"},');
Blockly.JavaScript['statement_run_down'] = motionCodeGenerator('{"name":"RunDown"},');
Blockly.JavaScript['statement_attack'] = motionCodeGenerator('{"name":"Attack"},');
Blockly.JavaScript['statement_defense'] = motionCodeGenerator('{"name":"Defense"},');
Blockly.JavaScript['statement_standby'] = motionCodeGenerator('{"name":"Standby"},');
Blockly.JavaScript['statement_jump'] = motionCodeGenerator('{"name":"Jump"},');
Blockly.JavaScript['statement_jump_left'] = motionCodeGenerator('{"name":"JumpLeft"},');
Blockly.JavaScript['statement_jump_right'] = motionCodeGenerator('{"name":"JumpRight"},');
Blockly.JavaScript['statement_turn'] = function(block) {
    let instruction = '{"name":"Turn"},';
    let childBlocks = block.childBlocks_;
    if (childBlocks.length > 0){
        let nextBlock = childBlocks[0];
        instruction += Blockly.JavaScript[nextBlock.type](nextBlock);
    }
    return instruction
};

Blockly.JavaScript['statement_repeat'] = function(block) {
    let childBlocks = block.childBlocks_;
    let count = childBlocks[0].inputList[0].fieldRow[0].text_;
    let repeatBlock = childBlocks[1];
    let instruction = '{"name":"RepeatStart","count":' + count + '},';
    instruction += Blockly.JavaScript[repeatBlock.type](repeatBlock);
    instruction += '{"name":"RepeatEnd"},';
    if (childBlocks.length > 2){
        let nextBlock = childBlocks[2];
        instruction += Blockly.JavaScript[nextBlock.type](nextBlock);
    }
  return instruction;
};

Blockly.JavaScript['statement_turn_left'] = function(block) {
    let childBlocks = block.childBlocks_;
    let distance = childBlocks[0].inputList[0].fieldRow[0].text_;
    let instruction = '{"name":"Turn", "degree":' + distance + ',"turnRight": false},';
    if (childBlocks.length > 1){
        let nextBlock = childBlocks[1];
        instruction += Blockly.JavaScript[nextBlock.type](nextBlock);
    }
    return instruction;
};

Blockly.JavaScript['statement_turn_right'] = function(block) {
    let childBlocks = block.childBlocks_;
    let distance = childBlocks[0].inputList[0].fieldRow[0].text_;
    let instruction = '{"name":"Turn", "degree":' + distance + ',"turnRight": true},';
    if (childBlocks.length > 1){
        let nextBlock = childBlocks[1];
        instruction += Blockly.JavaScript[nextBlock.type](nextBlock);
    }
    return instruction;
};

Blockly.JavaScript['statement_walk'] = function(block) {
    let childBlocks = block.childBlocks_;
    let distance = childBlocks[0].inputList[0].fieldRow[0].text_;
    let instruction = '{"name":"Walk", "distance":' + distance + '},';
    if (childBlocks.length > 1){
        let nextBlock = childBlocks[1];
        instruction += Blockly.JavaScript[nextBlock.type](nextBlock);
    }
    return instruction;
};

/* for generating readable code */
Blockly.JavaScript['statement_start_readable'] = function(block) {
    let instruction = '';
    let nextBlock = block.childBlocks_[0]
    instruction += Blockly.JavaScript[nextBlock.type + '_readable'](nextBlock, 0)
    return instruction;
};

Blockly.JavaScript['statement_end_readable'] = function(block) {
    return '';
};

let motionReadableCodeGenerator = function(instruction) {
    return function(block, currentIndentation) {
        let childBlocks = block.childBlocks_;
        let count = parseInt(childBlocks[0].inputList[0].fieldRow[0].text_);
        console.log(currentIndentation)
        instruction = '√'.repeat(currentIndentation) + instruction;
        let currentBlockInstruction = instruction.repeat(count);
        if (childBlocks.length > 1){
            let nextBlock = childBlocks[1];
            currentBlockInstruction += Blockly.JavaScript[nextBlock.type + '_readable'](nextBlock, currentIndentation);
        }
        console.log(currentBlockInstruction)
        return currentBlockInstruction;
    };
};

Blockly.JavaScript['statement_walk_right_readable'] = motionReadableCodeGenerator('WalkRight()\n');
Blockly.JavaScript['statement_walk_left_readable'] = motionReadableCodeGenerator('WalkLeft()\n');
Blockly.JavaScript['statement_walk_up_readable'] = motionReadableCodeGenerator('WalkUp()\n');
Blockly.JavaScript['statement_walk_down_readable'] = motionReadableCodeGenerator('WalkDown()\n');
Blockly.JavaScript['statement_run_right_readable'] = motionReadableCodeGenerator('RunRight()\n');
Blockly.JavaScript['statement_run_left_readable'] = motionReadableCodeGenerator('RunLeft()\n');
Blockly.JavaScript['statement_run_up_readable'] = motionReadableCodeGenerator('RunUp()\n');
Blockly.JavaScript['statement_run_down_readable'] = motionReadableCodeGenerator('RunDown()\n');
Blockly.JavaScript['statement_attack_readable'] = motionReadableCodeGenerator('Attack()\n');
Blockly.JavaScript['statement_defense_readable'] = motionReadableCodeGenerator('Defense()\n');
Blockly.JavaScript['statement_standby_readable'] = motionReadableCodeGenerator('Standby()\n');
Blockly.JavaScript['statement_jump_readable'] = motionReadableCodeGenerator('Jump()\n');
Blockly.JavaScript['statement_jump_left_readable'] = motionReadableCodeGenerator('JumpLeft()\n');
Blockly.JavaScript['statement_jump_right_readable'] = motionReadableCodeGenerator('JumpRight()\n');
Blockly.JavaScript['statement_turn_readable'] = function(block, currentIndentation) {
    let instruction = '√'.repeat(currentIndentation) + 'Turn()\n';
    let childBlocks = block.childBlocks_;
    if (childBlocks.length > 0){
        let nextBlock = childBlocks[0];
        instruction += Blockly.JavaScript[nextBlock.type + '_readable'](nextBlock, currentIndentation);
    }
    return instruction
};

Blockly.JavaScript['statement_repeat_readable'] = function(block, currentIndentation) {
    let childBlocks = block.childBlocks_;
    let count = childBlocks[0].inputList[0].fieldRow[0].text_;
    let repeatBlock = childBlocks[1];
    let instruction = '√'.repeat(currentIndentation) + 'for i in range(' + count + '):\n';
    instruction += Blockly.JavaScript[repeatBlock.type + '_readable'](repeatBlock, currentIndentation + 4);
    if (childBlocks.length > 2){
        let nextBlock = childBlocks[2];
        instruction += Blockly.JavaScript[nextBlock.type + '_readable'](nextBlock, currentIndentation);
    }
    return instruction;
};

Blockly.JavaScript['statement_turn_left_readable'] = function(block, currentIndentation) {
    let childBlocks = block.childBlocks_;
    let degree = childBlocks[0].inputList[0].fieldRow[0].text_;
    let instruction = '√'.repeat(currentIndentation) + 'Turn(degree=' + degree + ', turnRight=False)\n';
    if (childBlocks.length > 1){
        let nextBlock = childBlocks[1];
        instruction += Blockly.JavaScript[nextBlock.type + '_readable'](nextBlock, currentIndentation);
    }
    return instruction;
};

Blockly.JavaScript['statement_turn_right_readable'] = function(block, currentIndentation) {
    let childBlocks = block.childBlocks_;
    let degree = childBlocks[0].inputList[0].fieldRow[0].text_;
    let instruction = '√'.repeat(currentIndentation) + 'Turn(degree=' + degree + ' ,turnRight=True)\n';
    if (childBlocks.length > 1){
        let nextBlock = childBlocks[1];
        instruction += Blockly.JavaScript[nextBlock.type + '_readable'](nextBlock, currentIndentation);
    }
    return instruction;
};

Blockly.JavaScript['statement_walk_readable'] = function(block, currentIndentation) {
    let childBlocks = block.childBlocks_;
    let distance = childBlocks[0].inputList[0].fieldRow[0].text_;
    let instruction = '√'.repeat(currentIndentation) +  'Walk(distance=' + distance + ')\n';
    if (childBlocks.length > 1){
        let nextBlock = childBlocks[1];
        instruction += Blockly.JavaScript[nextBlock.type + '_readable'](nextBlock, currentIndentation);
    }
    return instruction;
};