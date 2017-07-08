/**
 * Created by kfang on 6/25/17.
 */
import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
        console.log('KnightStoryBoard Init.')
    }

    loadStoryImages() {
        for (let i = 0; i < this.gameContext.spritesheets.length; i++) {
            let spriteSheet = this.gameContext.spritesheets[i]
            console.log('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
        }

        this.game.load.image('background', this.gameContext.background_image)
        this.game.load.image('foreground', this.gameContext.foreground_image)
        this.game.load.image('grid', this.gameContext.grid_image)
        this.game.load.image('shadow', this.gameContext.shadow_image)
        this.game.load.image('start', this.gameContext.start_button_image)
        this.game.load.image('restart', this.gameContext.restart_button_image)
        this.game.load.image('next', this.gameContext.next_button_image)
        this.game.load.image('taskhint', this.gameContext.task_hint_image)
    }

    loadStoryAudios() {
        for (let i = 0; i < this.gameContext.audios.length; i++) {
            let audio = this.gameContext.audios[i]
            this.game.load.audio(audio.key, audio.file)
        }
    }

    loadCurrrentTaskConfig() {
        let taskIndex = this.game.global.currentTaskIndex
        console.log('Current task index: ' + taskIndex)
        console.log('Current task conf: ' + this.gameContext.task_configs[taskIndex])
        this.game.load.text('taskContext', this.gameContext.task_configs[taskIndex])
    }

    setCurrentGameContext() {
        this.gameContext = JSON.parse(this.game.cache.getText('gameContext'))
    }

    preload() {
        console.log('KnightStoryBoard Preload.')
        this.setCurrentGameContext()
        this.loadStoryImages()
        this.loadStoryAudios()
        this.loadCurrrentTaskConfig()
    }

    render() {
        console.log('KnightStoryBoard Render.')
        this.state.start('KnightAnimationBoard')
    }
}