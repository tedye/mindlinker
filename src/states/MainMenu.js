/**
 * Created by kfang on 7/11/17.
 */
import Phaser from 'phaser'
import KnightBootState from './knight/KnightBoot'
import TooltipBuilder from '../util/TooltipBuilder'
import {setScaleAndAnchorForObject} from '../UIUtil'

export default class extends Phaser.State {
    init() {
        console.log('Main Menu Init.')
        this.startIndex = 0
    }

    preload() {
        console.log('Main Menu Preload.')
        this.rootContext = JSON.parse(this.game.cache.getText('rootContext'))
        this.storyCount = this.rootContext.stories.length
        let stories = this.rootContext.stories
        for (let i = 0; i < stories.length; i++) {
            let story = stories[i]
            this.game.load.image(story.storyImageKey, story.storyImage)
        }

        this.game.load.image('nextImage', 'assets/images/knight/next.png')
    }

    render() {
        console.log('Main Menu Render.')
        let stories = this.rootContext.stories
        let padding = Math.round((this.game.width - 600) / 2)
        let x = padding + 75
        let y = Math.round(this.game.height * 0.5)
        let prevButton = this.game.add.button(x, y, 'nextImage', this.onClickPrevious, this)
        setScaleAndAnchorForObject(prevButton, -0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, prevButton, '上一个故事', 'bottom')
        x += 150
        for (let i = 0; i < 2; i++) {
            let story = stories[this.startIndex + i]
            let storyButton = this.game.add.button(x, y, story.storyImageKey, this.onClickStory, {game: this.game, story: story})
            setScaleAndAnchorForObject(storyButton, 0.5, 0.5, 0.5, 0.5)
            TooltipBuilder(this.game, storyButton, story.storyName, 'bottom')
            x += 150
        }
        let nextButton = this.game.add.button(x, y, 'nextImage', this.onClickNext, this)
        setScaleAndAnchorForObject(nextButton, 0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, nextButton, '下一个故事', 'bottom')
    }

    onClickPrevious() {
        this.startIndex--
        if (this.startIndex < 0)
            this.startIndex = 0
    }

    onClickNext() {
        this.startIndex++
        if (this.storyCount >= this.storyCount)
            this.startIndex = this.storyCount - 1

    }

    onClickStory() {
        console.log('On Click Story.')
        this.game.global.currentStoryConfig = this.story.storyConf
        this.game.state.add('KnightBoot', KnightBootState, false)
        this.game.state.start(this.story.storyState)
    }
}