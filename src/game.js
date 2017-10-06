import paddle from './paddle';
import brick from './brick';
import ball from './ball';

export default class Game
{
    constructor()
    {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.canvas.height = 500;
        this.canvas.width = 500;
        this.ctx = this.canvas.getContext('2d');

        this.over = false;
        this.score = 0;
        this.ball = new ball({ width: this.canvas.width, height: this.canvas.height });
        this.speedLevel = 1;
        this.paddle = new paddle({ width: this.canvas.width, height: this.canvas.height }, this.ball);
        this.bricks = [];

        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 10; j++)
            {
                this.bricks.push(new brick((this.canvas.width / 10 * j),  (this.canvas.height / 5 + this.canvas.height / 5 / 5 * i), (this.canvas.width / 10), (this.canvas.height/5 / 5), ));
            }
        }

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
        this.loop = this.loop.bind(this);
        this.interval = setInterval(this.loop, 10);
        this.checkGameOver = this.checkGameOver.bind(this);
    }

    checkGameOver()
    {
        if (this.ball.outOfBounds() || this.bricks.length === 0)
        {
            this.over = true;
        }

    }




    render()
    {
        if (!this.over)
        {
            this.ctx.save();
            this.ctx.fillStyle = '#abc';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            for (var i = 0; i < this.bricks.length; i++)
                this.bricks[i].render(this.ctx);

            this.paddle.render(this.ctx);
            this.ball.render(this.ctx);

            this.ctx.font = '30px san-serif';
            this.ctx.fillStyle = 'blue';
            this.ctx.fillText(('Score: ' + this.score), 200, 50);

            this.ctx.restore();
        }
    }


    update()
    {
        if (!this.over)
        {
            if (this.score >= 200 * this.speedLevel)
            {
                this.ball.speedUp(1.25);
                this.speedLevel *= 1.75;
            }

            this.checkGameOver();
            this.paddle.update();
            this.ball.update(this.paddle, this.bricks);

            for (var i = 0; i < this.bricks.length; i++)
                if (!this.bricks[i].active)
                {
                    this.score += 5;
                    this.bricks.splice(i, 1);
                }
        }       
    }

    loop()
    {
        this.update();
        this.render();
    }

}