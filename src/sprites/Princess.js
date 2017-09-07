/**
 * Created by kfang on 7/23/17.
 */
import Phaser from 'phaser'
import TooltipBuilder from '../util/TooltipBuilder'
import config from '../config'

export default class extends Phaser.Sprite {
    constructor({game, name, x, y, yOffset, speed, asset, frame}) {
        super(game, x, y, asset, frame)
        this.name = name
        this.anchor.setTo(0.5, 0.5)
        this.actionQueue = []
        this.playingAnimation = null
        this.taskCompleted = false
        this.lineQueue = []
        this.speedUpdatedSet = []
        this.start = false
        this.yOffset = yOffset
        this.speed = speed
        this.walking = false
        this.graphics = this.game.add.graphics(0, 0)
        this.graphics.lineStyle(8, 0x33FFF6, 1)
    }

    update() {
        if (this.actionQueue.length > 0 && (this.playingAnimation === null || this.playingAnimation.isFinished)) {
            this.playNextAction()
            if (!this.walking) {
                this.drawLine()
            }
        } else if (this.start && this.actionQueue.length === 0 && this.playingAnimation !== null && this.playingAnimation.isFinished) {
            this.drawLine()
            this.playFinalSound()
            this.showButtons()
        }
    }

    playFinalSound() {
        if (this.taskCompleted) {
            this.game.sound.play('victory')
        } else {
            this.game.sound.play('fail')
        }
    }

    showButtons() {
        this.start = false
        this.restartButton = this.game.add.button(this.game.world.centerX - 60, this.game.world.centerY, 'Buttons', this.restart, this, 'buttons/restart/hover', 'buttons/restart/normal', 'buttons/restart/click', 'buttons/restart/disabled')
        this.restartButton.anchor.setTo(0.5, 0.5)
        TooltipBuilder(this.game, this.restartButton, '重新开始', 'bottom')
        if (this.taskCompleted) {
            this.nextButton = this.game.add.button(this.game.world.centerX + 60, this.game.world.centerY, 'Buttons', this.nextGame, this, 'buttons/arrow/hover', 'buttons/arrow/normal', 'buttons/arrow/click', 'buttons/arrow/disabled')
            this.nextButton.scale.setTo(-1, 1)
            this.nextButton.anchor.setTo(0.5, 0.5)
            TooltipBuilder(this.game, this.nextButton, '开始下一关', 'bottom')
        }
    }

    playNextAction() {
        let nextAction = this.actionQueue.shift()
        console.log('Update: play animation ' + nextAction.name + ' with xOffset: ' + nextAction.xOffset + ' and yOffset: ' + nextAction.yOffset)
        let newX = this.x + nextAction.xOffset
        let newY = this.y + nextAction.yOffset
        if (nextAction.name.indexOf('Walk') >= 0) {
            this.walking = true
        } else {
            this.walking = false
        }
        this.playingAnimation = this.animations.play(nextAction.name)
        if (this.speedUpdatedSet.indexOf(nextAction.name) === -1) {
            this.playingAnimation.speed *= (1 / this.speed)
            this.speedUpdatedSet.push(nextAction.name)
        }
        if (nextAction.audio !== null) {
            this.game.sound.play(nextAction.audio)
        }
        let duration = Math.round(config.animationDuration * this.speed)
        this.game.add.tween(this).to({x: newX, y: newY}, duration, null, true)
        this.lineQueue.push({x1: this.x, y1: this.y, x2: newX, y2: newY})
    }

    destroyAllButtons() {
        this.restartButton.destroy()
        if (this.nextButton) {
            this.nextButton.destroy()
        }
    }

    restart() {
        this.game.sound.play('press')
        this.destroyAllButtons()
        this.game.global.preTaskIndex = this.game.global.currentTaskIndex
        this.game.state.start('PrincessTaskBoot')
    }

    nextGame() {
        this.game.sound.play('press')
        this.destroyAllButtons()
        this.game.global.preTaskIndex = this.game.global.currentTaskIndex
        this.game.global.currentTaskIndex = this.game.global.currentTaskIndex + 1
        this.game.state.start('PrincessTaskBoot')
    }

    drawLine() {
        while (this.lineQueue.length > 0) {
            let line = this.lineQueue.shift()
            this.graphics.beginFill()
            this.graphics.moveTo(line.x1, line.y1 + this.yOffset)
            this.graphics.lineTo(line.x2, line.y2 + this.yOffset)
            this.graphics.endFill()
        }
    }
}
