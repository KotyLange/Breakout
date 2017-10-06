export default class Brick
{

    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.active = true;
    }

    hit()
    {
        var sound = new Audio('break.wav');  
        sound.play();
        this.destroy();
    }

    destroy()
    {
        this.active = false;
        this.x = -1;
    }

    render(ctx)
    {
        ctx.save();       
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}