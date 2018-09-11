 <div id="app">
    <p @tap="aaa" @longtap="bbb">{{msg}}－－－长按（longtap）点击（tap）事件</p>

    <p @tap="aaa">{{msg}}－－－点击（tap）事件</p>

    <p @longtap="bbb">{{msg}}－－－长按（longtap）事件</p>

    <p @touchstart="aaa">{{msg}}－－－touchstart事件</p>

    <p>{{msg}}－－－没有事件跟风用～～～</p>
</div>