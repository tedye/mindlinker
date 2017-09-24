'use strict';
let hScale = Math.max(window.screen.availWidth, window.screen.availHeight) / 1440
let vScale = (Math.min(window.screen.availWidth, window.screen.availHeight) - 50) / 900

Blockly.Blocks['statement_start'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_start",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/start.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "start",
                    "flip_rtl": true
                }
            ],
            "inputsInline": true,
            "nextStatement": null,
            "colour": Blockly.Colours.event.primary,
            "colourSecondary": Blockly.Colours.event.secondary,
            "colourTertiary": Blockly.Colours.event.tertiary,
            "tooltip": "开始"
        });
    }
};

Blockly.Blocks['statement_walk'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_walk",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/walk.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "walk"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "前进"
        });
    }
};

Blockly.Blocks['statement_walk_right'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_walk_right",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/walk_right.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "walk_right"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向右走"
        });
    }
};

Blockly.Blocks['statement_walk_left'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_walk_left",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/walk_left.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "walk left"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向左走"
        });
    }
};

Blockly.Blocks['statement_walk_up'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_walk_up",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/walk_up.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "walk up"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向上走"
        });
    }
};

Blockly.Blocks['statement_walk_down'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_walk_down",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/walk_down.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "walk down"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向下走"
        });
    }
};

Blockly.Blocks['statement_run_right'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_run_right",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/run_right.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "run right"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向右跑"
        });
    }
};

Blockly.Blocks['statement_run_left'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_run_left",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/run_left.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "run left"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向左跑"
        });
    }
};

Blockly.Blocks['statement_run_up'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_run_up",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/run_up.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "run up"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向上跑"
        });
    }
};

Blockly.Blocks['statement_run_down'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_run_down",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/run_down.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "run down"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向下跑"
        });
    }
};

Blockly.Blocks['statement_attack'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_attack",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/attack.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "attack"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "攻击"
        });
    }
};

Blockly.Blocks['statement_defense'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_defense",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/defense.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "defense"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "防御"
        });
    }
};

Blockly.Blocks['statement_jump'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_jump",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/jump.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "jump"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "跳"
        });
    }
};

Blockly.Blocks['statement_jump_right'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_jump_right",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/jump_right.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "jump right"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向右跳"
        });
    }
};

Blockly.Blocks['statement_jump_left'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_jump_left",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/jump_left.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "jump"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向左跳"
        });
    }
};

Blockly.Blocks['statement_turn'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_turn",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/turn.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "turn"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "转身"
        });
    }
};

Blockly.Blocks['statement_turn_left'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_turn_left",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/turn_left.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "turn_left"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向左转"
        });
    }
};

Blockly.Blocks['statement_turn_right'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_turn_right",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/turn_right.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "turn_right"
                },
                {
                    "type": "input_value",
                    "name": "STEPS",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary,
            "tooltip": "向右转"
        });
    }
};

Blockly.Blocks['statement_repeat'] = {
    init: function() {
        this.jsonInit({
            "id": "control_repeat",
            "message0": "%1 %2 %3 %4",
            "args0": [
                {
                    "type": "input_statement",
                    "name": "CONDITION"
                },
                {
                    "type": "input_statement",
                    "name": "SUBSTACK"
                },
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/repeat.svg",
                    "width": Math.round(40 * hScale),
                    "height": Math.round(40 * vScale),
                    "alt": "*",
                    "flip_rtl": true
                },
                {
                    "type": "input_value",
                    "name": "TIMES",
                    "check": "Number"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.control.primary,
            "colourSecondary": Blockly.Colours.control.secondary,
            "colourTertiary": Blockly.Colours.control.tertiary,
            "tooltip": "重复"
        });
    }
};


Blockly.Blocks.defaultToolboxKnight = '<xml id="toolbox-knight" style="display: none">' +
    '<block type="statement_start"></block>' +
    '<block type="statement_attack"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">1</field></shadow></value></block>' +
    '<block type="statement_defense"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">1</field></shadow></value></block>' +
    '<block type="statement_walk_right"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">1</field></shadow></value></block>' +
    '<block type="statement_walk_left"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">1</field></shadow></value></block>' +
    '<block type="statement_walk_up"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">1</field></shadow></value></block>' +
    '<block type="statement_walk_down"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">1</field></shadow></value></block>' +
    '<block type="statement_jump_left"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">1</field></shadow></value></block>' +
    '<block type="statement_jump_right"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">1</field></shadow></value></block>' +
    '<block type="statement_turn"></block>' +
    '<block type="statement_repeat"><value name="TIMES"><shadow type="math_positive_number"><field name="NUM">2</field></shadow></value></block>' +
    '</xml>';

Blockly.Blocks.defaultToolboxPrincess = '<xml id="toolbox-princess" style="display: none">' +
    '<block type="statement_start"></block>' +
    '<block type="statement_walk"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">200</field></shadow></value></block>' +
    '<block type="statement_turn_left"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">90</field></shadow></value></block>' +
    '<block type="statement_turn_right"><value name="STEPS"><shadow type="math_positive_number"><field name="NUM">90</field></shadow></value></block>' +
    '<block type="statement_repeat"><value name="TIMES"><shadow type="math_positive_number"><field name="NUM">2</field></shadow></value></block>' +
    '</xml>';