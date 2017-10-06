export default class Paddle
{
    constructor(gamesize, ball)
    {

        this.width = 150;
        this.height = 20;      
        this.gamesize = gamesize;
        this.y = 400;
        this.x = 175;

        this.speed = 0;
        this.topSpeed = 7;

        window.onkeydown = this.handleKeyDown.bind(this);
        window.onkeyup = this.handleKeyUp.bind(this);
        this.movement = null;
        this.ball = ball;
    }

    fireBall()
    {
        if (this.ball.fired)
            return;
        this.ball.fire();
    }

    update()
    {
        this.move();
    }

    handleKeyDown(event)
    {
        switch (event.key)
        {
            case ' ':
                this.fireBall();
                break;
            case 'ArrowLeft':
            case 'a':
                this.movement = 'left';
                break;
            case 'ArrowRight':
            case 'd':
                this.movement = 'right';
                break;
            default:
                return;
        }
    }  
    handleKeyUp(event)
    {
        switch (event.key)
        {
            case 'ArrowLeft':
            case 'a':
            case 'ArrowRight':
            case 'd':
                this.movement = null;
                break;
            default:
                return;
        }
    }

    move()
    {
        switch (this.movement)
        {
            case 'left':
                if (this.x <= 0)
                    return;
                this.speed = -this.topSpeed;
                break;
            case 'right':
                if ((this.x + this.width) >= this.gamesize.width)
                    return;
                this.speed = this.topSpeed;
                break;
            default:
                this.speed = 0;
                break;
        }

        this.x += this.speed;
        if (!this.ball.fired)
            this.ball.updatePos(this.x + this.width / 2, this.y);

    }

    render(ctx)
    {
        ctx.save();
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'black';
        ctx.fillRect(this.x , this.y, this.width , this.height);        
        ctx.strokeRect(this.x , this.y, this.width, this.height);
        ctx.restore();
    }
}