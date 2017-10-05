
export default class ball
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.xV = 0;
        this.yV = 0;

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }


    render(ctx)
    {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update()
    {
        
    }





}