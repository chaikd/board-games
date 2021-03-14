export class Priect {
    context: any;
    boardWidth;
    startX;
    startY;
    siteArray: any;
    currentPlayer = 'B';
    selectionPriece: any;
    successComposition = [
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5]
    ];
    dom;
    space;
    constructor(dom: any, gap: any) {
        gap = gap || 0;
        this.dom = dom;
        this.startX = gap;
        this.startY = gap;
        this.boardWidth = this.dom.offsetWidth - gap * 2;
        let space = this.space = this.boardWidth/2;
        this.prieceClickEvn();
        this.siteArray = [
            {
                coordinate: [this.startX, this.startY],
                hasPriece: 1,
                player: 'B'
            },
            {
                coordinate: [this.startX + space, this.startY],
                hasPriece: 1,
                player: 'B'
            },
            {
                coordinate: [this.startX + 2 * space, this.startY],
                hasPriece: 1,
                player: 'B'
            },
            {
                coordinate: [this.startX, this.startY + space],
                hasPriece: 0,
            },
            {
                coordinate: [this.startX + space, this.startY + space],
                hasPriece: 0,
            },
            {
                coordinate: [this.startX + 2 * space, this.startY + space],
                hasPriece: 0,
            },
            {
                coordinate: [this.startX, this.startY + 2 * space],
                hasPriece: 1,
                player: 'W'
            },
            {
                coordinate: [this.startX + space, this.startY + 2 * space],
                hasPriece: 1,
                player: 'W'
            },
            {
                coordinate: [this.startX + 2 * space, this.startY + 2 * space],
                hasPriece: 1,
                player: 'W'
            },
        ];
        this.siteArray = this.siteArray.map((v: any) => {
            v.scope = [
                [v.coordinate[0] - 15, v.coordinate[1] - 15],
                [v.coordinate[0] + 15, v.coordinate[1] + 15]
            ];
            return v;
        })
    }
    init() {
        this.context = this.dom.getContext('2d');
        const ctx = this.context;
        this.context.clearRect(0, 0, this.boardWidth,this.boardWidth);
        for (let i = 0; i < 3; i++) {
            this.drowPriect(this.startX + i * (this.boardWidth / 2), this.startY, "#000");
            this.drowPriect(this.startX + i * (this.boardWidth / 2), this.startY + this.boardWidth, "#fff");
        }
    }

    prieceClickEvn() {
        this.dom.onclick = (e: any) => {
            let target;
            if (this.selectionPriece) {
                const canmove = this.canMove(this.selectionPriece);
                target = this.findTarget(this.siteArray, e);
                const moveToTarget = this.findTarget(canmove, e);
                if (target && target.player == this.selectionPriece.player) {
                    this.drowSelection(target);
                    this.selectionPriece = target;
                    return;
                }
                if (!moveToTarget) {
                    return;
                }
                this.clearPriect(this.selectionPriece);
                this.drowPriect(
                    moveToTarget.coordinate[0],
                    moveToTarget.coordinate[1],
                    this.selectionPriece.player == 'B' ? '#000' : '#fff'
                )
                this.resetSiteArray(moveToTarget);
                this.checkSuccess();
                this.targetCurrentPlayer();
                this.selectionPriece = undefined;
                return;
            }
            target = this.findTarget(this.siteArray.filter((v: any) => {
                return v.player === this.currentPlayer
            }), e)
            if (!target) {
                return;
            }
            this.drowSelection(target);
            this.selectionPriece = target;
        }
    }

    findTarget(locations: any, e: any) {
        return locations.find((v: any) => {
            return e.offsetX >= v.scope[0][0]
                && e.offsetX <= v.scope[1][0]
                && e.offsetY >= v.scope[0][1]
                && e.offsetY <= v.scope[1][1];
        })
    }

    clearPriect(target: any) {
        const ctx = this.context;
        ctx.clearRect(
            target.coordinate[0] - 20,
            target.coordinate[1] - 20, 40, 40
        );
    }

    drowPriect(x, y, color) {
        const ctx = this.context;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
    }

    drowSelection(target) {
        const ctx = this.context;
        if (this.selectionPriece) {
            this.clearPriect(this.selectionPriece);
            this.drowPriect(
                this.selectionPriece.coordinate[0],
                this.selectionPriece.coordinate[1],
                this.selectionPriece.player == 'B' ? '#000' : '#fff'
            );
        }
        ctx.strokeStyle = 'rgba(255,51,0,1)';
        ctx.strokeRect(target.coordinate[0] - 18, target.coordinate[1] - 18, 36, 36)
        let x, y;
        x = target.coordinate[0] - 20;
        y = target.coordinate[1] - 9;
        ctx.clearRect(x, y, 4, 18);
        x = target.coordinate[0] + 16;
        y = target.coordinate[1] - 9;
        ctx.clearRect(x, y, 4, 18);
        x = target.coordinate[0] - 9;
        y = target.coordinate[1] + 16;
        ctx.clearRect(x, y, 18, 4);
        x = target.coordinate[0] - 9;
        y = target.coordinate[1] - 20;
        ctx.clearRect(x, y, 18, 4);
    }

    canMove(target) {
        return this.siteArray.filter(v => {
            const x = v.coordinate[0];
            const y = v.coordinate[1];
            return !v.hasPriece
                && ((x == target.coordinate[0] + this.space && y == target.coordinate[1])
                || (x == target.coordinate[0] - this.space && y == target.coordinate[1])
                || (x == target.coordinate[0] && y == target.coordinate[1] + this.space)
                || (x == target.coordinate[0] && y == target.coordinate[1] - this.space)
                || (v.coordinate[0] == this.startX + this.space && v.coordinate[1] == this.startY + this.space)
                || (target.coordinate[0] == this.startX + this.space
                && target.coordinate[1] == this.startY + this.space))
        })
    }

    resetSiteArray(target) {
        const index = this.siteArray.findIndex(v => {
            return v.coordinate[0] == target.coordinate[0]
                && v.coordinate[1] == target.coordinate[1]
        });
        const preIndex = this.siteArray.findIndex(v => {
            return v.coordinate[0] == this.selectionPriece.coordinate[0]
                && v.coordinate[1] == this.selectionPriece.coordinate[1]
        });
        this.siteArray[index].hasPriece = 1;
        this.siteArray[index].player = this.selectionPriece.player;
        this.siteArray[preIndex].hasPriece = 0;
        this.siteArray[preIndex].player = '';
    }

    targetCurrentPlayer() {
        if (this.currentPlayer == 'B') {
            this.currentPlayer = 'W'
        } else {
            this.currentPlayer = 'B'
        }
    }

    checkSuccess() {
        const warr: Array<any> = [];
        const barr: Array<any> = [];
        this.siteArray.forEach((v, k) => {
            if (v.player == 'B') {
                barr.push(k)
            } else if (v.player == 'W') {
                warr.push(k)
            }
        });
        const currentArr = this.currentPlayer == 'B' ? barr : warr;
        const a = this.successComposition.some(v => {
            return v[0] == currentArr[0]
                && v[1] == currentArr[1]
                && v[2] == currentArr[2];
        });
        if (a || (
            barr[0] == 6
            && barr[1] == 7
            && barr[2] == 8)) {
            setTimeout(() => {
                alert('黑子获胜');
            }, 0);
            this.dom.onclick = null;
            return;
        }
        if (a || (
            warr[0] == 1
            && warr[1] == 2
            && warr[2] == 3
        )) {
            setTimeout(() => {
                alert('白子获胜');
            }, 0);
            this.dom.onclick = null;
        }
    }
}