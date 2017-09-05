export function setScaleAndAnchorForObject(obj, sX, sY, aX, aY) {
    obj.scale.setTo(sX, sY)
    obj.anchor.setTo(aX, aY)
}

export function hideBlock() {
    document.getElementById('block').style.display = 'none'
    document.getElementById('textarea').style.display = 'none'
}

export function showBlock() {
    document.getElementById('block').style.display = 'block'
    document.getElementById('textarea').style.display = 'block'
}

export function createLoadingText(game) {
    let loadingText = game.add.text(game.world.centerX, game.world.centerY, '努力加载中...', { font: "65px Arial", fill: "#F3FF33", align: "center" })
    loadingText.anchor.set(0.5)
    return loadingText
}

export function loadStart() {
    this.loadingText.setText("努力加载中 ...")
}

export function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.loadingText.setText("已完成: " + progress + '%')
}

export function repositionBlock(grid_bottom_left_x, grid_bottom_left_y, background_height) {
    let block_container = document.getElementById('block')
    block_container.style.top = (grid_bottom_left_y + 50).toString() + 'px'
    block_container.style.left = grid_bottom_left_x.toString() + 'px'
    let height = Math.round(background_height - grid_bottom_left_y).toString() + 'px'
    console.log(background_height)
    console.log(grid_bottom_left_y)
    console.log(height)
    block_container.style.height = height
}

export function repositionText (y, height, width) {
    let text_container_style = document.getElementById('textarea').style
    text_container_style.top = Math.round(y + 50).toString() + 'px'
    text_container_style.height = Math.round(height).toString() + 'px'
    text_container_style.width = Math.round(width).toString() + 'px'
}