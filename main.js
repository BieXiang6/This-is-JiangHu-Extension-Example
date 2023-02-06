
var w = "drive cart w";
var n = "drive cart n";
var wu = "drive cart wu";
var nd = "drive cart nd";
var sw = "drive cart sw";
var nw = "drive cart nw";
var s = "drive cart s";
var e = "drive cart e";

function GoToTKS()
{
    Game.SendMsg("fly hangzhou\ns\ns\ns\nsw\nsw\nsw\nwestup\nwestup\nwestdown\nwestdown\nw\ns\ne\ne\ne\nask jian gong about 运货","cmd");
}

function MoveCart()
{

        var here = Game.hereText;
        if(here == "铜矿山" || here == "碎石路" || here == "烟霞洞" || here == "嘉兴城" || here == "大驿道"
        || here == "东门" || here == "东大街" || here == "中央广场" || here == "西大街" || here == "西门"
        || here == "西门大道" || here == "关洛道" || here == "函谷关" || here == "大官道" || here == "终南山口"
        || here == "长安东城门" || here == "东安大道" || here == "东安道口")
            Game.SendMsg(w,"cmd");
        else if(here == "青石大道")
        {
            if(Game.exitsText.includes("碎石路"))
                Game.SendMsg(n,"cmd");
            else if(Game.exitsText.includes("石屋洞"))
                Game.SendMsg(w,"cmd");
            else if(Game.exitsText.includes("嘉兴南门"))
                Game.SendMsg(nw,"cmd");
            else
                Game.SendMsg(sw,"cmd");
        }
        else if(here == "石屋洞" || here == "满觉陇" || here == "水乐洞")
            Game.SendMsg(wu,"cmd");
        else if(here == "山路")
        {
            if(Game.exitsText.includes("烟霞洞"))
                Game.SendMsg(wu,"cmd");
            else if(Game.exitsText.includes("山路")&&Game.exitsText.includes("法喜寺"))
                Game.SendMsg(wu,"cmd");
            else if(Game.exitsText.includes("法净寺"))
                Game.SendMsg(nd,"cmd");
            else if(Game.exitsText.includes("法镜寺"))
                Game.SendMsg(nd,"cmd");
            else if(Game.exitsText.includes("嘉兴城"))
                Game.SendMsg(n,"cmd");
            else
                Game.SendMsg(nw,"cmd");
        }
        else if(here == "法喜寺" || here == "法净寺" ||here == "法镜寺")
            Game.SendMsg(nd,"cmd");
        else if(here == "嘉兴南门")
            Game.SendMsg(n,"cmd");
        else if(here == "冯诩道")
        {
            if(Game.exitsText.includes("东安大道"))
                Game.SendMsg(s,"cmd");
            else if(Game.exitsText.includes("青龙街"))
                Game.SendMsg(w,"cmd");
            else
                Game.SendMsg(s,"cmd");
        }
        else if(here == "青龙街")
        {
            if(Game.exitsText.includes("南安大道"))
                Game.SendMsg(s,"cmd");
            else
                Game.SendMsg(w,"cmd");
        }
        else if(here == "南安大道")
            Game.SendMsg(e,"cmd");
        else if(here == "工部")
            Game.SendMsg(n,"cmd");
        else if(here == "工部铜厂")
        {
            
        }
        else
        {
            GoToTKS();
            here = "otherPlace";
        }
        return here;
}

async function TuiChe_main()
{
    var button = document.getElementById("startTuiChe");
    if(button.innerHTML == "开始推车")
    {
        button.innerHTML = "结束推车";
        while(button.innerHTML == "结束推车")
        {
        var here = MoveCart();
        if(here == "工部铜厂")
        {
            await Game.sleep(1000);
            Game.SendMsg("s\nw\nfly hangzhou\ns\ns\ns\nsw\nsw\nsw\nwestup\nwestup\nwestdown\nwestdown\nw\ns\ne\ne\ne\nask jian gong about 运货","cmd");
            await Game.sleep(1000);
        }
        else if(here == "otherPlace")
        {
            await Game.sleep(1000);
        }
        await Game.sleep(300);
        }
    }
    else
    {
        button.innerHTML = "开始推车";
    }
    
}
