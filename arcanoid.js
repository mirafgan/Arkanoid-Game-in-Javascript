class htmlElem {
            constructor(id, parent, w, h, color, inn, x, y, dx, dy, size) {
                this.id = id
                this.parent = parent
                this.w = w
                this.h = h
                this.color = color
                this.x = x
                this.y = y
                this.dx = dx
                this.dy = dy
                this.size = size
                this.inn = inn
            }
            create() {
                let div = document.createElement('div')
                div.id = this.id
                this.parent.appendChild(div)
                this.elem = document.getElementById(this.id)
                this.show()
            }
            show() {
                this.elem.style.width = this.w + 'px'
                this.elem.style.height = this.h + 'px'
                this.elem.style.background = this.color
                this.elem.style.left = this.x + 'px'
                this.elem.style.top = this.y + 'px'
                this.elem.innerHTML = this.inn
                this.elem.style.fontSize = this.size + 'em'
            }
        }
        const game = new htmlElem('game', document.body, 800, 600, '#FFF', '')
        game.create()
        const ball = new htmlElem('ball', game.elem, 15, 15, 'red', '', 300, 450, 5, 5, )

        ball.move = function() {
            if (ball.x < 0 || ball.x > game.w - ball.w) ball.dx *= -1
            if (ball.y < 0 || ball.y > game.h - stick.h - ball.h - stick.h &&
                ball.x >= stick.x && ball.x <= stick.x + stick.w) ball.dy *= -1
            if (ball.y > game.h - ball.h) gameover();
            ball.x += ball.dx
            ball.y += ball.dy
            bricks.collision()
            ball.show()
        }
        const stick = new htmlElem('stick', game.elem, 150, 10, 'blue', '', 300, 585, 10)
        stick.move = function() {
            if (stick.x < 0) stick.x = 0
            if (stick.x > game.w - stick.w) stick.x = game.w - stick.w
            stick.show()
        }
        const text = new htmlElem('text', game.elem, '', '', '', this.inn, 280, 250, '', '', 3)
        let call = 0
        let reng = []
        const bricks = {
            row: 5,
            col: 5,
            gap: 10,
            colors: ['orangeRed', 'DeepPink', 'Aqua', 'Navy', 'Chartreuse'],
            arr: [],
            create() {
                let width = (game.w - this.gap * (this.col + 1)) / this.col
                let height = width / 5
                for (let i = 1; i <= this.row; i++) {
                    reng.push(i - 1)
                    for (let j = 1; j <= this.col; j++) {
                        let brick = new htmlElem(`kerpic${i}${j}`, game.elem, width, height, bricks.colors[reng[i - 1]], '',
                            j * this.gap + (j - 1) * width,
                            i * this.gap + (i - 1) * height
                        )
                        brick.status = true
                        this.arr.push(brick)
                    }
                }
                this.show()
            },
            show() {
                for (let i = 0; i < this.row * this.col; i++) {
                    let brick = this.arr[i]
                    brick.create()
                    brick.show()
                }
            },
            collision() {
                for (let i = 0; i < this.row * this.col; i++) {
                    let brick = this.arr[i]
                    if (brick.status &&
                        ball.x > brick.x - ball.w && ball.x < brick.x + brick.w &&
                        ball.y > brick.y - ball.h && ball.y < brick.y + brick.h) {
                        brick.status = false
                        document.getElementById(brick.id).remove()
                        call >= this.col * this.row - 1 ? gameover() : call++
                            ball.dy += 0.03 * ball.dy
                        ball.dy *= -1

                    }
                }
            }
        }
        ball.create()
        stick.create()
        bricks.create()
        document.onkeydown = function(e) {
            if (e.keyCode == 39) stick.x += stick.dx;
            stick.dx = -20
            if (e.keyCode == 37) stick.x += stick.dx;
            stick.dx = 20
            stick.move()
        }

        function gameover() {
            clearInterval(t)
            if (call == bricks.col * bricks.row - 1) {
                text.inn = 'WON';
                text.create()
            } else {
                text.inn = 'LOSE';
                text.create()
            }
            ball.elem.style.display = 'none'
        }
        let t = setInterval(ball.move, 40);

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
