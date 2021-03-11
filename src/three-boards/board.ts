export class Board {
    startX;
    startY;
    boardWidth;
    limitWidth;
    dom;
    constructor(
        dom: any,
        gap: any
    ) {
        gap = gap || 0;
        this.dom = dom;
        this.boardWidth = this.dom.offsetWidth;
        this.startX = gap;
        this.startY = gap;
        this.limitWidth = this.boardWidth - 2 * gap;
    }
    draw() {
        const ctx = this.dom.getContext('2d');
        const startX = this.startX;
        const startY = this.startY;
        const boardWidth = this.boardWidth;
        const limitWidth = this.limitWidth;
        var img = new Image();
        img.src = '/assets/images/board.jpg';
        img.onload = function() {
            var ptrn = ctx.createPattern(img, 'repeat');
            ctx.fillStyle = ptrn;
            ctx.fillRect(0, 0, boardWidth, boardWidth);
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, startY + limitWidth);
            ctx.stroke();
            ctx.lineTo(startX + limitWidth, startY + limitWidth);
            ctx.stroke();
            ctx.lineTo(startX + limitWidth,startY);
            ctx.stroke();
            ctx.lineTo(startX,startY);
            ctx.stroke();
            ctx.moveTo(startX, startY + limitWidth/2);
            ctx.lineTo(startX + limitWidth,startY + limitWidth/2);
            ctx.stroke();
            ctx.moveTo(startX + limitWidth/2, startY);
            ctx.lineTo(startX + limitWidth/2,startY + limitWidth);
            ctx.stroke();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + limitWidth,startY + limitWidth);
            ctx.stroke();
            ctx.moveTo(startX, startY + limitWidth);
            ctx.lineTo(startX + limitWidth,startY);
            ctx.stroke();
        }
    }
}