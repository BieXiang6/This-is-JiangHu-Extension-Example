# 拓展插件编辑手册

### 描述
- 拓展插件功能旨在帮助大家在游玩mud时，人人都能编辑修改属于自己的插件。你几乎可以使用此功能实现你能想象到的任何事：制作脚本，制作游戏内攻略，利用mud信息拓展游戏玩法，开发更好地聊天系统，在安卓App内游玩网页版，甚至还能训练AI帮你游玩游戏···

### 拓展插件的基本结构

- 拓展插件为zip格式的压缩包体，包内包含以下内容:
    - 一个名为 **config.txt** 的配置文件;
    - 至少一个自定义名称的html文件;
    - 一个自定义名称的图像文件;
    - 其他文件包括所用到的 **js** **css**等。
- 以上所有文件只有 **config.txt** 的命名不可更改、必须存在于根目录中，其他文件的名称以及所在位置都可以调整，某些文件位置需在配置文件中标明。

### **config.txt** 文件的结构
- **config.txt** 配置文件内为一个简易的json结构，包含了插件在app内的各种配置。
- 配置说明如下:
    - **name** : 该拓展插件的标准名称，用于显示在app的加载拓展列表内;
	- **icon** : 该拓展插件的图标的索引，以包体为根目录的html主页相对位置，用于显示在app的已开启拓展列表内;
	- **author** : 该拓展插件的作者名，或者曾经修改过该插件者的署名，用于显示在app的加载拓展列表内;
	- **version** : 该插件的版本号，用于显示在app的加载拓展列表内;
	- **HtmlName**  :该插件的网页视图的索引，以包体为根目录的html主页相对位置;
	- **HtmlPosition** : 该插件在app中的显示位置，包含四个0~1之间的浮点型小数，之间用英文逗号隔开，按顺序表示上下、左右边距占屏幕纵横的百分比;
	- package:该插件与其他插件重名后更改的名称，可不填。
- **注意**:在填写所有索引时，包括 **icon** 和 **HtmlName** 以及**你在编写html文件时的索引**，均不应以"/"或"\\"开头，因为这样会导航到安卓系统的根目录而不是我们所需要的相对目录。

### 拓展插件与app之间的交互
- 当mud服务器向app发送消息，app会自动将消息分割为不同的部分，并向所有打开的拓展插件发送。在你的拓展插件中加入 **Game.js** 文件并且在 html 文件的 head 标签中所有脚本最上方引用。**Game.js** 文件中封装了一个简易的与app通信的类。以下是其结构:
```JavaScript
class Game{
    static outText;
    static objText;
    static directionText;
    static chatText;
    static hereText;
    static hudong_ButtonsText;
    static hudongText;
    static longText;
    static exitsText;
    static id;
    static stateText;

    //向服务器发送指令，指令间用\n分割
    static SendMsg(msg,way="cmd");

    //延时函数，使用时必须在sleep前加上await关键字，在sleep所在函数前加上async,注意异步
    static sleep(delay);
}
```
1. app发送到该拓展内，会被自动分配到各个静态成员变量中，在制作拓展时直接静态引用即可，如：
```
var out = Game.outText;
2. 拓展向app发送消息需要静态调用SenMsg()方法，如:
```
Game.SendMsg("look","cmd");
    - 即为向app发送了类型为 **cmd** 的 "look" 消息，意思是让app发送look指令。如需一次执行多个指令，指令间以换行符'\n'分割，指令的**开头与结尾不得存在换行符**,如:
```
Game.SendMsg("look\njump\nhaha\nwest","cmd");
    - 此方法的第二个参数为消息类型，另外两种类型分别为 "variablesControl" 和 "gameControl"。
    - variablesControl:变量控制，参数一为固定三种:
		- "ClearOut":清空outText,将历史记录的outText清空;
		- "ClearChat":清空chatText，清除所有记录的聊天消息;
		- "GetID":一个特殊的指令，通常情况下id成员并不会被赋值，通过此指令获取用户账号，注意:非必要禁止获取用户隐私信息!
    - gameControl:游戏控制，可以将参数一放入app的消息队列 **line** ，以控制app修改/添加元素,使用此功能请研究公开的 **UIcontroller.cs** 代码。
3. 为了方便脚本编写，封装了类似sleep效果的静态方法，参数单位为毫秒，注意此方法并非阻塞而是异步。

### 静态成员介绍
- outText : 所有直接输出在屏幕的文本;
- objText : 左侧装有人物，物品框对象的处理文本;
- directionText : 包含当前场景所有出口的文本;
- chatText : 聊天框内所有内容的处理文本;
- hereText : 当前场景的名称文本;
- hudongText : 交互窗口的文字部分文本;
- hudong_ButtonsText : 交互窗口的按钮部分处理文本;
- longText : 当前场景的描述文本;
- exitsText : 走位按钮与下快捷按钮处理文本;
- id : 用户账号ID，不带后缀，通常不会自动被获取;
- stateText : 状态文本，包括busy，潜能，经验，气血等信息.

### 编写原则
1. 禁止用任何方式**收集**用户的任何信息;
2. 禁止编写有损用户游戏人物的代码;
3. 禁止编写对mud服务器不利的代码;
4. 如果你是原作者，并想公开你的拓展包，请在author上写上你的昵称，如果你是修改者，请在author上追加你的昵称，并标识为修改者;
5. 如果你想公开你的拓展包，请为你的拓展包造成的一切后果负责，你的拓展包与app作者无关;



