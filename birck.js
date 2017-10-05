

export default class brick
{

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.width = 9; //temp numbers very wrong
        this.height = 4; // temp numbers 

        this.update = this.update.bind(this);
        this.render = this.update.bind(this);
    }

    render(ctx)
    {
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    update()
    {

    }

}