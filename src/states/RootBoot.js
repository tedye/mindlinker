/**
 * Created by kfang on 6/19/17.
 */
import Phaser from 'phaser'
import config from '../config'
import MainMenuState from './MainMenu'
import {logDebugInfo} from '../Logger'
import {rescaleObject} from '../UIUtil'

export default class extends Phaser.State {
    init() {
        logDebugInfo('Root Boot Init.')
        this.game.global = {}
        this.game.global.currentTaskIndex = 0
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.game.global.hScale = this.game.width / config.designWidth
        this.game.global.vScale = this.game.height / config.designHeight
        logDebugInfo('Horizontal Scale: ' + this.game.global.hScale + ' Vertical scale: ' + this.game.global.vScale)
    }

    preload() {
        logDebugInfo('Root Boot Preload.')
        this.game.load.text('rootContext', config.rootConf)
        this.state.add('MainMenu', MainMenuState, false)
        this.game.load.image('logo', 'assets/images/logo.png')
    }

    create() {
        logDebugInfo('Root Boot Create.')
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo')
        rescaleObject(this.logo, this.game, 0.6, 0.6)
        this.logo.anchor.setTo(0.5, 0.5)
        this.logo.alpha = 0.2
        this.logoTween = this.game.add.tween(this.logo).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, true)
    }

    render() {
        logDebugInfo('Root Boot Render.')
        if (!this.logoTween.isRunning) {
            this.logo.destroy()
            this.state.start('MainMenu')
        }
    }
}
