
//封装js语法版本不低于ES6，如果运行在更低版本平台请自行编写适配
//请使用静态方法或者成员，不要实例化Game
class Game
{
    constructor(){}

    //静态成员，包含了游戏中几乎所有信息
    static outText = '';
    static objText = '';
    static directionText = '';
    static chatText = '';
    static hereText = '';
    static hudong_ButtonsText = '';
    static hudongText = '';
    static longText = '';
    static exitsText = '';
    static id = '';
    static stateText = '';

    //向服务器发送指令，指令间用\n分割
    static SendMsg(msg,way="cmd")
    {
        window.vuplex.postMessage({type:way,message:msg});
    }
    
    //unity调用方法，不要使用
    static MessageHandler(message)
    {
        var msg = message;
        var temp = msg.split("║@║");
        if(temp.length < 2)
                return;
        if(temp[0] == 'out')
            Game.outText = temp[1];
        else if(temp[0] == 'obj')
            Game.objText = temp[1];
        else if(temp[0] == 'direction')
            Game.directionText = temp[1];
        else if(temp[0] == 'chat')
            Game.chatText = temp[1];
        else if(temp[0] == 'here')
            Game.hereText = temp[1];
        else if(temp[0] == 'hudong_Buttons')
            Game.hudong_ButtonsText = temp[1];
        else if(temp[0] == 'hudong')
            Game.hudongText = temp[1];
        else if(temp[0] == 'long')
            Game.longText = temp[1];
        else if(temp[0] == 'exits')
            Game.exitsText = temp[1];
        else if(temp[0] == 'id')
            Game.id = temp[1];
        else if(temp[0] == 'state')
            Game.stateText = temp[1];
        
    }


    //延时函数，使用时必须在sleep前加上await关键字，在sleep所在函数前加上async,异步函数不会阻塞全局
    static sleep(delay) {
        return new Promise(reslove => {
          setTimeout(reslove, delay);
        });
      }

}

