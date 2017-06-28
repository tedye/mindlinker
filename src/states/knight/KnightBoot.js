import Phaser from 'phaser'

export default class extends Phaser.State {
    init() {
        console.log('Knight Boot Init.')
    }

    preload() {
        console.log('Knight Boot Preload.')
        this.game.load.text('gameContext', this.game.global.currentStoryConfig)
    }

    render() {
        console.log('Knight Boot Render.')
        this.state.start('KnightStoryBoard')
    }
}
