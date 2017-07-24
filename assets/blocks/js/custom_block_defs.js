'use strict';
Blockly.Blocks['statement_start'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_start",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/start.svg",
                    "width": 40,
                    "height": 40,
                    "alt": "start",
                    "flip_rtl": true
                }
            ],
            "inputsInline": true,
            "nextStatement": null,
            "colour": Blockly.Colours.event.primary,
            "colourSecondary": Blockly.Colours.event.secondary,
            "colourTertiary": Blockly.Colours.event.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
        });
    }
};

Blockly.Blocks['statement_standby'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_defense",
            "message0": "%1 %2",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/standby.svg",
                    "width": 40,
                    "height": 40,
                    "alt": "standby"
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
                    "alt": "turn"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.motion.primary,
            "colourSecondary": Blockly.Colours.motion.secondary,
            "colourTertiary": Blockly.Colours.motion.tertiary
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
                    "width": 40,
                    "height": 40,
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
            "colourTertiary": Blockly.Colours.control.tertiary
        });
    }
};

Blockly.Blocks['statement_if'] = {
    init: function() {
        this.jsonInit({
            "id": "control_if",
            "message0": "%1 %2 %3",
            "args0": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK"
                },
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/repeat.svg",
                    "width": 40,
                    "height": 40,
                    "alt": "*",
                    "flip_rtl": true
                },
                {
                    "type": "input_value",
                    "name": "TIMES",
                    "check": "Number"
                }
            ],
            "message1": "%1 %2",
            "arg1": [
                {
                    "type": "input_statement",
                    "name": "CONDITION"
                },
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/repeat.svg",
                    "width": 40,
                    "height": 40,
                    "alt": "*",
                    "flip_rtl": true
                },
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Colours.control.primary,
            "colourSecondary": Blockly.Colours.control.secondary,
            "colourTertiary": Blockly.Colours.control.tertiary
        });
    }
};

Blockly.Blocks['statement_stop'] = {
    init: function() {
        this.jsonInit({
            "id": "statement_end",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "icons/stop.svg",
                    "width": 40,
                    "height": 40,
                    "alt": "stop",
                    "flip_rtl": true
                }
            ],
            "inputsInline": true,
            "nextStatement": null,
            "colour": Blockly.Colours.event.primary,
            "colourSecondary": Blockly.Colours.event.secondary,
            "colourTertiary": Blockly.Colours.event.tertiary
        });
    }
};

Blockly.Blocks.defaultToolboxSimple = '<xml id="toolbox-simple" style="display: none">' +
    '<category name="Event">' +
        '<block type="statement_start"></block>' +
    '</category>' +
    '<category name="Action">' +
        '<block type="statement_attack"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_defense"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
    '</category>' +
    '<category name="Motion">' +
        '<block type="statement_walk_right"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_walk_left"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_walk_up"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_walk_down"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_run_right"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_run_left"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_run_up"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_run_down"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_jump"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_jump_left"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_jump_right"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
        '<block type="statement_turn"><value name="STEPS"><shadow type="math_positive_number"></shadow></value></block>' +
    '</category>' +
    '<category name="Control">' +
        '<block type="statement_repeat"><value name="TIMES"><shadow type="math_positive_number"></shadow></value></block>' +
    '</category>' +
    '</xml>';