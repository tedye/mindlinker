/**
 * Created by kfang on 6/19/17.
 */
import Phaser from 'phaser'
import config from '../config'
import MainMenuState from './MainMenu'

export default class extends Phaser.State {
    init() {
        console.log('Root Boot Init.')
    }

    preload() {
        console.log('Root Boot Preload.')
        this.game.global = {}
        this.game.global.currentTaskIndex = 0
        this.game.load.text('rootContext', config.rootConf)
        this.state.add('MainMenu', MainMenuState, false)
    }

    render() {
        console.log('Root Boot Render.')
        this.state.start('MainMenu')
    }
}
