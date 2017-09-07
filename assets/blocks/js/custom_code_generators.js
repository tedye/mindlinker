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