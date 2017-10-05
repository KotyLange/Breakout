

export default class brick
{

    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.update = this.update.bind(this);
        this.render = this.update.bind(this);
    }

    render(ctx)
    {
        
    }

    update()
    {

    }

}