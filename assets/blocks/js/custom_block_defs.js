Blockly.Blocks['statement_start'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/start.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setColour(160);
    this.setTooltip('开始');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_walk_right'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/walk_right.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(220);
    this.setTooltip('向右走');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_walk_left'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/walk_left.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(220);
    this.setTooltip('向左走');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_walk_up'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/walk_up.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(220);
    this.setTooltip('向上走');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_walk_down'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/walk_down.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(220);
    this.setTooltip('向下走');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_run_right'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/run_right.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(320);
    this.setTooltip('向右跑');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_run_left'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/run_left.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(320);
    this.setTooltip('向左跑');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_run_up'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/run_up.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(320);
    this.setTooltip('向上跑');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_run_down'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/run_down.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(320);
    this.setTooltip('向下跑');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_attack'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/attack.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(0);
    this.setTooltip('攻击');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_jump'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/jump.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(220);
    this.setTooltip('跳跃');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_turn'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/turn.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(220);
    this.setTooltip('转身');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_repeat'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String");
    this.appendValueInput("loop")
        .appendField(new Blockly.FieldImage("assets/blocks/images/repeat.png", 20, 20, "*"))
        .appendField(new Blockly.FieldNumber(0, 1), "repeat_count")
        .setCheck("String");
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(220);
    this.setTooltip('重复执行');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_condition_if'] = {
  init: function() {
    this.appendValueInput("next_statement")
        .setCheck("String");
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField(new Blockly.FieldImage("assets/blocks/images/condition.png", 20, 20, "*"));
    this.appendValueInput("condition_true")
        .setCheck("String")
        .appendField(new Blockly.FieldImage("assets/blocks/images/yes.png", 20, 20, "*"));
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(220);
    this.setTooltip('如果条件正确则执行第一条，否则执行第二条');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['statement_end'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("assets/blocks/images/stop.png", 20, 20, "*"));
    this.setOutput(true, "String");
    this.setColour(0);
    this.setTooltip('结束');
    this.setHelpUrl('');
  }
};
