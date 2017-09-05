/**
 * Created by kfang on 7/11/17.
 */
import Phaser from 'phaser'
import KnightBootState from './knight/KnightBoot'
import PrincessBootState from './princess/PrincessBoot'
import TooltipBuilder from '../util/TooltipBuilder'
import {setScaleAndAnchorForObject, hideBlock, createLoadingText, loadStart, fileComplete} from '../UIUtil'

export default class extends Phaser.State {
    init() {
        console.log('Main Menu Init.')
        this.endIndex = 1
    }

    preload() {
        console.log('Main Menu Preload.')
        this.rootContext = JSON.parse(this.game.cache.getText('rootContext'))
    }

    loadAssets() {
        let spriteSheets = this.rootContext.spritesheets
        this.game.load.image('mainBackground', this.rootContext.main_background_image)
        for (let i = 0; i < spriteSheets.length; i++) {
            let spriteSheet = spriteSheets[i]
            console.log('Load spritesheet: ' + spriteSheet.spritesheet + ' as ' + spriteSheet.key + ' with data file: ' + spriteSheet.datafile)
            this.game.load.atlasJSONArray(spriteSheet.key, spriteSheet.spritesheet, spriteSheet.datafile)
        }
        this.storyKey = 'Stories'
        this.game.load.start()
    }

    renderBackground() {
        console.log('Game width: ' + this.game.width + ' Game Height: ' + this.game.height)
        this.game.add.sprite(0, 0, 'mainBackground').scale.setTo(this.game.width/1440, this.game.height/900)
    }

    renderMenu() {
        let stories = this.rootContext.stories
        let padding = this.game.width - Math.round((this.game.width - 700) / 2)
        let x = padding - 75
        let y = Math.round(this.game.height * 0.65)
        /**let nextButton = this.game.add.button(x, y, 'nextImage', this.onClickNext, this)
        setScaleAndAnchorForObject(nextButton, -0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, nextButton, '下一页', 'bottom')**/
        for (let i = 0; i < 2; i++) {
            let story = stories[this.endIndex - i]
            let storyButton = this.game.add.button(x, y, this.storyKey, this.onClickStory, {game: this.game, story: story, index: this.endIndex - i}, story.storyHoverImageKey, story.storyNormalImageKey, story.storyClickImageKey, story.storyDisabledImageKey)
            setScaleAndAnchorForObject(storyButton, 0.5, 0.5, 0.5, 0.5)
            TooltipBuilder(this.game, storyButton, story.storyName, 'bottom')
            x -= 250
        }
        /**let prevButton = this.game.add.button(x, y, 'nextImage', this.onClickPrevious, this)
        setScaleAndAnchorForObject(prevButton, 0.5, 0.5, 0.5, 0.5)
        TooltipBuilder(this.game, prevButton, '上一页', 'bottom')**/

        /**
         hide block in main menu
         **/
        hideBlock()
    }

    create() {
        console.log('Main Menu Create.')
        if (!this.created) {
            this.loadingText = createLoadingText(this.game)
            this.game.load.onLoadStart.addOnce(loadStart, this);
            this.game.load.onFileComplete.add(fileComplete, this);
            this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
            this.loadAssets()
        } else {
            this.renderState()
        }
    }

    /**
    onClickPrevious() {
        this.endIndex -= 2
        if (this.endIndex < 1) {
            this.endIndex = 1
        }
        this.renderMenu()
    }

    onClickNext() {
        this.endIndex += 2
        if (this.endIndex >= this.storyCount) {
            this.endIndex = this.storyCount - 1
        }
        this.renderMenu()
    }**/

    onClickStory() {
        console.log('On Click Story.')
        this.game.global.currentStoryConfig = this.story.storyConf
        if (this.index === 0) {
            this.game.state.add('KnightBoot', KnightBootState, false)
        } else {
            this.game.state.add('PrincessBoot', PrincessBootState, false)
        }
        console.log('About to start the story: ' + this.story.storyState)
        this.game.state.start(this.story.storyState)
    }

    loadComplete() {
        this.renderState()
        this.loadingText.destroy()
        this.created = true
    }

    renderState() {
        this.renderBackground()
        this.renderMenu()
    }
}