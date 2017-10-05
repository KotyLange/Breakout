export default class paddle
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.direction = 'null';
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