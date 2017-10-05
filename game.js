import paddle from './paddle';
import brick from './brick';
import ball from './ball';

export default class Game
{



    constructor()
    {
        this.ball = new ball(50, 30);
        this.paddle = new paddle(50, 10);
        this.brick = [];
        this.over = false;


        for (var i = 0; i < 5; i++)
        {

            for (var j = 0; j < 10; j++)
            {
                this.bricks.push(new Brick()); // needs more just framework
            }
        }









        this.input = {
            direction: 'right'
        }
    }







    handleKeyDown(event)
    {
        event.preventDefault();
        switch (event.key)
        {
            case 'a':
            case 'ArrowLeft':
                this.input.direction = 'left';
                break;

            case 'd':
            case 'ArrowRight':
                this.input.direction = 'right';
                break;
        }
    }






    render()
    {
        
    }

    update()
    {

    }















}