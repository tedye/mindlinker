/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import config from '../../config'
import Princess from '../../sprites/Princess'
import KnightAnimationPlayer from '../../animation/PrincessAnimationPlayer'
import TooltipBuilder from '../../util/TooltipBuilder'

export default class extends Phaser.State {
    calculateCharacterStartingPositionResponsively() {
        console.log('Game width: ' + this.game.width + ' height: ' + this.game.height)
        this.characterStartX = Math.round(this.game.width * this.taskContext.character_starting_x_percentage)
        this.characterStartY = Math.round(this.game.height * this.taskContext.character_starting_y_percentage)
    }

    getCurrentAnimationContext() {
        console.log('Blockly Instruction: ' + Blockly.JavaScript.workspaceToCode(this.game.workspace))
        return {
            sprite: this.princess,
            startClockPosition: this.taskContext.character_starting_clock_position,
            maxSteps: this.taskContext.maxSteps,
            passPath: this.taskContext.passPath,
            instruction: this.taskContext.passCommand//Blockly.JavaScript.workspaceToCode(this.game.workspace)
        }
    }

    play() {
        console.log('play blocks')
        this.game.sound.play('press')
        let animationContext = this.getCurrentAnimationContext(this.gameContext)
        KnightAnimationPlayer(animationContext)
        this.startButton.visible = false
    }

    drawBackground() {
        this.game.add.sprite(0, 0, 'background').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
    }

    drawBoardButtons() {
        this.startButton = this.game.add.button(0, 0, 'start', this.play, this)
        this.startButton.scale.setTo(0.3, 0.3)
        this.hintButton = this.game.add.button(this.startButton.width + 20, 0, 'taskhint', null, this)
        this.hintButton.scale.setTo(0.3, 0.3)
        TooltipBuilder(this.game, this.startButton, '开始', 'right')
        TooltipBuilder(this.game, this.hintButton, this.taskContext.hint, 'right')
    }

    drawMainCharacterAtStartingPosition() {
        let startX = this.characterStartX
        let startY = this.characterStartY
        let frames = [
            "animation/walk-0/walk-0-0000",
            "animation/walk-1/walk-1-0000",
            "animation/walk-2/walk-2-0000",
            "animation/walk-3/walk-3-0000",
            "animation/walk-4/walk-4-0000",
            "animation/walk-5/walk-5-0000",
            "animation/walk-6/walk-6-0000",
            "animation/walk-7/walk-7-0000",
            "animation/walk-8/walk-8-0000",
            "animation/walk-9/walk-9-0000",
            "animation/walk-10/walk-10-0000",
            "animation/walk-11/walk-11-0000"
        ]
        console.log('Draw main character at location: x = ' + startX + ' and y = ' + startY)
        console.log('The starting sprite image is ' + frames[this.taskContext.character_starting_clock_position])
        let sprite = new Princess({
            game: this.game,
            name: 'princess',
            x: startX,
            y: startY,
            asset: this.gameContext.spritesheets[0].key,
            frame: frames[this.taskContext.character_starting_clock_position]
        })
        this.princess = this.game.add.existing(sprite)
    }

    drawForeGround() {
        let fWidth = this.game.width
        let fHeight = this.game.height
        console.log('Draw front ground image with size width = ' + fWidth + ' height = ' + fHeight)
        this.game.add.sprite(0, 0, 'foreground').scale.setTo(this.game.width/config.backgroundWidth, this.game.height/config.backgroundHeight)
    }

    setCurrentGameContexts() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    setCurrentTaskContext() {
        this.taskContext = JSON.parse(this.game.cache.getText('taskContext'))
    }

    addAnimationsForSprite(sprite, spritesheets) {
        for (let i = spritesheets.length - 1; i >= 0; i--) {
            let spritesheet = spritesheets[i]
            sprite.loadTexture(spritesheet.key)
            for (let j = 0; j < spritesheet.animations.length; j++) {
                let animation = spritesheet.animations[j]
                console.log('Add animation: ' + animation.name + ' for sprite: ' + sprite.name)
                sprite.animations.add(animation.name, animation.frames, animation.rate, animation.loop, false)
            }
        }
    }

    addAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i]
            this.game.sound.add(audio.key)
        }
    }

    addBlocks() {
        let toolbox = '<xml>'
        toolbox += '<block type="logic_compare"></block>'
        toolbox += '<block type="statement_start"></block>'
        toolbox += '<block type="statement_end"></block>'
        toolbox += '<block type="statement_walk_right"></block>'
        toolbox += '<block type="statement_walk_left"></block>'
        toolbox += '<block type="statement_walk_up"></block>'
        toolbox += '<block type="statement_walk_down"></block>'
        toolbox += '<block type="statement_run_right"></block>'
        toolbox += '<block type="statement_run_left"></block>'
        toolbox += '<block type="statement_run_up"></block>'
        toolbox += '<block type="statement_run_down"></block>'
        toolbox += '<block type="statement_attack"></block>'
        toolbox += '<block type="statement_jump"></block>'
        toolbox += '<block type="statement_turn"></block>'
        toolbox += '<block type="statement_repeat"></block>'
        toolbox += '<block type="statement_condition_if"></block>'
        toolbox += '</xml>'
        let options = {
            horizontalLayout : true,
            toolbox : toolbox
        }
        this.game.workspace = Blockly.inject('block', options);
    }

    init() {
        console.log('PrincessAnimationBoard Init.')
    }

    preload() {
        console.log('PrincessAnimationBoard Preload.')
        this.setCurrentGameContexts()
        this.setCurrentTaskContext()
        if (typeof this.game.workspace == "undefined"){
            // Only create blocks once
            this.addBlocks()
        }
    }

    create() {
        console.log('PrincessAnimationBoard Create.')
        this.calculateCharacterStartingPositionResponsively()
        this.drawBackground()
        this.drawBoardButtons()
        this.drawMainCharacterAtStartingPosition()
        this.drawForeGround()
        this.addAnimationsForSprite(this.princess, this.gameContext.spritesheets)
        this.addAudios()
    }
}
