export default class Ball
{
    constructor(gamesize)
    {
        this.x = 0;
        this.y = 0;
        this.xV = 0;
        this.yV = 0;
        this.radius = 10;   
        this.gamesize = gamesize;
        this.fired = false;   
        this.speedFactor = 1;
    }

    updatePos(x, y)
    {
        this.x = Math.floor(x);
        this.y = Math.floor(y) - this.radius;
    }

    speedUp(factor)
    {
        this.speedFactor *= factor;

    }

    fire()
    {
        this.xV = 0;
        this.yV = -4;
        this.y -= 10;
        this.fired = true;
    }

    update(paddle, bricks)
    {
        this.wallCollision();
        this.paddleCollision(paddle);
        this.brickCollision(bricks);
        this.x += this.xV;
        this.y += this.yV * this.speedFactor;
    }

    outOfBounds()
    {
        return (this.y > this.gamesize.height);
    }

    wallCollision()
    {
        var dir = '';
        if (this.x <= this.radius)
            dir = 'right'; 
        if (this.x + this.radius >= this.gamesize.width)
            dir = 'left';
        if (this.y <= this.radius)
            dir = 'down';       
        this.bounce(dir);
    }

    paddleCollision(paddle)
    {
        if (!this.fired)
            return;
        var diff = (this.y + this.radius - paddle.y);
 	
        if ((this.x + this.radius) > paddle.x && (this.x - this.radius) < (paddle.x + paddle.width) && diff >= 0 && diff <= 10)
        {
            this.xV = (this.x - (paddle.x + paddle.width / 2)) / 20;            
            this.bounce('up')

        }
    }

    brickCollision(bricks)
    {
        for (var i = 0; i < bricks.length; i++)
        {
            if (!bricks[i].active)
                continue;

            if ((this.x + this.radius) > bricks[i].x           
                && (this.x - this.radius) < (bricks[i].x + bricks[i].width)
                && (this.y - this.radius - (bricks[i].y + bricks[i].height)) <= 0
                && (this.y - this.radius - (bricks[i].y + bricks[i].height)) >= -10
                && this.yV < 0)
            {
                this.bounce('down');
                bricks[i].hit();
                return;
            }

            if ((this.x + this.radius) > bricks[i].x
                && (this.x - this.radius) < (bricks[i].x + bricks[i].width)
                && (this.y + this.radius - (bricks[i].y)) >= 0
                && (this.y + this.radius - (bricks[i].y)) <= 10
                && this.yV > 0) {
                this.bounce('up');
                bricks[i].hit();
                return;
            }

            if ((this.y - this.radius) < bricks[i].y + bricks[i].height
                && (this.y + this.radius) > (bricks[i].y)
                && (this.x + this.radius - bricks[i].x) >= 0
                && (this.x + this.radius - bricks[i].x) <= 10
                && this.xV > 0) {
                this.bounce('right');
                bricks[i].hit();
                return;
            }


            if ((this.y - this.radius) < bricks[i].y + bricks[i].height
                && (this.y + this.radius) > (bricks[i].y)
                && (this.x - this.radius - bricks[i].x - bricks[i].width) >= 0
                && (this.x - this.radius - bricks[i].x - bricks[i].width) <= 10
                && this.xV < 0) {
                this.bounce('left');
                bricks[i].hit();
                return;
            }
        }
    }

    bounce(direction)
    {
        switch (direction)
        {
            case 'left':
            case 'right':
                this.xV *= -1;
                break;
            case 'down':
            case 'up':
                this.yV *= -1;
                break;
            default:
                break;
        }
    }

    render(ctx)
    {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}